<script setup>
import PageName from 'components/layout/pageName.vue'
import ZoneSelect from 'components/broadcast/zoneSelect.vue'
import SourceSelect from 'components/broadcast/sourceSelect.vue'
</script>

<template>
  <div class="q-gutter-y-md">
    <!-- header -->
    <div class="row justify-between">
      <page-name
        name="실시간 방송"
        caption="실시간 방송"
        icon="svguse:icons.svg#micColor"
      />
    </div>

    <!-- page -->
    <div>
      <zone-select />
      <source-select />
    </div>
  </div>
</template>

<style scoped></style>
