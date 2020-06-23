<template>
    <div>
        <div class="dynamic-scroller-demo">
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
                        <div class="text">
                            {{ item.text }}
                        </div>
                        <div class="index">
                            <span>{{ item.id }} (id)</span>
                            <span>{{ index }} (index)</span>
                        </div>
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
        </div>
    </div>
</template>

<script>
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters('subtitles', [
                "originalSubtitles"
            ])
        },
        methods: {
        },
        components: {
            DynamicScroller,
            DynamicScrollerItem
        }
    }
</script>

<style scoped>
    .dynamic-scroller-demo,
    .scroller {
        height: 500px;
    }

    .dynamic-scroller-demo {
        overflow: hidden;
    }

    .notice {
        padding: 24px;
        font-size: 20px;
        color: #999;
    }

    .message {
        display: flex;
        min-height: 32px;
        padding: 12px;
        box-sizing: border-box;
    }

    .avatar {
        flex: auto 0 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 12px;
    }

    .avatar .image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
    }

    .index,
    .text {
        flex: 1;
    }

    .text {
        max-width: 400px;
    }

    .index {
        opacity: .5;
    }

    .index span {
        display: inline-block;
        width: 160px;
        text-align: right;
    }
</style>
