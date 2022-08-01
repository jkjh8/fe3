<script setup>
// import { onBeforMount } from 'vue'

import { useRouter } from "vue-router";
import HeaderMenu from "components/layout/headerMenu.vue";
import UserStatus from "components/layout/headerUserStatus.vue";
const router = useRouter();
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header row justify-between items-center">
      <div class="row q-gutter-x-sm pointer" @click="router.push('/')">
        <q-icon name="svguse:icons.svg#logo" size="md" />
        <div class="header-font">Media Server</div>
      </div>
      <!-- Menu Components -->
      <HeaderMenu class="center" />
      <UserStatus />
    </q-header>

    <q-page-container>
      <div class="router-view">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
