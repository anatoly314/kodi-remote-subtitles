<template>
    <div>
        <div>
            BASIC
            <button @click="INPUT_BACK">INPUT_BACK</button>
            <button @click="CHANGE_TO_DELTA_MS(-60)">MINUTE BACKWARD</button>
            <button @click="CHANGE_TO_DELTA_MS(60)">MINUTE FORWARD</button>
            <br>
            <button @click="TURN_SUBTITLES_ON">TURN_SUBTITLES_ON</button>
            <button @click="TURN_SUBTITLES_OFF">TURN_SUBTITLES_OFF</button>
            <button @click="MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES(15)">Composed backward</button>


        </div>
    </div>


</template>

<script>

    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        watch: {
            connectionState (state) {
                console.log('state', state);
            }
        },
        computed: {
            ...mapGetters('kodi', [
                'connectionState',
                'isPlaying',
                'currentPlayTimeInMilliseconds'
            ])
        },
        mounted() {

        },
        methods: {
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
                'CHANGE_TO_DELTA_MS',
                'MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES'
            ]),
            pageVisible () {
                // console.log('pageVisible', this.connectionState);
            }
        },
        components: {
        }
    }
</script>
<style scoped>
</style>
