<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import moment from 'moment'
import FileSaver from 'file-saver'
import useNotify from 'src/composables/useNotify'
import { api } from 'src/composables/useAxios'
import { ISOToDate } from 'src/composables/useDate'

import PageName from 'components/layout/pageName.vue'
import ConfirmDialog from 'components/dialogs/confirmDialog.vue'
import DnEventLog from 'components/dialogs/logs/dnEventlogs.vue'

const $q = useQuasar()
const $n = useNotify()

const eventlog = ref([])
const pages = ref(1)
const rowsPerPage = ref(10)
const totalPages = ref(0)
const filter = ref('')

async function fnDnEventlogs() {
  $q.dialog({
    component: DnEventLog
  }).onOk((args) => {
    try {
      console.log(args)
      api
        .get(
          `eventlog/download?options=${encodeURIComponent(
            JSON.stringify(args)
          )}`,
          { responseType: 'blob' }
        )
        .then((res) => {
          const blob = new Blob([res.data], { type: 'text/csv' })
          FileSaver.saveAs(
            blob,
            `${moment(args.start).format('YYYYMMDD')}-${moment(args.end).format(
              'YYYYMMDD'
            )}.csv`
          )
        })
    } catch (err) {
      console.error(err)
    }
  })
}

async function fnGetEventLogs() {
  try {
    $q.loading.show()
    const r = await api.get(
      `/eventlog?options=${encodeURIComponent(
        JSON.stringify({
          page: pages.value,
          limit: rowsPerPage.value,
          search: filter.value
        })
      )}`
    )
    $q.loading.hide()
    eventlog.value = r.data.docs
    totalPages.value = r.data.totalPages
  } catch (err) {
    $q.loading.hide()
    console.error('이벤트로그 호출 오류', err)
    $n.error('이벤트 로그를 불러오지 못하였습니다.')
  }
}

function setColorFromEventlogLevel(level) {
  let color
  switch (level) {
    case 1:
    case 4:
      color = 'bg-yellow text-black'
      break
    case 2:
    case 5:
      color = 'bg-red text-white'
      break
    default:
      color = 'bg-white text-black'
  }
  return color
}

onMounted(() => {
  fnGetEventLogs()
})
</script>

<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <PageName
        name="이벤트 로그"
        caption="이벤트 로그 및 방송 기록"
        icon="svguse:icons.svg#folderColor"
      />
      <div class="row items-center q-gutter-x-sm">
        <q-input
          v-model="filter"
          filled
          dense
          label="Search"
          @keyup.enter="fnGetEventLogs"
        >
          <template #append>
            <q-icon class="pointer" name="search" @click="fnGetEventLogs" />
          </template>
        </q-input>
        <q-btn
          icon="refresh"
          round
          flat
          color="primary"
          @click="fnGetEventLogs"
        >
          <q-tooltip>새로고침</q-tooltip>
        </q-btn>
        <q-btn
          icon="download"
          round
          flat
          color="primary"
          @click="fnDnEventlogs"
        >
          <q-tooltip>설정</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-table
      :columns="[
        {
          name: 'createdAt',
          align: 'center',
          label: 'Time',
          field: 'createdAt',
          sortable: true
        },
        {
          name: 'priority',
          align: 'center',
          label: 'Priority',
          field: 'priority',
          sortable: true
        },
        {
          name: 'id',
          align: 'center',
          label: 'ID(User)',
          field: 'id',
          sortable: true
        },
        {
          name: 'zones',
          align: 'center',
          label: 'Zones',
          field: 'zones',
          sortable: true
        },
        {
          name: 'message',
          align: 'center',
          label: 'Message',
          field: 'message',
          sortable: true
        }
      ]"
      :rows="eventlog"
      wrap-cells
      :pagination="{ rowsPerPage: rowsPerPage }"
      hide-pagination
      row-key="_id"
    >
      <template #body="props">
        <q-tr
          :props="props"
          :class="setColorFromEventlogLevel(props.row.level)"
        >
          <q-td key="createdAt" :props="props" style="min-width: 180px">
            {{ ISOToDate(props.row.createdAt) }}
          </q-td>

          <q-td key="priority" :props="props">
            {{ props.row.priority.toUpperCase() }}
          </q-td>

          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>

          <q-td key="zones" :props="props">
            {{ props.row.zones.join(',') }}
          </q-td>

          <q-td key="message" :props="props" style="min-width: 300px">
            {{ props.row.message }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-pagination
      class="flex flex-center"
      v-model="pages"
      :max="totalPages"
      :max-pages="rowsPerPage"
      direction-links
      boundary-links
      @update:model-value="fnGetEventLogs"
    />
  </div>
</template>

<style scoped></style>
