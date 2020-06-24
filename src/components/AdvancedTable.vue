<template>
    <div style="height: 100%;">
        <SubtitlesTable v-if="true"></SubtitlesTable>
        Add original subtitles: <input type="file" @change="addOriginalSubtitles">


    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import SubtitlesTable from "./partial-components/SubtitlesTable";

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters('kodi', [
                'connectionState',
                'isPlaying',
                'currentPlayTimeInMilliseconds'
            ]),
            ...mapGetters('subtitles', [
                'originalSubtitles'
            ])
        },
        mounted() {
        },
        methods: {
            ...mapActions('subtitles', [
                'addOriginalSubtitles'
            ]),
            ...mapActions('kodi', [
                'CONNECT',
                'DISCONNECT',
                'PING',
                'REQUEST_CURRENT_SPEED',
                'TOGGLE_PLAY_PAUSE',
                'INPUT_BACK',
                'REQUEST_CURRENT_MOVIE_DETAILS',
                'SYNC_PLAYING_TIME',
                'TURN_SUBTITLES_ON',
                'TURN_SUBTITLES_OFF',
                'CHANGE_TO_DELTA_SECONDS',
                'MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES'
            ]),
            pageVisible () {
                // console.log('pageVisible', this.connectionState);
            }
        },
        components: {
            SubtitlesTable,
        }
    }
</script>
<style scoped>
</style>
