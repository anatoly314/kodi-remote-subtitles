<template>
    <div class="row-container"
         :style="activeRow === index ? 'background-color: lightgrey;' : ''"
         @click="MOVE_TO_SPECIFIC_TIME(rowData.start)">
        <div class="time-container" v-if="displaySubtitlesTime">

            <div>{{toSrtTime(rowData.start)}}</div>
            <div>{{toSrtTime(rowData.end)}}</div>

            <div @click.stop v-if="translate">
                <SwitchCustom @change="translateText(rowData.text)" v-model="showTranslation"/>
            </div>

            <v-btn class="mx-2"
                   @click.stop="copyToClipboard(rowData.text)"
                   icon x-small color="primary">
                <v-icon>fa-copy</v-icon>
            </v-btn>
        </div>
        <div class="text-container">
            <span v-if="!showTranslation" v-html="rowData.text"></span>
            <span v-if="showTranslation">
                <span v-if="translating">
                    <i class="fa fa-spinner fa-spin fa-fw"></i>
                    Translating...
                </span>
                {{translatedRow}}
            </span>
        </div>
    </div>
</template>

<script>
    import { toSrtTime } from 'subtitle';
    import { mapActions, mapGetters } from 'vuex';

    import SwitchCustom from "./switch-custom";

    export default {
        props: {
            rowData: Object,
            displaySubtitlesTime: Boolean,
            index: Number,
            active: Boolean,
            activeRow: Number,
            translate: Boolean
        },
        data () {
            return {
                showTranslation: false,
                translating: false,
                translatedRow: ''
            }
        },
        watch: {
            // reset row when it's being scrolled out of view
            rowData () {
                this.showTranslation = false;
                this.translatedRow = '';
            }
        },
        computed: {
            ...mapGetters('subtitles', [
                'subtitlesLanguage',
                'subtitlesTranslationLanguage'
            ]),
        },
        methods: {
            ...mapActions('kodi',[
                'MOVE_TO_SPECIFIC_TIME'
            ]),
            ...mapActions('subtitles',[
                'TRANSLATE_SUBTITLES_ROW'
            ]),
            async translateText (text) {
                if (this.translatedRow.length === 0) {
                    this.translating = true;
                    const translation = await this.TRANSLATE_SUBTITLES_ROW({
                        subtitlesRow: text,
                        subtitlesLanguage: this.subtitlesLanguage,
                        subtitlesTranslationLanguage: this.subtitlesTranslationLanguage
                    });
                    this.translatedRow = translation.sentences.reduce((allSentences, sentence) => {
                      if (sentence.trans) {
                        allSentences += sentence.trans;
                      }
                      return allSentences;
                    }, '');
                    this.translating = false;
                }
            },
            copyToClipboard (text) {
                const self = this;
                function fallbackCopyTextToClipboard(text) {
                    const textArea = document.createElement("textarea");
                    textArea.value = text;

                    // Avoid scrolling to bottom
                    textArea.style.top = "0";
                    textArea.style.left = "0";
                    textArea.style.position = "fixed";

                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();

                    try {
                        document.execCommand('copy');
                        self.$bus.$emit('show-notification', {
                            type: 'info',
                            text: 'Text successfully copied'
                        });
                    } catch (err) {
                        self.$bus.$emit('show-notification', {
                            type: 'error',
                            text: `Error copying text ${err.toString()}`
                        });
                    }

                    document.body.removeChild(textArea);
                }
                if (!navigator.clipboard) {
                    fallbackCopyTextToClipboard(text);
                    return;
                }
                navigator.clipboard.writeText(text).then(function() {
                    self.$bus.$emit('show-notification', {
                        type: 'info',
                        text: 'Text successfully copied'
                    });
                }, function(err) {
                    self.$bus.$emit('show-notification', {
                        type: 'error',
                        text: `Error copying text ${err.toString()}`
                    });
                });
            },
            toSrtTime: toSrtTime
        },
        components: {
            SwitchCustom
        }
    }
</script>

<style scoped>
    .row-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px lightgrey solid;
        border-radius: 3px;
        padding: 3px;
        margin: 1px;
    }
    .time-container{
        display: flex;
        justify-content: space-evenly;
    }
</style>
