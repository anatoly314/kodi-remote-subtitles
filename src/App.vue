<template>
  <v-app id="app">
    <NavBar/>
    <SettingsDialog/>
    <Notifications/>
    <SubtitlesDialog/>

    <v-main>
      <v-container fluid class="router-container">
        <router-view/>
      </v-container>
    </v-main>

    <v-footer app>
      (c) Anatoly Tarnavsky
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/partial-components/NavBar";
import SettingsDialog from "./components/dialogs/SettingsDialog";
import Notifications from "./components/Notifications";
import SubtitlesDialog from "./components/dialogs/SubtitlesDialog";
export default {
  name: 'App',
  components: {
    NavBar,
    SettingsDialog,
    Notifications,
    SubtitlesDialog
  }
}
</script>

<style lang="css">
  @import '../node_modules/vue-virtual-scroller/dist/vue-virtual-scroller.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
  @import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');

  html,
  body,
  #app {
    box-sizing: border-box;
    height: 100%;
  }
  .router-container{
    height: 100%;
    padding: 6px !important;
  }
</style>
