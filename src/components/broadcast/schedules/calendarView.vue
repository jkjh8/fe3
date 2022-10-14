<script setup>
import { ref } from 'vue'
import {
  QCalendarMonth,
  addToDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

// export const Timestamp = {
//   date: '',       // YYYY-MM-DD
//   time: '',       // HH:MM (optional)
//   year: 0,        // YYYY
//   month: 0,       // MM (Jan = 1, etc)
//   day: 0,         // day of the month
//   weekday: 0,     // week day  (0=Sunday...6=Saturday)
//   hour: 0,        // 24-hr format
//   minute: 0,      // mm
//   doy: 0,         // day of year
//   workweek: 0,    // workweek number
//   hasDay: false,  // if this timestamp is supposed to have a date
//   hasTime: false, // if this timestamp is supposed to have a time
//   past: false,    // if timestamp is in the past (based on `now` property)
//   current: false, // if timestamp is current date (based on `now` property)
//   future: false,  // if timestamp is in the future (based on `now` property)
//   disabled: false // if timestamp is disabled
// }

const calendar = ref(null)
const selectedDate = ref(null)
const nowDate = addToDate(parseTimestamp(today()), { day: 1 }).date

const onClickDate = (data) => {
  console.log('onClickDate', data)
}

const onClickDay = (data) => {
  console.log('onClickDay', data)
}
</script>

<template>
  <div class="q-pt-md q-gutter-y-md">
    <div class="row justify-center">
      <q-calendar-month
        class="calendar"
        ref="calendar"
        v-model="selectedDate"
        locale="ko-KR"
        :day-min-height="60"
        date-type="rounded"
        bordered
        :now="nowDate"
        @click-date="onClickDate"
        @click-day="onClickDay"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar {
  max-width: 1800px;
  width: 95%;
}
</style>
