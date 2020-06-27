<template>
    <div class="component-container">
        <ListView ref="listview"
                  :scroll-to-active-row="gui.scrollToActiveRow"
                  :current-playing-time-ms="calculatedCurrentPlayingTime"
                  :display-subtitles-time="gui.displaySubtitlesTime">
        </ListView>
        <div class="buttons-container">
            <h2 class="text-center">
                {{currentPlayingTimeHumanReadable}}
            </h2>
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
                <v-btn class="mx-2" style="margin: auto" dark large color="primary" @click="scrollToCurrentSubtitles">
                    <v-icon class="ml-2">fa-fast-forward</v-icon>
                    <v-icon class="ml-2">fa-closed-captioning</v-icon>
                </v-btn>
                <v-btn class="mx-2" style="margin: auto" dark large color="primary" @click="pauseAndScrollToCurrentSubtitles">
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
                    <input v-show="false" ref="inputUpload" type="file" @change="ADD_ORIGINAL_SUBTITLES">
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import ListView from "./partial-components/ListView";
    import moment from "moment";

    export default {
        name: 'App',
        data() {
            return {
                gui : {
                    displaySubtitlesTime: true
                },
                service: {
                    animationFrame: null,
                    startedCalculatingTimeAt: 0,
                    RESYNC_EVERY_SECONDS: 60
                },
                calculatedCurrentPlayingTime: 0,
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
            currentPlayTimeInMilliseconds (newValue) {
                if (!this.isPlaying) {  //we need update it only once
                    this.calculatedCurrentPlayingTime = newValue;
                }
            }
        },
        computed: {
            ...mapGetters('subtitles', [
                'originalSubtitles'
            ]),
            ...mapGetters('kodi', [
                'isPlaying',
                'currentPlayTimeInMilliseconds',
                'syncTimestamp'
            ]),
            currentPlayingTimeHumanReadable () {
                const currentPlayingTimeDuration = moment.duration(this.calculatedCurrentPlayingTime, 'milliseconds');
                const currentPlayingTimeHumanReadable =  moment.utc(currentPlayingTimeDuration.as('milliseconds')).format('HH:mm:ss');
                return currentPlayingTimeHumanReadable;
            }
        },
        mounted() {
            this.CONNECT();
        },
        methods: {
            ...mapActions('subtitles', [
                'ADD_ORIGINAL_SUBTITLES'
            ]),
            ...mapActions('kodi', [
                'TOGGLE_PLAY_PAUSE',
                'CHANGE_TO_DELTA_SECONDS',
                'SYNC_PLAYING_TIME',
                'CONNECT'
            ]),
            async pauseAndScrollToCurrentSubtitles () {
                if (this.isPlaying) {
                    await this.TOGGLE_PLAY_PAUSE();
                }
                await this.scrollToCurrentSubtitles();
            },
            async scrollToCurrentSubtitles () {
                await this.SYNC_PLAYING_TIME();
                this.$refs.listview.scrollToPlayingTime(this.currentPlayTimeInMilliseconds);
            },
            calculateTime () {
                const diffSinceSync = performance.now() - this.syncTimestamp;
                this.calculatedCurrentPlayingTime = this.currentPlayTimeInMilliseconds + diffSinceSync;
                const secondsSinceStartedCalculating = (performance.now() - this.startedCalculatingTimeAt) / 1000;
                if (secondsSinceStartedCalculating > this.service.RESYNC_EVERY_SECONDS) {
                    this.SYNC_PLAYING_TIME();
                    this.startedCalculatingTimeAt = performance.now();
                }
                this.service.animationFrame = requestAnimationFrame(this.calculateTime);
            },
            startCalculateTime () {
                this.service.animationFrame = requestAnimationFrame(this.calculateTime);
                this.startedCalculatingTimeAt = performance.now();
            },
            stopCalculateTime () {
                cancelAnimationFrame(this.service.animationFrame);
                this.service.animationFrame = null;
            }
        },
        components: {
            ListView,
        }
    }
</script>
<style scoped>
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
