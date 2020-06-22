<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-row
                        :align="'start'"
                        :justify="'center'"
                >
                    <v-btn class="mx-2"
                           dark large color="primary"
                           title
                           @click="CHANGE_TO_DELTA_MS(-15)">
                        <v-icon>fa-backward</v-icon>
                    </v-btn>

                    <v-btn class="mx-2" dark large
                           @click="TOGGLE_PLAY_PAUSE"
                           :color="isPlaying ? 'red' : 'green'">
                        <v-icon v-if="!isPlaying">fa-play</v-icon>
                        <v-icon v-if="isPlaying">fa-pause</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark large color="primary"
                           @click="CHANGE_TO_DELTA_MS(15)">
                        <v-icon>fa-forward</v-icon>
                    </v-btn>
                </v-row>
                <v-row
                        class="mt-4"
                        :align="'start'"
                        :justify="'center'"
                >
                    <v-btn class="mx-2" dark large color="primary" @click="INPUT_BACK">
                        <v-icon>fa-undo</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark large color="primary" @click="TOGGLE_SUBTITLES">
                        <v-icon>fa-closed-captioning</v-icon>
                    </v-btn>
                </v-row>
                <v-divider class="mt-5"/>
                <v-row
                        class="mt-4"
                        :align="'start'"
                        :justify="'center'"
                >
                    <v-btn class="mx-2" dark large color="primary" @click="MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES(15)">
                        <v-icon>fa-backward</v-icon>
                        <v-icon class="ml-2">fa-closed-captioning</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>

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
            this.CONNECT();
        },
        methods: {
            ...mapActions('kodi', [
                'CONNECT',
                'TOGGLE_PLAY_PAUSE',
                'INPUT_BACK',
                'CHANGE_TO_DELTA_MS',
                'MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES',
                'TOGGLE_SUBTITLES'
            ])
        },
        components: {
        }
    }
</script>
<style scoped>
</style>
