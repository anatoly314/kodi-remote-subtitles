<template>
    <div>
        <div>
            New Home
            <button @click="CONNECT">CONNECT</button>
            <button @click="DISCONNECT">DISCONNECT</button>
            <button @click="PING">PING</button>
            <button @click="REQUEST_CURRENT_SPEED">CURRENT_SPEED</button>
            <button @click="TOGGLE_PLAY_PAUSE">TOGGLE_PLAY_PAUSE</button>
            <br>
            <button @click="INPUT_BACK">INPUT_BACK</button>
            <button @click="REQUEST_CURRENT_MOVIE_DETAILS">REQUEST_CURRENT_MOVIE_DETAILS</button>
            <button @click="SYNC_PLAYING_TIME">SYNC_PLAYING_TIME</button>
            <button @click="CHANGE_TO_DELTA_MS(-60)">MINUTE BACKWARD</button>
            <button @click="CHANGE_TO_DELTA_MS(60)">MINUTE FORWARD</button>
            <br>
            <button @click="TURN_SUBTITLES_ON">TURN_SUBTITLES_ON</button>
            <button @click="TURN_SUBTITLES_OFF">TURN_SUBTITLES_OFF</button>
            <button @click="MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES(15)">Composed backward</button>

        </div>
        <div>
            connectionState: {{connectionState}}
            <br>
            isPlaying: {{isPlaying}}
            <br>
            currentPlayTimeInMilliseconds: {{currentPlayTimeInMilliseconds}}
            <br>
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
        },
        computed: {
            ...mapGetters('kodi', [
                'connectionState',
                'isPlaying',
                'currentPlayTimeInMilliseconds'
            ])
        },
        mounted() {
            document.addEventListener("visibilitychange", () => {
                console.log('Changed', this.connectionState);
            });
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
            ])
        },
        components: {
        },
        beforeMount() {
        },
        beforeDestroy() {
        }
    }
</script>
<style scoped>
</style>
