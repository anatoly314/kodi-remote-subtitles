<template>
  <div>
    Hello World
    <br>
    status: {{status}}
    <br>
    current play time: {{currentPlayTime.format("H:mm:ss:SSS")}}
    <br>
    current play time in ms: {{currentPlayTimeInMilliseconds}}

    <br>
    <button @click="connectKodi">Connect</button>
    <button @click="disconnectKodi">Close Connection</button>
    <br>
    <button @click="togglePlayPause">Toggle Play/Pause</button>
    <button @click="backButton">Back</button>
    <button @click="getCurrentTime">Get current time</button>
    <button @click="togglePollingGetCurrentTime">Toggle polling current time</button>
    <br>
    <button @click="changeToDeltaSeconds(5)">+5</button>
    <button @click="changeToDeltaSeconds(-5)">-5</button>
    <hr>
    Add original subtitles: <input type="file" @change="addOriginalSubtitles">
    <br>
    <SubtitlesTable></SubtitlesTable>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import SubtitlesTable from "./SubtitlesTable";

  export default {
    name: 'HelloWorld',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('socket', [
        'status',
        'currentPlayTime',
        'currentPlayTimeInMilliseconds'
      ])
    },
    methods: {
      ...mapActions('socket', [
        'connectKodi',
        'disconnectKodi',
        'togglePlayPause',
        'getCurrentTime',
        'backButton',
        'changeToDeltaSeconds',
        'togglePollingGetCurrentTime'
      ]),
      ...mapActions('subtitles', [
        'addOriginalSubtitles'
      ])
    },
    components: {
      SubtitlesTable
    }
  }
</script>

<style scoped>
</style>
