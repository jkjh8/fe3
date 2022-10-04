<script setup>
import { ref } from 'vue'
import PageName from 'components/layout/pageName.vue'
import ListView from 'components/broadcast/schedules/listView.vue'
import CalendarView from 'components/broadcast/schedules/calendarView.vue'

const viewType = ref(true)
</script>

<template>
  <div>
    <div class="row justify-between">
      <PageName
        name="스케줄 방송"
        caption="스케줄 방송"
        icon="svguse:icons.svg#calendarColor"
      />
      <div class="row q-gutter-x-sm">
        <q-btn
          icon="list"
          flat
          round
          :color="viewType ? 'primary' : 'secondary'"
          @click="viewType = true"
        >
          <q-tooltip class="bg-tooltip">리스트</q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-btn
          icon="event_note"
          flat
          round
          :color="viewType ? 'secondary' : 'primary'"
          @click="viewType = false"
        >
          <q-tooltip class="bg-tooltip">캘린더</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="q-pt-xs" v-if="viewType">
      <ListView />
    </div>
    <div v-else>
      <CalendarView />
    </div>
  </div>
</template>

<style scoped></style>
