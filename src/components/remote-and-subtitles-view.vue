<template>
    <div class="component-container">
      <v-tabs
          height="35"
          grow
          v-model="gui.activeTab"
      >
        <v-tab @click="scrollToRowWithDelay">
          Original
        </v-tab>
        <v-tab @click="scrollToRowWithDelay">
          Translation
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="gui.activeTab">

        <!-- ORIGINAL -->
        <v-tab-item eager >
          <ListView ref="listview"
                    class="subtitles-list"
                    :items="originalSubtitles">
            <template v-slot:default="{ item, index, active }">
              <SubtitlesRow :display-subtitles-time="gui.displaySubtitlesTime"
                            :active-row="activeRow"
                            :active="active"
                            :translate="true"
                            :rowData="item"
                            :index="index">
              </SubtitlesRow>
            </template>
          </ListView>
        </v-tab-item>

        <!-- TRANSLATION -->
        <v-tab-item eager>
          <ListView ref="listview_translation"
                    class="subtitles-list"
                    :items="translationSubtitles">
            <template v-slot:default="{ item, index, active }">
              <SubtitlesRow :display-subtitles-time="gui.displaySubtitlesTime"
                            :active="active"
                            :translate="false"
                            :active-row="activeRowTranslation"
                            :rowData="item"
                            :index="index">
              </SubtitlesRow>
            </template>
          </ListView>
        </v-tab-item>

      </v-tabs-items>

        <div class="buttons-container">
            <div class="row-buttons">
                <v-badge
                        bordered
                        color="green"
                        overlap
                        left
                        content="-15 sec"
                        offset-x="40"
                >
                    <async-button class="mx-2"
                           dark color="primary"
                           title
                           @click="CHANGE_TO_DELTA_SECONDS(-15)">
                        <v-icon>fa-backward</v-icon>
                        <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                    </async-button>
                </v-badge>

                <async-button @click="TOGGLE_PLAY_PAUSE" dark :color="isPlaying ? 'red' : 'green'">
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
                    <async-button class="mx-2" dark color="primary"
                           @click="CHANGE_TO_DELTA_SECONDS(15)">
                        <v-icon>fa-forward</v-icon>
                        <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                    </async-button>
                </v-badge>
            </div>
            <div class="row-buttons">
                <async-button class="mx-2" dark color="primary"
                              @click="TOGGLE_SUBTITLES">
                    <v-icon>fa-closed-captioning</v-icon>
                    <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                </async-button>
                <v-btn class="mx-2" style="margin: auto" dark color="primary" @click="scrollToActiveRow">
                    <v-icon class="ml-2">fa-fast-forward</v-icon>
                    <v-icon class="ml-2">fa-closed-captioning</v-icon>
                </v-btn>
                <async-button class="mx-2" style="margin: auto" dark color="primary" @click="pauseAndScrollToActiveRow">
                    <v-icon>fa-pause</v-icon>
                    <v-icon class="ml-2">fa-fast-forward</v-icon>
                    <v-icon class="ml-2">fa-closed-captioning</v-icon>
                    <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                </async-button>
            </div>
            <div style="display: flex; justify-content: center; padding-top: 10px;">
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
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import ListView from "./partial-components/list-view";
    import SubtitlesRow from "./partial-components/subtitles-row";
    import AsyncButton from './partial-components/async-button';

    export default {
        name: 'App',
        data() {
            return {
                gui : {
                    scrollToActiveRow: true,
                    displaySubtitlesTime: true,
                    activeTab: ''
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
                if (this.gui.scrollToActiveRow && this.gui.activeTab === 0) {
                  this.scrollToActiveRow();
                }
            },
            activeRowTranslation () {
              if (this.gui.scrollToActiveRow && this.gui.activeTab === 1) {
                this.scrollToActiveRowTranslation();
              }
            }
        },
        computed: {
            ...mapGetters('subtitles', [
                'originalSubtitles',
                'translationSubtitles',
                'activeRow',
                'activeRowTranslation',
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
                'STOP_CALCULATE_TIME',
                'TOGGLE_SUBTITLES'
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
            scrollToRowWithDelay () {
              setTimeout(() => {
                if (this.gui.activeTab === 0) {
                  this.scrollToActiveRow();
                } else {
                  this.scrollToActiveRowTranslation();
                }
              }, 50);
            },
            async scrollToActiveRow () {
              let activeRow = this.activeRow;
              if (activeRow > -1) {
                  activeRow = activeRow > 2 ? activeRow - 2 : activeRow; //keep it in the middle of the list
                  this.$refs.listview.scrollToRow(activeRow);
              }
            },
            async scrollToActiveRowTranslation () {
              let activeRowTranslation = this.activeRowTranslation;
              if (activeRowTranslation > -1 && this.$refs.listview_translation) {
                activeRowTranslation = activeRowTranslation > 2 ? activeRowTranslation - 2 : activeRowTranslation; //keep it in the middle of the list
                this.$refs.listview_translation.scrollToRow(activeRowTranslation);
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
            SubtitlesRow,
            AsyncButton
        }
    }
</script>
<style scoped>
    .v-icon{
        font-size: large !important;
    }
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
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }
</style>
