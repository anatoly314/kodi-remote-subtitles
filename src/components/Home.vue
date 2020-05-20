<template>
  <div>
    <br>
    <button @click="togglePollingTime">togglePollingTime</button>
    <br>
    <input type="file" @change="onFileChange">
    <br>
    <SubtitlesTable></SubtitlesTable>

  </div>
</template>

<script>
// import moment from 'moment';
import { mapActions } from 'vuex';

// eslint-disable-next-line no-unused-vars
import { parse, stringify, stringifyVtt, resync, toMS, toSrtTime, toVttTime } from 'subtitle';
import SubtitlesTable from "./SubtitlesTable";
export default {
  name: 'Home',
  data() {
    return {
      interval: null
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('subtitles', [
      'addOriginalSubtitles'
    ]),
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const file = files[0];

      const reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        const result = e.target.result;
        const base64 = result.split(",")[1];
        const string = atob(base64);
        const subtitles = parse(string);
        self.addOriginalSubtitles(subtitles);
      };
      reader.readAsDataURL(file);
    },
    startPollingTime () {
      this.interval = setInterval(this.getCurrentTime, 400);
    },
    stopPollingTime () {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    togglePollingTime () {
      if (this.interval) {
        this.stopPollingTime();
      } else {
        this.startPollingTime();
      }
    }
  },
  components: {
    SubtitlesTable
  }
}
</script>

<style scoped>
</style>
