<script setup></script>

<template>
  <div class="center q-gutter-y-sm">
    <div class="text-grey-6">이메일로 로그인하기</div>
    <q-separator />
    <q-form class="q-gutter-y-sm">
      <q-input dense outlined label="이메일 주소" />
      <q-input dense outlined label="비밀번호"></q-input>
      <q-checkbox label="이메일 저장하기" left-label />
      <q-btn class="full-width" unelevated color="primary">로그인하기</q-btn>
    </q-form>
    <q-separator />
    <router-link to="">계정이 없나요?</router-link>
  </div>
</template>

<style scoped>
.center {
  position: absolute;
  min-width: 300px;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
}
</style>
,
