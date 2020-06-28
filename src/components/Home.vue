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
                :items="subtitlesList"
                list-item-component="SubtitlesRow"
                v-bind="gui">
            <template v-slot:default="slotProps">
              <OpenSubtitlesRow :item="slotProps"></OpenSubtitlesRow>
            </template>
      </ListView>

    </div>
    <v-btn @click="test">test</v-btn>
  </div>
</template>

<script>
  import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
  import ListView from "./partial-components/ListView";
  import OpenSubtitlesRow from "./partial-components/OpenSubtitlesRow";
  import { mapActions } from 'vuex';
  export default {
    name: 'Home',
    data() {
      return {
        subtitlesSearchQuery: '',
        subtitlesList: [],
        gui: {
          test: 'Test text'
        }
      }
    },
    computed: {

    },
    methods: {
      ...mapActions('kodi', [
        'REQUEST_CURRENT_MOVIE_DETAILS'
      ]),
      ...mapActions('subtitles', [
        'GET_SUBTITLES_LIST_BY_QUERY',
        'DOWNLOAD_SUBTITLES_BY_ID'
      ]),
      async fillWithCurrentMovieDetails () {
        const movieDetails = await this.REQUEST_CURRENT_MOVIE_DETAILS();
        this.subtitlesSearchQuery = movieDetails.title;
      },
      async searchSubtitles () {
        const subtitlesList = await this.GET_SUBTITLES_LIST_BY_QUERY(this.subtitlesSearchQuery);
        this.subtitlesList = subtitlesList['en'] || [];
      },
      async downloadCurrentSubtitle(subtitleToDownload) {
        const subtitleId = subtitleToDownload.id;
        console.log(subtitleId);
      },
      async test () {
        // const movieDetails = await this.REQUEST_CURRENT_MOVIE_DETAILS();
        // console.log(movieDetails);
        try {
          const query = 'The.Dark.Knight.Rises.2012.720p.BluRay.x264.Rus.Eng-HiDt.mkv';
          const response = await this.GET_SUBTITLES_LIST_BY_QUERY(query);
          console.log('home response', response);
          const subtitlesToDownload = response['en']['0'];
          const url = subtitlesToDownload.url;
          const id = subtitlesToDownload.id;
          console.log(url);
          const subtitles = await this.DOWNLOAD_SUBTITLES_BY_ID(id)
          console.log(subtitles);
        } catch (e) {
          console.error('home response', e);
        }
      },
    },
    components: {
      // eslint-disable-next-line vue/no-unused-components
      DynamicScroller,
      // eslint-disable-next-line vue/no-unused-components
      DynamicScrollerItem,
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
