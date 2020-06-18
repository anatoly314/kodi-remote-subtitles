<template>
    <div>
        Timing
        {{currentTime}}
        <button @click="start">Start</button>
        <button @click="stop">Stop</button>
    </div>

</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                animationFrameId: null,
                resyncRate: 60, //seconds
                kodi: {
                    lastSyncedPlayingTimeMs : null,   // playing time received from KODI
                    lastSyncedTimestampMs: null, // when this time was received (performance.now)
                    currentPlayingTimeMs: null // current playing time
                }

            }
        },
        watch: {
        },
        computed: {
        },
        mounted() {
            const t1 = performance.now();
            console.log(t1);
        },
        methods: {
            resyncLoop () {
                if (this.kodi.lastSyncedPlayingTimeMs) {
                    const msSinceLastSync = performance.now() - this.kodi.lastSyncedTimestampMs;
                    this.kodi.currentPlayingTimeMs = this.kodi.lastSyncedPlayingTimeMs + msSinceLastSync;
                }
                this.animationFrameId = requestAnimationFrame(this.resyncLoop);
            },
            setCurrentTime () {
                this.currentTime = Date.now();
                this.animationFrameId = requestAnimationFrame(this.setCurrentTime);
            },
            start() {
                this.animationFrameId = requestAnimationFrame(this.setCurrentTime);
            },
            stop(){
                cancelAnimationFrame(this.animationFrameId);
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
