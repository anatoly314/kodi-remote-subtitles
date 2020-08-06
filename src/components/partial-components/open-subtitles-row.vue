<template>
    <div class="row-container">
        <div class="subtitles-details">
            <div class="subtitles-button-title">
                <async-button class="mx-2"
                       v-on="listeners"
                       icon x-small color="primary">
                    <v-icon>fa-download</v-icon>
                  <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
                </async-button>
                <div>
                    {{rowData.filename}}
                </div>
            </div>
            <div class="subtitles-props">
                <span>{{rowData.lang}}</span>
                <span>{{rowData.fps}}</span>
                <span>{{rowData.encoding}}</span>
                <span>{{rowData.downloads}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import AsyncButton from './async-button';
    export default {
        props: {
            rowData: Object,
            index: Number
        },
        data () {
            return {
            }
        },
        watch: {
        },
        computed: {
          listeners() {
            // spread the listeners passed from the parent, but override the click one
            return {
              ...this.$listeners,
              click: this.handleClick
            };
          }
        },
        methods: {
          async handleClick(e) {
            await this.$listeners.click(e);
          },
        },
        components: {
          AsyncButton
        }
    }
</script>

<style lang="scss" scoped>
    .row-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px lightgrey solid;
        border-radius: 3px;
        padding: 3px;
        margin: 1px;
    }
    .subtitles-details{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .subtitles-button-title{
            display: flex;
            margin: 2px;
            overflow-wrap: anywhere;
            border-bottom: 1px lightgrey solid;
        }
        .subtitles-props{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }
    }

</style>
