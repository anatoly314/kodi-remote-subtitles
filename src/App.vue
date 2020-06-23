<template>
  <v-app id="app">
    <NavBar/>
    <SettingsDialog/>

    <v-main>
      <v-container fluid class="router-container">
        <router-view/>
      </v-container>
    </v-main>

    <v-footer app>
      Footer
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/partial-components/NavBar";
import SettingsDialog from "./components/SettingsDialog";
export default {
  name: 'App',
  components: {
    NavBar,
    SettingsDialog
  }
}
</script>

<style lang="css">
  @import '../node_modules/vue-virtual-scroller/dist/vue-virtual-scroller.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
  @import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');
  @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";

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
