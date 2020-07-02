<template>
    <div class="component-container">
        <ListView ref="listview"
                  class="subtitles-list"
                  :items="originalSubtitles">
            <template v-slot:default="{ item, index }">
                <SubtitlesRow :display-subtitles-time="gui.displaySubtitlesTime"
                              :rowData="item"
                              :index="index">
                </SubtitlesRow>
            </template>
        </ListView>
        <div class="buttons-container">
            <div style="display: flex; justify-content: center">
                <h2 class="text-center">
                    {{currentPlayingTimeHumanReadable}}
                </h2>
                <div>
                    <v-text-field
                            v-model="subtitlesDeltaMs"
                            class="ml-2"
                            label="Subtitles Timing Delta MS"
                            placeholder="Delta MS"
                    ></v-text-field>
                </div>
            </div>

            <div class="row-buttons">
                <v-badge
                        bordered
                        color="green"
                        overlap
                        left
                        content="-15 sec"
                        offset-x="40"
                >
                    <v-btn class="mx-2"
                           dark large color="primary"
                           title
                           @click="CHANGE_TO_DELTA_SECONDS(-15)">
                        <v-icon>fa-backward</v-icon>
                    </v-btn>
                </v-badge>

                <v-btn class="mx-2" dark large
                       @click="TOGGLE_PLAY_PAUSE"
                       :color="isPlaying ? 'red' : 'green'">
                    <v-icon v-if="!isPlaying">fa-play</v-icon>
                    <v-icon v-if="isPlaying">fa-pause</v-icon>
                </v-btn>

                <v-badge
                        bordered
                        color="green"
                        overlap
                        offset-x="40"
                        content="15 sec"
                >
                    <v-btn class="mx-2" dark large color="primary"
                           @click="CHANGE_TO_DELTA_SECONDS(15)">
                        <v-icon>fa-forward</v-icon>
                    </v-btn>
                </v-badge>
            </div>
            <div class="row-buttons">
                <v-btn class="mx-2" style="margin: auto" dark large color="primary" @click="scrollToActiveRow">
                    <v-icon class="ml-2">fa-fast-forward</v-icon>
                    <v-icon class="ml-2">fa-closed-captioning</v-icon>
                </v-btn>
                <v-btn class="mx-2" style="margin: auto" dark large color="primary" @click="pauseAndScrollToActiveRow">
                    <v-icon>fa-pause</v-icon>
                    <v-icon class="ml-2">fa-fast-forward</v-icon>
                    <v-icon class="ml-2">fa-closed-captioning</v-icon>
                </v-btn>
            </div>
            <div class="row-buttons">
                <v-switch v-model="gui.displaySubtitlesTime" :label="`Display time`"></v-switch>
                <v-switch class="ml-4" v-model="gui.scrollToActiveRow" :label="`Scroll To Active Row`"></v-switch>
            </div>
            <div class="row-buttons">
                <div style="margin-top: auto; margin-bottom: auto; margin-left: 10px;"> <!-- https://stackoverflow.com/a/54677618/947111 -->
                    <v-btn color="success" @click="$refs.inputUpload.click()">Upload Subtitles</v-btn>
                    <input v-show="false" ref="inputUpload" type="file" @change="ADD_ORIGINAL_SUBTITLES_FILE">
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import ListView from "./partial-components/ListView";
    import SubtitlesRow from "./partial-components/SubtitlesRow";

    export default {
        name: 'App',
        data() {
            return {
                gui : {
                    displaySubtitlesTime: true
                }
            }
        },
        watch: {
            isPlaying (newValue) {
                if (newValue) {
                    this.startCalculateTime();
                } else {
                    this.stopCalculateTime();
                }
            },
            activeRow () {
                if (this.gui.scrollToActiveRow) {
                    this.scrollToActiveRow();
                }
            }
        },
        computed: {
            ...mapGetters('subtitles', [
                'originalSubtitles',
                'activeRow',
                'subtitlesTimingDeltaMs'
            ]),
            ...mapGetters('kodi', [
                'isPlaying',
                'currentPlayTimeInMilliseconds',
                'currentCalculatedPlayTimeMs',
                'syncTimestamp',
                'currentPlayingTimeHumanReadable'
            ]),
            subtitlesDeltaMs: {
                get: function () {
                    return this.subtitlesTimingDeltaMs;
                },
                set: function (value) {
                    this.SET_SUBTITLES_TIMING_DELTA_MS(value);
                }
            }
        },
        mounted() {
            this.CONNECT();
        },
        methods: {
            ...mapActions('subtitles', [
                'ADD_ORIGINAL_SUBTITLES_FILE'
            ]),
            ...mapActions('kodi', [
                'TOGGLE_PLAY_PAUSE',
                'CHANGE_TO_DELTA_SECONDS',
                'SYNC_PLAYING_TIME',
                'CONNECT',
                'START_CALCULATE_TIME',
                'STOP_CALCULATE_TIME'
            ]),
            ...mapMutations('kodi', [
                'SET_CURRENT_CALCULATED_PLAY_TIME'
            ]),
            ...mapMutations('subtitles', [
                'SET_SUBTITLES_TIMING_DELTA_MS'
            ]),
            async pauseAndScrollToActiveRow () {
                if (this.isPlaying) {
                    await this.TOGGLE_PLAY_PAUSE();
                }
                await this.scrollToActiveRow();
            },
            async scrollToActiveRow () {
                let activeRow = this.activeRow;
                if (activeRow > -1) {
                    activeRow = activeRow > 3 ? activeRow - 3 : activeRow; //keep it in the middle of the list
                    this.$refs.listview.scrollToRow(activeRow);
                }
            },
            startCalculateTime () {
                this.START_CALCULATE_TIME();
            },
            stopCalculateTime () {
                this.STOP_CALCULATE_TIME();
            }
        },
        components: {
            ListView,
            SubtitlesRow
        }
    }
</script>
<style scoped>
    .subtitles-list{
        height: 50vh;
    }
    .buttons-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 20px;
    }
    .row-buttons{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>
