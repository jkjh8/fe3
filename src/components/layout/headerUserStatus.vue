<script setup>
import { useRouter } from "vue-router";
import { user } from "src/composables/users/useUser";

const $r = useRouter();
</script>

<template>
  <div>
    <q-btn
      flat
      class="login-btn"
      color="grey-2"
      text-color="primary"
      icon="person"
      size="md"
      to="/auth/login"
    >
      <q-tooltip class="bg-tooltip">Login</q-tooltip>
    </q-btn>
  </div>
</template>

<style scoped>
.login-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
}
</style>
