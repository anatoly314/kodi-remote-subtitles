<template>
    <div @focus="onFocus">
        <div>
            New Home
            <button @click="CONNECT">CONNECT</button>
            <button @click="DISCONNECT">DISCONNECT</button>
            <button @click="PING">PING</button>
            <button @click="REQUEST_CURRENT_SPEED">CURRENT_SPEED</button>
            <button @click="TOGGLE_PLAY_PAUSE">TOGGLE_PLAY_PAUSE</button>
            <button @click="INPUT_BACK">INPUT_BACK</button>
            <button @click="REQUEST_CURRENT_MOVIE_DETAILS">REQUEST_CURRENT_MOVIE_DETAILS</button>
            <button @click="SYNC_PLAYING_TIME">SYNC_PLAYING_TIME</button>
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
                'SYNC_PLAYING_TIME'
            ]),
            onFocus () {
                console.log('Focus')
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
