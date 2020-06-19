<template>
    <div>
        <div>
            New Home
            <button @click="CONNECT">CONNECT</button>
            <button @click="DISCONNECT">DISCONNECT</button>
            <button @click="PING">PING</button>
            <button @click="REQUEST_CURRENT_SPEED">CURRENT_SPEED</button>
            <button @click="TOGGLE_PLAY_PAUSE">TOGGLE_PLAY_PAUSE</button>
            <button @click="INPUT_BACK">INPUT_BACK</button>
        </div>
        <div>
            connectionState: {{connectionState}}
            <br>
            isPlaying: {{isPlaying}}
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
                'isPlaying'
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
                'REQUEST_CURRENT_MOVIE_DETAILS'
            ])
        },
        components: {
        },
        beforeMount() {
        }
    }
</script>
<style scoped>
</style>
