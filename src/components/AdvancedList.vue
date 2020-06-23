<template>
    <div style="height: 100%;">
        <ListView></ListView>
        Add original subtitles: <input type="file" @change="addOriginalSubtitles">


    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import ListView from "./partial-components/ListView";

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
            ])
        },
        components: {
            ListView,
        }
    }
</script>
<style scoped>
</style>
