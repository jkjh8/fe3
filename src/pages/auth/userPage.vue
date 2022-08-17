<script setup>
import moment from 'moment'
import { api } from 'src/composables/useAxios'
import { user } from 'src/composables/users/useUser'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'

import ConfirmDialog from 'src/components/dialogs/confirmDialog.vue'

const $q = useQuasar()
const $n = useNotify()
const $r = useRouter()

async function deleteUser() {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      icon: 'delete',
      iconColor: 'red-10',
      btnColor: 'red-10',
      title: '사용자 탈퇴',
      message: '사용자 탈퇴 하시겠습니까?'
    }
  }).onOk(async () => {
    try {
      $q.loading.show()
      const r = await api.delete(
        `/auth?item=${encodeURIComponent(JSON.stringify(user.value))}`
      )
      $n.info('사용자 탈퇴', '사용자 탈퇴가 완료 되었습니다.')
      $q.loading.hide()
      $r.push('/')
    } catch (err) {
      $q.loading.hide()
      $n.error('사용자 탈퇴중 오류가 발생하였습니다.')
      console.error(err)
    }
  })
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <div class="row justify-center q-py-md">
      <q-avatar size="10rem" color="primary">
        <q-icon name="person" size="7rem" color="white" />
      </q-avatar>
    </div>
    <div class="q-gutter-y-md" style="min-width: 400px; max-width: 600px">
      <div class="row justify-center">
        <div>나의 계정 및 로그인 정보</div>
      </div>
      <q-list v-if="user">
        <q-item>
          <q-item-section>
            <q-item-label> 이름 </q-item-label>
            <q-item-label caption>{{ user.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> 이메일 </q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> 관리자 </q-item-label>
            <q-item-label caption>{{ user.admin }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> 사용자 등급 </q-item-label>
            <q-item-label caption>{{ user.level }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> 로그인 횟수 </q-item-label>
            <q-item-label caption>{{ user.numberOfLogin }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> 마지막 로그인 </q-item-label>
            <q-item-label caption>{{
              moment(user.loginAt).format('YYYY-MM-DD hh:mm:ss a')
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> 가입일 </q-item-label>
            <q-item-label caption>{{
              moment(user.createdAt).format('YYYY-MM-DD hh:mm:ss a')
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row justify-end">
        <q-btn unelevated color="red-10" label="탈퇴하기" @click="deleteUser" />
      </div>
    </div>
    <div>
      <router-link class="text-grey-6" to="/">홈으로 돌아가기</router-link>
    </div>
  </div>
</template>

<style scoped></style>
