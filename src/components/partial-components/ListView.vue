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
                    <ListViewItem @click.native="MOVE_TO_SPECIFIC_TIME(item.start)"
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
            scrollToActiveRow: Boolean
        },
        data () {
            return {
            }
        },
        watch: {
            activeRow (value) {
                if (this.scrollToActiveRow) {
                    console.log(value);
                    this.scrollToPlayingTime();
                }
            }
        },
        computed: {
            ...mapGetters('subtitles', [
                'originalSubtitles',
                'activeRow'
            ])
        },
        methods: {
            ...mapActions('kodi', [
                'MOVE_TO_SPECIFIC_TIME'
            ]),
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
