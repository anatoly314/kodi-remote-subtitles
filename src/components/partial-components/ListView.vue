<template>
    <div class="scroller-container">
        <DynamicScroller
                ref="scroller"
                :items="items"
                :min-item-size="54"
                class="scroller"
        >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :data-index="index"
                        :data-active="active"
                        class="message"
                >
                    <ListViewItem :index="index"
                                    :display-subtitles-time="displaySubtitlesTime"
                                  :subtitle-row="item">
                    </ListViewItem>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>

<script>
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
    import ListViewItem from "./ListViewItem";

    export default {
        props: {
            items: Array,
            displaySubtitlesTime: Boolean
        },
        data () {
            return {
            }
        },
        watch: {
        },
        computed: {
        },
        methods: {
            scrollToRow(rowIndex) {
                this.$refs.scroller.scrollToItem(rowIndex);
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
