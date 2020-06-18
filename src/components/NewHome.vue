<template>
    <div>
        <div>
            New Home
            <button @click="connect">Connect</button>
            <button @click="disconnect">Disconnect</button>
            <button @click="togglePlayPause">togglePlayPause</button>
            <button @click="inputBack">inputBack</button>
            <button @click="ping">ping</button>
            <button @click="requestCurrentPlayTime">requestCurrentPlayTime</button>
        </div>
        {{isPlaying}}
        <br>
        <h1>currentPlayingTime: {{currentPlayingTime}}</h1>
        <div>currentPlayingTimeMs: {{kodi.currentPlayingTimeMs}}</div>
        <div>msSinceLastSync: {{kodi.msSinceLastSync}}</div>
        <div>lastSyncedTimestampMs: {{kodi.lastSyncedTimestampMs}}</div>
        <div>lastSyncedPlayingTimeMs: {{kodi.lastSyncedPlayingTimeMs}}</div>
    </div>


</template>

<script>
    import moment from "moment";

    const KODI_URL = 'ws://192.168.1.8:9090/jsonrpc';
    import KODI_METHODS from '../enums/kodi.methods';
    import SOCKET_STATUS from '../enums/socket.status';
    import KODI_REQUESTS from '../websockets/kodi.requests';

    import { mapGetters, mapMutations } from 'vuex';
    import { connect, send, disconnect } from '../websockets/websocket'
    export default {
        name: 'NewHome',
        data() {
            return {
                continuousTimeTracking: false,
                networkLatency: {
                    pingRequestStart: 0,
                    currentPlayTimeRequestStart: 0
                },
                timer: {
                    animationFrameId: null,
                    resyncRate: 10 //seconds
                },
                kodi: {
                    lastSyncedPlayingTimeMs : null,   // playing time received from KODI
                    lastSyncedTimestampMs: null, // when this time was received (performance.now)
                    currentPlayingTimeMs: null, // current playing time
                    msSinceLastSync: 0,
                    resyncRequested: false
                }
            }
        },
        watch: {
            isPlaying (value) {
                if (!this.continuousTimeTracking) {
                    return;
                } else if (value) {
                    this.start();
                } else {
                    this.stop();
                }
            }
        },
        computed: {
            ...mapGetters('kodi', [
                'isPlaying'
            ]),
            currentPlayingTime () {
                if (this.kodi.currentPlayingTimeMs) {
                    const timeZero = moment.utc().startOf('day');
                    const currentPlayTime = timeZero.add('milliseconds', this.kodi.currentPlayingTimeMs).format( "H:mm:ss:SSS");
                    return currentPlayTime;
                } else {
                    return 0;
                }
            }
        },
        mounted() {
        },
        methods: {
            ...mapMutations('kodi', [
                'SET_PLAYING_STATUS'
            ]),
            disconnect: disconnect,
            /**
             * Callbacks
             */
            onKodiMessage (message) {
                const messageId = message.id;
                const method = message.method;
                if (messageId && messageId === KODI_REQUESTS.CURRENT_TIME.id) {
                    const time = message.result.time;
                    this.kodi.lastSyncedTimestampMs = performance.now();
                    const timeInMs = this.kodiTimeToMs(time);
                    const requestDuration = performance.now() - this.networkLatency.currentPlayTimeRequestStart;
                    this.kodi.lastSyncedPlayingTimeMs = (timeInMs + requestDuration); // TODO add coef (requestDuration/2 ???)
                    this.kodi.resyncRequested = false;
                    console.log('current time', time, timeInMs, requestDuration);
                } else if (messageId && messageId === KODI_REQUESTS.PING.id) {
                    const requestDuration = performance.now() - this.networkLatency.pingRequestStart;
                    console.log('pong', message, requestDuration);
                } else if (messageId && messageId === KODI_REQUESTS.CURRENT_SPEED.id) {
                    const speed = message.result.speed;
                    if (speed === 1) {
                        this.SET_PLAYING_STATUS(true);
                    } else {
                        this.SET_PLAYING_STATUS(false);
                    }
                    console.log('current speed', speed);
                } else if (method && method === KODI_METHODS["Player.OnPause"]) {
                    console.log('Pause', message);
                    this.SET_PLAYING_STATUS(false);
                } else if (method && method === KODI_METHODS["Player.OnResume"]) {
                    console.log('Playing', message);
                    this.SET_PLAYING_STATUS(true);
                } else if (method && method === KODI_METHODS["Player.OnAVStart"]) {
                    console.log('Playing', message);
                    this.SET_PLAYING_STATUS(true);
                }else {
                    console.log('UNKNOWN', message);
                }
            },
            onConnectionStateChange (state) {
                console.log('state', state);
                if (state === SOCKET_STATUS.OPEN) {
                    this.requestCurrentSpeed();
                } else {
                    this.SET_PLAYING_STATUS(false);
                }
            },
            /**
             * Kodi actions
             */
            connect () {
                connect(KODI_URL, this.onKodiMessage, this.onConnectionStateChange);
            },
            requestCurrentSpeed () {
                send(KODI_REQUESTS.CURRENT_SPEED);
            },
            requestCurrentPlayTime () {
                this.kodi.resyncRequested = true;
                this.networkLatency.currentPlayTimeRequestStart = performance.now();
                send(KODI_REQUESTS.CURRENT_TIME);
            },
            togglePlayPause () {
                send(KODI_REQUESTS.TOGGLE_PLAY_PAUSE);
            },
            inputBack () {
                send(KODI_REQUESTS.INPUT_BACK);
            },
            ping () {
                this.networkLatency.pingRequestStart = performance.now();
                send(KODI_REQUESTS.PING);
            },
            /**
             * Timers
             */
            resyncLoop () {
                if (this.kodi.lastSyncedPlayingTimeMs) {
                    const msSinceLastSync = performance.now() - this.kodi.lastSyncedTimestampMs;
                    this.kodi.currentPlayingTimeMs = this.kodi.lastSyncedPlayingTimeMs + msSinceLastSync;
                }
                this.animationFrameId = requestAnimationFrame(this.resyncLoop);
            },
            setCurrentTime () {
                console.log('test');
                if (this.kodi.lastSyncedTimestampMs && this.kodi.lastSyncedPlayingTimeMs) {
                    const msSinceLastSync = performance.now() - this.kodi.lastSyncedTimestampMs;
                    this.kodi.currentPlayingTimeMs = this.kodi.lastSyncedPlayingTimeMs + msSinceLastSync;
                    this.kodi.msSinceLastSync = msSinceLastSync;
                }
                if (this.kodi.msSinceLastSync > this.timer.resyncRate * 1000 && !this.kodi.resyncRequested) {
                    this.requestCurrentPlayTime();
                }
                this.timer.animationFrameId = requestAnimationFrame(this.setCurrentTime);
            },
            start() {
                this.timer.animationFrameId = requestAnimationFrame(this.setCurrentTime);
                this.requestCurrentPlayTime();
            },
            stop(){
                cancelAnimationFrame(this.timer.animationFrameId);
                this.resetKodiTimers();
            },
            /**
             * Helpers
             */
            resetKodiTimers() {
                this.kodi.lastSyncedPlayingTimeMs = null;
                this.kodi.currentPlayingTimeMs = null;
                this.kodi.lastSyncedTimestampMs = null;
                this.kodi.msSinceLastSync = 0;
                this.kodi.resyncRequested = false;
            },
            kodiTimeToMs(kodiTime) {
                const hours = kodiTime.hours;
                const minutes = kodiTime.minutes;
                const seconds = kodiTime.seconds;
                const milliseconds = kodiTime.milliseconds;
                const totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
                const totalMs = totalSeconds * 1000 + milliseconds;
                return totalMs;
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
