<template>
  <v-dialog v-model="dialog" persistent max-width="600px" fullscreen>
    <v-card>
      <v-card-title>
        <span class="headline">Subtitles</span>
      </v-card-title>
      <v-card-text class="v-card-text">
        <v-container>
          <div class="search-query-container">
            <v-text-field
                    v-model="subtitlesSearchQuery"
                    label="Subtitles Search Query"
            ></v-text-field>
          </div>
          <div class="subtitles-list-container">

            <ListView ref="listview"
                      class="subtitles-list"
                      :items="subtitlesList">
              <template v-slot:default="{ item }">
                <OpenSubtitlesRow @click="downloadCurrentSubtitle" :row-data="item"></OpenSubtitlesRow>
              </template>

            </ListView>

          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mx-2" dark color="primary"
               @click="fillWithCurrentMovieDetails">
          <v-icon>fa-info</v-icon>
          <v-icon class="ml-2">fa-video</v-icon>
        </v-btn>
        <v-btn class="mx-2" dark color="primary"
               @click="searchSubtitles">
          <v-icon>fa-search</v-icon>
        </v-btn>
        <v-btn class="mx-2" dark color="error" @click="dialog = false">
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  import ListView from "../partial-components/ListView";
  import OpenSubtitlesRow from "../partial-components/OpenSubtitlesRow";
  import { mapActions, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        subtitlesSearchQuery: '',
        subtitlesList: [],
        dialog: false
      }
    },
    computed: {

    },
    methods: {
      ...mapActions('kodi', [
        'REQUEST_CURRENT_MOVIE_DETAILS',
        'CONNECT'
      ]),
      ...mapActions('subtitles', [
        'GET_SUBTITLES_LIST_BY_QUERY',
        'DOWNLOAD_SUBTITLES_BY_ID',
        'ADD_ORIGINAL_SUBTITLES_API'
      ]),
      ...mapMutations('subtitles', [
              'SET_ORIGINAL_SUBTITLES'
      ]),
      async fillWithCurrentMovieDetails() {
        const movieDetails = await this.REQUEST_CURRENT_MOVIE_DETAILS();
        this.subtitlesSearchQuery = movieDetails.title;
      },
      async searchSubtitles() {
        const subtitlesList = await this.GET_SUBTITLES_LIST_BY_QUERY(this.subtitlesSearchQuery);
        this.subtitlesList = subtitlesList['en'] || [];
      },
      async downloadCurrentSubtitle(subtitleToDownload) {
        const subtitleId = subtitleToDownload.id;
        const subtitles = await this.DOWNLOAD_SUBTITLES_BY_ID(subtitleId);
        this.ADD_ORIGINAL_SUBTITLES_API(subtitles);
      },
      open () {
        this.dialog = true;
      }
    },
    mounted () {
      this.CONNECT();
      this.$bus.$on('subtitles-modal:open', this.open);
    },
    beforeDestroy () {
      this.$bus.$off('subtitles-modal:open');
    },
    components: {
      ListView,
      OpenSubtitlesRow
    }
  }
</script>

<style scoped>
  .search-query-container {
    height: 10vh;
    display: flex;
    display: flex;
    flex-direction: column;
  }

  .subtitles-list-container{
    height: 70vh;
    border: 1px lightgrey solid;
    border-radius: 3px;
  }

  .v-card-text{
    padding: 5px !important;
  }

</style>
