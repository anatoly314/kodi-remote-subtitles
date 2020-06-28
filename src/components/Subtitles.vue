<template>
  <div>
    <div class="search-query-container">
      <v-text-field
              v-model="subtitlesSearchQuery"
              label="Subtitles Search Query"
      ></v-text-field>
      <v-btn class="mx-2" dark large color="primary"
             @click="fillWithCurrentMovieDetails">
        <v-icon>fa-info</v-icon>
        <v-icon class="ml-2">fa-video</v-icon>
      </v-btn>
      <v-btn class="mx-2" dark large color="primary"
             @click="searchSubtitles">
        <v-icon>fa-search</v-icon>
      </v-btn>
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
  </div>
</template>

<script>
  import ListView from "./partial-components/ListView";
  import OpenSubtitlesRow from "./partial-components/OpenSubtitlesRow";
  import { mapActions, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        subtitlesSearchQuery: '',
        subtitlesList: []
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
    },
    mounted() {
      this.CONNECT();
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
  }

  .subtitles-list-container{
    height: 70vh;
    border: 1px lightgrey solid;
    border-radius: 3px;
  }

  .subtitle-filename{
    word-break: break-all;
    display: flex;
  }

  .v-expansion-panel-header{
    padding: 5px;
  }

</style>
