<script setup>
import { useRouter } from 'vue-router'
import { user, nickName, logout } from 'src/composables/users/useUser'

const $r = useRouter()
</script>

<template>
  <div v-if="!user">
    <q-btn
      class="login-btn"
      flat
      color="grey-2"
      text-color="primary"
      icon="person"
      size="md"
      to="/auth/login"
    >
      <q-tooltip class="bg-tooltip">Login</q-tooltip>
    </q-btn>
  </div>
  <div v-else>
    <q-btn
      class="text-bold login-btn"
      style="border: 1px solid #ddd"
      flat
      color="primary"
      :label="nickName"
    >
      <q-menu :offset="[0, 20]">
        <div style="padding: 20px 80px 20px 80px">
          <q-avatar size="80px" color="primary" text-color="white">
            {{ nickName }}
          </q-avatar>
        </div>
        <div class="column justify-center items-center">
          <div class="text-h6">
            {{ user.name }}
          </div>

          <div class="text-caption">
            {{ user.email }}
          </div>

          <q-btn
            class="q-my-md q-px-lg"
            style="border: solid 1px #aaa"
            rounded
            unelevated
            to="/auth/userInfo"
          >
            사용자 계정 관리
          </q-btn>
        </div>
        <q-separator />
        <div class="row justify-center items-center">
          <q-btn class="q-my-md q-px-lg" flat rounded @click="logout">
            로그아웃
          </q-btn>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<style scoped>
.login-btn {
  width: 2rem;
  height: 1.8rem;
  border-radius: 5px;
}
</style>
