<template>
    <div class="scroller-container">
        <DynamicScroller
                ref="scroller"
                :items="originalSubtitles"
                :min-item-size="54"
                class="scroller"
        >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[item.text]"
                        :data-index="index"
                        :data-active="active"
                        class="message"
                >
                    <ListViewItem @click.native="movePlayerTo(item.start)"
                                    :display-subtitles-time="displaySubtitlesTime"
                                  :style="activeRow === index ? 'background-color: lightgrey;' : ''"
                                  :subtitle-row="item"/>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>

<script>
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
    import ListViewItem from "./ListViewItem";
    import { mapGetters, mapActions } from 'vuex';

    export default {
        props: {
            displaySubtitlesTime: Boolean,
            scrollToActiveRow: Boolean,
            currentPlayingTimeMs: {
                type: Number,
                default: 0,
                required: true
            }
        },
        data () {
            return {
            }
        },
        watch: {
            activeRow () {
                if (this.scrollToActiveRow) {
                    this.scrollToPlayingTime();
                }
            }
        },
        computed: {
            ...mapGetters('subtitles', [
                "originalSubtitles"
            ]),
            activeRow () {
                let activeRow = -1;
                for (let i = 0; i < this.originalSubtitles.length; i++){
                    const row = this.originalSubtitles[i];
                    const followingRow = this.originalSubtitles[i + 1];
                    const start = row.start;
                    const followingStart = followingRow ? followingRow.start : start + 1;
                    if (this.currentPlayingTimeMs >= start && this.currentPlayingTimeMs <= followingStart) {
                        activeRow = i;
                        break;
                    }
                }
                return activeRow;
            }
        },
        methods: {
            ...mapActions('kodi', [
                'MOVE_TO_SPECIFIC_TIME'
            ]),
            movePlayerTo (start) {
              console.log('double click', start);
              this.MOVE_TO_SPECIFIC_TIME(start);
            },
            scrollToPlayingTime() {
                const activeRow = this.activeRow;
                if (activeRow > -1) {
                    this.$refs.scroller.scrollToItem(activeRow);
                }
            }
        },
        components: {
            DynamicScroller,
            DynamicScrollerItem,
            ListViewItem
        }
    }
</script>

<style scoped>
    .scroller {
        height: 50vh;
    }
    .scroller-container {
        height: 100%;
        overflow: hidden;
        border: 1px lightgrey solid;
        border-radius: 3px;
        padding: 3px;
    }


    .message {
        display: flex;
        min-height: 32px;
        box-sizing: border-box;
    }

    .index span {
        display: inline-block;
        width: 160px;
        text-align: right;
    }
</style>
