<script setup></script>

<template>
  <div style="padding-top: 5px">
    <q-btn class="q-px-md q-py-sm" style="border-radius: 10px" flat>
      <div>Broadcast</div>

      <q-menu :offset="[0, 20]">
        <q-list separator style="min-width: 300px">
          <q-item clickable to="/broadcast/live">
            <q-item-section avatar>
              <q-avatar style="border: solid 1px #eee" rounded>
                <q-icon
                  name="svguse:icons.svg#micColor"
                  size="sm"
                  color="primary"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>실시간 방송</q-item-label>
              <q-item-label caption>실시간 방송 송출</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable to="/broadcast/schedule">
            <q-item-section avatar>
              <q-avatar style="border: solid 1px #eee" rounded>
                <q-icon
                  name="svguse:icons.svg#calendarColor"
                  size="sm"
                  color="purple-8"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>예약 방송</q-item-label>
              <q-item-label caption>예약 방송 생성 및 등록</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn class="q-px-md q-py-sm" style="border-radius: 10px" flat>
      <div>Zones</div>

      <q-menu :offset="[0, 20]">
        <q-list separator style="min-width: 300px">
          <q-item clickable to="/zones">
            <q-item-section avatar>
              <q-avatar
                style="border: solid 1px #eee"
                rounded
                icon="svguse:icons.svg#location"
              ></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>방송구간관리</q-item-label>
              <q-item-label caption>방송구간 추가 및 삭제</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/zones/devices">
            <q-item-section avatar>
              <q-avatar
                style="border: solid 1px #eee"
                rounded
                icon="svguse:icons.svg#serverColorPlus"
              ></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>장치 및 로컬</q-item-label>
              <q-item-label caption>장치 및 로컬 방송 구간 관리</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn class="q-px-md q-py-sm" style="border-radius: 10px" flat>
      <div>Event Log</div>
      <q-menu :offset="[0, 20]">
        <q-list separator style="min-width: 300px">
          <q-item clickable to="/logs/eventLogs">
            <q-item-section avatar>
              <q-avatar
                style="border: solid 1px #eee"
                rounded
                icon="svguse:icons.svg#serverColorInfo"
              ></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label> 이벤트 로그</q-item-label>
              <q-item-label caption> 이벤트 로그 </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn class="q-px-md q-py-sm" style="border-radius: 10px" flat>
      <div>ADMIN</div>
      <q-menu :offset="[0, 20]">
        <q-list separator style="min-width: 300px">
          <q-item clickable to="/admin/users">
            <q-item-section avatar>
              <q-avatar
                style="border: solid 1px #eee"
                rounded
                icon="svguse:icons.svg#userTag"
              ></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label> 사용자 관리 </q-item-label>
              <q-item-label caption> 사용자 권한 및 계정 관리</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<style scoped></style>
