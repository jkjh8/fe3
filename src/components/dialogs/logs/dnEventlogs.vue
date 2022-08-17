<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'

const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin body-font">
      <q-card-section class="row no-wrap q-gutter-sm">
        <q-icon
          style="margin-top: 10px"
          name="svguse:icons.svg#serverColorInfo"
          size="1.5rem"
        />
        <div class="name">디바이스 추가</div>
      </q-card-section>

      <q-card-section>
        {{ message }}
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
          :color="btnColor ?? 'primary'"
          unelevated
          @click="onDialogOK"
        />
      </q-card-actions>
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
