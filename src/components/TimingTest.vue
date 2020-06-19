<template>
    <div>
        <div>
            New Home
            <button @click="CONNECT">CONNECT</button>
            <button @click="DISCONNECT">DISCONNECT</button>
            <button @click="PING">PING</button>
<!--            <button @click="disconnect">Disconnect</button>-->
<!--            <button @click="togglePlayPause">togglePlayPause</button>-->
<!--            <button @click="inputBack">inputBack</button>-->
<!--            <button @click="ping">ping</button>-->
<!--            <button @click="requestCurrentPlayTime">requestCurrentPlayTime</button>-->
        </div>
<!--        {{isPlaying}}-->
        <br>
<!--        <h1>currentPlayingTime: {{currentPlayingTime}}</h1>-->
<!--        <div>currentPlayingTimeMs: {{kodi.currentPlayingTimeMs}}</div>-->
<!--        <div>msSinceLastSync: {{kodi.msSinceLastSync}}</div>-->
<!--        <div>lastSyncedTimestampMs: {{kodi.lastSyncedTimestampMs}}</div>-->
<!--        <div>lastSyncedPlayingTimeMs: {{kodi.lastSyncedPlayingTimeMs}}</div>-->
    </div>


</template>

<script>

    import { mapActions } from 'vuex';

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        watch: {
        },
        computed: {
        },
        mounted() {

        },
        methods: {
            ...mapActions('kodi', [
                'CONNECT',
                'DISCONNECT',
                'PING'
            ]),
            /**
             * Callbacks
             */
            onKodiMessage (message) {
                console.log('message', message);
            },
            onConnectionStateChange (state) {
                console.log('state', state);
            },
            /**
             * Kodi actions
             */
            connect () {
            }
        },
        components: {
        },
        beforeMount() {
        }
    }
</script>
<style scoped>
</style>
