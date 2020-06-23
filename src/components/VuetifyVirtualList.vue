<template>
    <div style="height: 100%;">
        <v-virtual-scroll
                ref="virtualScroll"
                :items="originalSubtitles"
                :item-height="50"
                height="300"
        >
            <template v-slot="{ item }">
                <v-list-item>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                                depressed
                                small
                        >
                            View User

                            <v-icon
                                    color="orange darken-4"
                                    right
                            >
                                mdi-open-in-new
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-virtual-scroll>

        Add original subtitles: <input type="file" @change="addOriginalSubtitles">
        <button @click="scrollTo">Scroll To</button>


    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters('subtitles', [
                'originalSubtitles'
            ])
        },
        mounted() {
        },
        methods: {
            ...mapActions('subtitles', [
                'addOriginalSubtitles'
            ]),
            scrollTo () {
                console.log(this.$refs.virtualScroll);
            }
        },
        components: {
        }
    }
</script>
<style scoped>
</style>
