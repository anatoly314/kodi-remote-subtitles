<template>
    <div class="component-container">
        <ListView ref="listview"
                  :current-playing-time-ms="calculatedCurrentPlayingTime"
                  :display-subtitles-time="displaySubtitlesTime">

        </ListView>
        <div class="buttons-container">
            calculatedCurrentPlayingTime: {{calculatedCurrentPlayingTime}}
            <br/>
            currentPlayingTimeHumanReadable: {{currentPlayingTimeHumanReadable}}
            <div class="row1-buttons">
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
            <div class="row2-buttons">
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
            <div class="row3-buttons">
                <v-switch v-model="displaySubtitlesTime" :label="`Display time`"></v-switch>
                <div style="margin-top: auto; margin-bottom: auto; margin-left: 10px;"> <!-- https://stackoverflow.com/a/54677618/947111 -->
                    <v-btn color="success" @click="$refs.inputUpload.click()">Upload Subtitles</v-btn>
                    <input v-show="false" ref="inputUpload" type="file" @change="addOriginalSubtitles">
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
                displaySubtitlesTime: true,
                calculatedCurrentPlayingTime: 0,
                animationFrame: null
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
                'addOriginalSubtitles'
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
                this.$refs.listview.scrollToTime(this.currentPlayTimeInMilliseconds);

            },
            calculateTime () {
                const diffSinceSync = performance.now() - this.syncTimestamp;
                this.calculatedCurrentPlayingTime = this.currentPlayTimeInMilliseconds + diffSinceSync;
                this.animationFrame = requestAnimationFrame(this.calculateTime);
            },
            startCalculateTime () {
                this.animationFrame = requestAnimationFrame(this.calculateTime);
            },
            stopCalculateTime () {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
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
    .row1-buttons{
        display: flex;
        justify-content: center;
    }
    .row2-buttons{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    .row3-buttons{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>
