<script setup>
import { ref } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import moment from 'moment'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const start = ref(moment().format('YYYY/MM/01'))
const end = ref(moment().format('YYYY/MM/DD'))
const locale = ref({
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthsShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: '일'
})

function onSubmit() {
  const endTime = new Date(end.value.split('/'))
  endTime.setSeconds(endTime.getSeconds() + 86399)
  onDialogOK({
    start: new Date(start.value.split('/')),
    end: endTime
  })
}
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin body-font">
      <q-form @submit="onSubmit">
        <q-card-section class="row no-wrap q-gutter-sm">
          <q-icon
            style="margin-top: 8px"
            name="cloud_download"
            color="yellow-8"
            size="1.5rem"
          />
          <div class="name">이벤트로그 다운로드</div>
        </q-card-section>

        <q-card-section>
          <div class="q-px-md">
            <q-input
              v-model="start"
              dense
              filled
              mask="date"
              :rules="['date']"
              label="시작일"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="start" :locale="locale">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-model="end"
              dense
              filled
              mask="date"
              :rules="['date']"
              label="종료일"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="end" :locale="locale">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            style="width: 80px"
            label="취소"
            flat
            color="red-10"
            @click="onDialogCancel"
          />
          <q-btn
            style="width: 80px"
            label="확인"
            color="primary"
            unelevated
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style>
.confirmDialog {
  width: 400px;
  min-width: 350px;
  border-radius: 0.5rem;
}
</style>
