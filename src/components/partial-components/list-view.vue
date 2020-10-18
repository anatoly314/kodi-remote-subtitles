<template>
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
                    <slot v-bind:item="item"
                          v-bind:active="active"
                          v-bind:index="index">
                    </slot>
            </DynamicScrollerItem>
        </template>
    </DynamicScroller>
</template>

<script>
    import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

    export default {
        props: {
            items: Array
        },
        data () {
            return {
            }
        },
        methods: {
            scrollToRow(rowIndex) {
              this.$refs.scroller.scrollToItem(rowIndex);
            }
        },
        components: {
            DynamicScroller,
            DynamicScrollerItem
        }
    }
</script>

<style scoped>
    .scroller {
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
