<template>
    <div>
        Add original subtitles: <input type="file" @click="addOriginalSubtitles">
        {{originalSubtitles}}
        <div class="dynamic-scroller-demo" v-if="false">
            <DynamicScroller
                    ref="scroller"
                    :items="originalSubtitles"
                    :min-item-size="54"
                    class="scroller"
            >
                <template #before>
                    <div class="notice">
                        The message heights are unknown.
                    </div>
                </template>

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
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data () {
            return {
            }
        },
        watch: {
          originalSubtitles () {
              console.log('originalSubtitles');
            // this.$refs.scroller.forceUpdate();
          }
        },
        computed: {
            ...mapGetters('subtitles', [
                "originalSubtitles"
            ])
        },
        methods: {
            ...mapActions('subtitles', [
                "addOriginalSubtitles"
            ])
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
