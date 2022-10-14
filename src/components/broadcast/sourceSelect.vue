<script setup>
import ChannelSelect from 'components/broadcast/live/channelSelect'
import FileSelect from 'components/broadcast/audioFiles/fileSelect'
import ttsSelect from 'components/broadcast/textToSpeech/ttsSelect'
</script>

<template>
  <div>Source Select</div>
  <div class="q-px-md">
    <channel-select />
    <file-select />
    <tts-select />
  </div>
</template>

<style scoped></style>
