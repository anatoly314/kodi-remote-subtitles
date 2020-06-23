<template>
  <div>
    Home
    <br>
    Add original subtitles: <input type="file" @click="addOriginalSubtitles">
    {{originalSubtitles}}
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: 'Home',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('subtitles', [
        "originalSubtitles"
      ])
    },
    methods: {
      ...mapActions('subtitles', [
        "addOriginalSubtitles"
      ])
    },
    components: {
    }
  }
</script>

<style scoped>
</style>
