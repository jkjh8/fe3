<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/useNotify'
import { api } from 'src/composables/useAxios'
import { ISOToDate } from 'src/composables/useDate'
import {
  devices,
  status,
  getDevices,
  getStatus
} from 'src/composables/zones/useDevices'

import PageName from 'components/layout/pageName.vue'
import ConfirmDialog from 'components/dialogs/confirmDialog.vue'

import AddDevice from 'components/dialogs/devices/addDevice.vue'
import EditDevice from 'components/dialogs/devices/editDevice.vue'
import InfoDevice from 'components/dialogs/devices/infoDevice.vue'

const $q = useQuasar()
const $n = useNotify()

const filter = ref('')
const pages = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})
const totalPages = computed(() => {
  return Math.ceil(devices.value.length / pages.value.rowsPerPage)
})

function deviceInfo(item) {
  $q.dialog({
    component: InfoDevice,
    componentProps: { item: item }
  })
}

function deviceAdd() {
  $q.dialog({
    component: AddDevice
  }).onOk(async (device) => {
    try {
      $q.loading.show()
      await api.post('/device', device)
      await getDevices()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error('디바이스 추가 오류', err)
      $n.error('디바이스 추가중 오류가 발생하였습니다.')
    }
  })
}

function deviceEdit(item) {
  $q.dialog({
    component: EditDevice,
    componentProps: { item: item }
  }).onOk(async (device) => {
    try {
      $q.loading.show()
      await api.put('/device', device)
      await getDevices()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error('디바이스 수정 오류', err)
      $n.error('디바이스 설정 수정중 오류가 발생하였습니다')
    }
  })
}

function deviceDelete(item) {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'delete',
      iconColor: 'red-10',
      title: '삭제',
      message: `${item.name} 디바이스를 삭제 하시겠습니까?`
    }
  }).onOk(async () => {
    try {
      $q.loading.show()
      await api.delete(
        `/device?item=${encodeURIComponent(JSON.stringify(item))}`
      )
      await getDevices()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error('디바이스 삭제 오류', err)
      $n.error('디바이스 삭제중 오류가 발생하였습니다')
    }
  })
}

onMounted(() => {
  getDevices()
  getStatus()
})
</script>

<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <PageName
        name="장치 관리"
        caption="하드웨어 등록 및 관리"
        icon="svguse:icons.svg#serverColorPlus"
      />

      <div class="row items-center">
        <q-input v-model="filter" dense filled label="Search">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-separator class="q-ml-md" vertical inset />
        <q-btn icon="add_circle" flat round color="primary" @click="deviceAdd">
          <q-tooltip class="bg-tooltip">추가</q-tooltip>
        </q-btn>
        <q-btn icon="refresh" flat round color="primary">
          <q-tooltip class="bg-tooltip">새로고침</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-table
      :columns="[
        {
          name: 'index',
          align: 'center',
          label: 'ID',
          field: 'index',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'ipaddress',
          align: 'center',
          label: 'IP Address',
          field: 'ipaddress',
          sortable: true
        },
        {
          name: 'deviceType',
          align: 'center',
          label: 'Device Type',
          field: 'deviceType',
          sortable: true
        },
        {
          name: 'mode',
          align: 'center',
          label: 'Active Mode',
          field: 'mode',
          sortable: true
        },
        { name: 'actions', align: 'center', label: 'Actions' }
      ]"
      :rows="devices"
      :filter="filter"
      wrap-cells
      :pagination="pages"
      hide-pagination
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">
            <q-avatar size="1.5rem">
              {{ props.row.index }}
              <q-badge
                v-if="
                  status &&
                  status[props.row.ipaddress] === 'false' &&
                  props.row.mode !== 'Local'
                "
                rounded
                floating
                color="red-10"
              />
            </q-avatar>
          </q-td>

          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

          <q-td key="ipaddress" :props="props">
            <a :href="`http://${props.row.ipaddress}`" target="_blank">
              {{ props.row.ipaddress }}
            </a>
          </q-td>

          <q-td key="deviceType" :props="props">
            {{ props.row.deviceType.toUpperCase() }}
          </q-td>

          <q-td key="mode" :props="props">
            {{ props.row.mode.toUpperCase() }}
          </q-td>

          <q-td key="actions" :props="props">
            <div>
              <q-btn
                flat
                round
                color="primary"
                icon="info"
                @click="deviceInfo(props.row)"
              >
                <q-tooltip class="bg-tooltip">상세정보</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                @click="deviceEdit(props.row)"
              >
                <q-tooltip class="bg-tooltip">수정</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="red-10"
                icon="delete"
                @click="deviceDelete(props.row)"
              >
                <q-tooltip class="bg-tooltip">삭제</q-tooltip>
              </q-btn>
              <q-btn flat round color="primary" icon="refresh">
                <q-tooltip class="bg-tooltip">새로고침</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-pagination
      class="flex flex-center"
      v-model="pages.page"
      :max="totalPages"
      :max-pages="pages.rowsPerPage"
      direction-links
      boundary-links
    />
  </div>
</template>

<style scoped></style>
