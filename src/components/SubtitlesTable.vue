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
                rowData: null,
                shownSubtitleIndex: -1
            }
        },
        watch: {
            currentPlayTimeInMilliseconds() {
              // console.log(oldValue, newValue);
              this.scrollTo(this.currentSubtitleIndex);
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
            ]),
            currentSubtitleIndex () {
              if (!this.originalSubtitles) {
                  return this.shownSubtitleIndex;
              }

              let searching = true;
              let currentSubtitleIndex = this.shownSubtitleIndex === -1 ? 0 : this.shownSubtitleIndex;
                while (searching) {
                    const currentSubStart = this.originalSubtitles[currentSubtitleIndex].start;
                    const currentSubEnd = this.originalSubtitles[currentSubtitleIndex].end;
                    if (currentSubStart >= this.currentPlayTimeInMilliseconds && this.currentPlayTimeInMilliseconds <= currentSubEnd){
                        searching = false;
                    } else {
                        currentSubtitleIndex++;
                    }
                }
              return currentSubtitleIndex;
            }
        },
        methods: {
          scrollTo (index) {
              this.$refs.table.gridOptions.api.ensureIndexVisible(index, 'middle');
              const rowNode = this.$refs.table.gridOptions.api.getRowNode(index);
              if (rowNode){
                  rowNode.setSelected(true);
              }
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
</style>
