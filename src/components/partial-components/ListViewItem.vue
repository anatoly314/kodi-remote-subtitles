<template>
    <div class="row-container"
         :style="activeRow === index ? 'background-color: lightgrey;' : ''"
         @click="MOVE_TO_SPECIFIC_TIME(subtitleRow.start)">
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
    import { mapActions, mapGetters } from 'vuex';
    export default {
        props: {
            subtitleRow: Object,
            displaySubtitlesTime: Boolean,
            index: Number
        },
        data () {
            return {
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters('subtitles', [
                'activeRow'
            ]),
        },
        methods: {
            ...mapActions('kodi',[
                'MOVE_TO_SPECIFIC_TIME'
            ]),
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
