<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-row
                        :align="'start'"
                        :justify="'center'"
                >
                    <v-badge
                            bordered
                            color="green"
                            overlap
                            left
                            content="-15 sec"
                            offset-x="40"
                    >
                        <async-button class="mx-2"
                               dark large color="primary"
                               title
                               @click="CHANGE_TO_DELTA_SECONDS(-15)">
                            <v-icon>fa-backward</v-icon>
                            <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                        </async-button>
                    </v-badge>

                    <async-button class="mx-2" dark large
                           @click="TOGGLE_PLAY_PAUSE"
                           :color="isPlaying ? 'red' : 'green'">
                        <v-icon v-if="!isPlaying">fa-play</v-icon>
                        <v-icon v-if="isPlaying">fa-pause</v-icon>
                        <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                    </async-button>

                    <v-badge
                            bordered
                            color="green"
                            overlap
                            offset-x="40"
                            content="15 sec"
                    >
                        <async-button class="mx-2" dark large color="primary"
                               @click="CHANGE_TO_DELTA_SECONDS(15)">
                            <v-icon>fa-forward</v-icon>
                            <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                        </async-button>
                    </v-badge>
                </v-row>
                <v-row
                        class="mt-4"
                        :align="'start'"
                        :justify="'center'"
                >
                    <async-button class="mx-2" dark large color="primary" @click="INPUT_BACK">
                        <v-icon>fa-undo</v-icon>
                        <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                    </async-button>
                    <async-button class="mx-2" dark large color="primary" @click="TOGGLE_SUBTITLES">
                        <v-icon>fa-closed-captioning</v-icon>
                        <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                    </async-button>
                </v-row>
                <v-divider class="mt-5"/>
                <v-row
                        class="mt-4"
                        :align="'start'"
                        :justify="'center'"
                >
                    <async-button class="mx-2" dark large color="primary" @click="MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES(15)">
                        <v-icon>fa-backward</v-icon>
                        <v-icon class="ml-2">fa-closed-captioning</v-icon>
                        <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                    </async-button>
                </v-row>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>

    import { mapActions, mapGetters } from 'vuex';

    import AsyncButton from './partial-components/async-button';

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
                'CHANGE_TO_DELTA_SECONDS',
                'MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES',
                'TOGGLE_SUBTITLES'
            ])
        },
        components: {
            AsyncButton
        }
    }
</script>
<style scoped>
</style>
