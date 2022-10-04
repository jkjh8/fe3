<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/useNotify'
import { schedules } from 'src/composables/broadcast/useSchedule'

const $q = useQuasar()
const $n = useNotify()

const pages = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})
const totalPages = computed(() => {
  return Math.ceil(schedules.value.length / pages.value.rowsPerPage)
})
</script>

<template>
  <div class="q-gutter-y-md">
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
          name: 'user',
          align: 'center',
          label: 'User',
          field: 'user',
          sortable: true
        },
        {
          name: 'repeat',
          align: 'center',
          label: 'Repeat',
          field: 'repeat',
          sortable: true
        },
        {
          name: 'time',
          align: 'center',
          label: 'Date/Time',
          field: 'time',
          sortable: true
        },
        {
          name: 'zones',
          align: 'center',
          label: 'Zones',
          field: 'zones'
        },
        {
          name: 'message',
          align: 'center',
          label: 'Message',
          field: 'message'
        }
      ]"
      :rows="schedules"
      wrap-cells
      :pagination="pages"
      hide-pagination
    >
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
