<template>
    <div>
        <button @click="scrollTo">Scroll</button>
        <ag-grid-vue style="height: 500px;"
                     ref="table"
                     class="ag-theme-alpine"
                     :columnDefs="columnDefs"
                     :defaultColDef="defaultColDef"
                     :rowData="originalSubtitles">
        </ag-grid-vue>
    </div>

</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import { mapGetters } from 'vuex';
    // eslint-disable-next-line no-unused-vars
    import { parse, stringify, stringifyVtt, resync, toMS, toSrtTime, toVttTime } from 'subtitle';

    export default {
        name: 'App',
        data() {
            return {
                columnDefs: null,
                defaultColDef: null,
                rowData: null
            }
        },
        computed: {
          ...mapGetters('subtitles', [
              'originalSubtitles'
          ]),
            ...mapGetters('socket', [
                'status',
                'currentPlayTime',
                'currentPlayTimeInMilliseconds'
            ])
        },
        methods: {
          scrollTo () {
              const index = 200;
              this.$refs.table.gridOptions.api.ensureIndexVisible(index, 'middle');
              const rowNode = this.$refs.table.gridOptions.api.getRowNode(index);
              rowNode.setSelected(true);
          }
        },
        components: {
            // eslint-disable-next-line vue/no-unused-components
            AgGridVue
        },
        beforeMount() {
            this.columnDefs = [{
                    headerName: 'Start',
                    field: 'start',
                    cellRenderer: function (params) {
                        return `${params.value} / ${toSrtTime(params.value)}`;

                    }
                }, {
                    headerName: 'End',
                    field: 'end',
                    cellRenderer: function (params) {
                        return `${params.value} / ${toSrtTime(params.value)}`;
                    }
                }, {
                    headerName: 'Text',
                    field: 'text',
                    cellStyle: {
                        'white-space': 'normal',
                        'line-height': 'initial',
                        'user-select': 'text'
                    },
                    cellRenderer: function(params) {
                        return params.value ? params.value : '';
                    }
                }
            ];
            this.defaultColDef = {
                flex: 1,
                sortable: true,
                resizable: true,
            };
        }
    }
</script>
<style scoped>
    /*div /deep/ .ag-root, div /deep/ .ag-cell-focus {*/
    /*    -webkit-user-select: text;*/
    /*    -moz-user-select: text;*/
    /*    -ms-user-select: text;*/
    /*    user-select: text;*/
    /*}*/
</style>
