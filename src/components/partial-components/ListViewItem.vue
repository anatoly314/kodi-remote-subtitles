<template>
    <div class="row-container">
        <div class="time-container" v-if="displaySubtitlesTime">
            <div>{{toSrtTime(subtitleRow.start)}}</div>
            <div>{{toSrtTime(subtitleRow.end)}}</div>
        </div>
        <div class="text-container">
            <span v-html="subtitleRow.text"></span>
        </div>
    </div>
</template>

<script>
    import { toSrtTime } from 'subtitle';
    export default {
        props: {
            subtitleRow: Object,
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
            toSrtTime: toSrtTime
        },
        components: {
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
