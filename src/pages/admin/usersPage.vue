<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/useNotify'
import { api } from 'src/composables/useAxios'
import { ISOToDate } from 'src/composables/useDate'

import PageName from 'components/layout/pageName.vue'
import ConfirmDialog from 'components/dialogs/confirmDialog.vue'

const $q = useQuasar()
const $n = useNotify()

const filter = ref('')
const users = ref([])
const pages = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})
const totalPages = computed(() => {
  return Math.ceil(users.value.length / pages.value.rowsPerPage)
})

async function getUsers() {
  try {
    $q.loading.show()
    const r = await api.get('/auth/users')
    users.value = r.data.users
    $q.loading.hide()
  } catch (err) {
    $q.loading.hide()
    console.error('관리자 사용자 정보 확인 오류 ', err)
    $n.error('사용자 정보를 가져올 수 없습니다.')
  }
}

async function setAdmin(user) {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'info',
      iconColor: 'primary',
      title: '사용자 권한변경',
      caption: user.admin
        ? '관리자 권한을 회수 합니다.'
        : '관리자 권한을 부여 합니다.'
    }
  }).onOk(async () => {
    try {
      $q.loading.show()
      await api.get(`/auth/setadmin?=${user._id}&admin=${!user.admin}`)
      await getUsers()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error('관리자 권한 변경 오류', err)
      $n.error('사용자 권한 변경에 문제가 발생하였습니다')
    }
  })
}

async function deleteUser(user) {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'warning',
      iconColor: 'red-10',
      title: '사용자 계정 삭제',
      caption: `${user.email} 사용자를 삭제 합니다.`
    }
  }).onOk(async () => {
    try {
      $q.loading.show()
      await api.get(`/auth/deleteuser?email=${user.email}`)
      getUsers()
      $q.loading.hide()
    } catch (err) {
      $q.loading.hide()
      console.error('사용자 계정 삭제 오류', err)
      $n.error('사용자 삭제 중 문제가 발생하였습니다')
    }
  })
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <PageName
        name="사용자 관리"
        caption="사용자 관리 변경 및 삭제"
        icon="svguse:icons.svg#usersColor"
      />
      <q-input v-model="filter" filled dense clearable label="Search">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-table
      :columns="[
        {
          name: 'name',
          align: 'center',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'E-Mail',
          field: 'email',
          sortable: true
        },
        {
          name: 'admin',
          align: 'center',
          label: 'Admin',
          field: 'admin',
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
          name: 'numberOfLogin',
          align: 'center',
          label: 'Logins',
          field: 'numberOfLogin',
          sortable: true
        },
        {
          name: 'createdAt',
          align: 'center',
          label: 'Created',
          field: 'createdAt',
          sortable: true
        },
        {
          name: 'lastLogin',
          align: 'center',
          label: 'Last Login',
          field: 'loginAt',
          sortable: true
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Actions'
        }
      ]"
      :rows="users"
      :pagination="pages"
      :filter="filter"
      hide-pagination
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>

          <q-td key="admin" :props="props">
            <q-btn
              round
              flat
              :icon="props.row.admin ? 'check_circle' : 'block'"
              :color="props.row.admin ? 'green' : 'red-10'"
              @click="setAdmin(props.row)"
            >
              <q-tooltip>권한변경</q-tooltip>
            </q-btn>
          </q-td>

          <q-td key="zones" :props="props">
            <q-btn flat round color="primary" icon="account_tree">
              <q-tooltip>방송구간</q-tooltip>
            </q-btn>
          </q-td>

          <q-td key="numberOfLogin" :props="props">
            {{ props.row.numberOfLogin }}
          </q-td>

          <q-td key="createdAt" :props="props">
            {{ ISOToDate(props.row.createdAt) }}
          </q-td>

          <q-td key="lastLogin" :props="props">
            {{ ISOToDate(props.row.loginAt) }}
          </q-td>

          <q-td key="actions" :props="props">
            <q-btn
              icon="delete"
              flat
              round
              color="red-10"
              @click="deleteUser(props.row)"
            />
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
