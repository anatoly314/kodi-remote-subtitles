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
      <div style="text-align: center; width: 100%;">
        (c) 2020 Anatoly Tarnavsky
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/partial-components/nav-bar";
import SettingsDialog from "./components/dialogs/settings-dialog";
import Notifications from "./components/notifications";
import SubtitlesDialog from "./components/dialogs/subtitles-dialog";
export default {
  name: 'App',
  mounted() {
    this.$nextTick(() => {
      const tour = this.$shepherd({
        classes: 'shadow-md bg-purple-dark',
        useModalOverlay: true
      });

      const step0 = {
        text: 'Welcome to Kodi Remote Subtitles tour',
        buttons: [
          {
            text: 'Next',
            action: tour.next
          }
        ]
      };

      const step1 = {
        attachTo: {
          element: "#open-subtitles-modal-button",
          on: 'top-start'
        },
        advanceOn: {
          selector: "#open-subtitles-modal-button",
          event: 'click'
        },
        text: 'Open subtitles modal button',
        buttons: [
          {
            text: 'Next',
            action: tour.next
          }
        ]
      };

      const step2 = {
        attachTo: {
          element: "#reconnect-button",
          on: 'top-start'
        },
        text: 'Reconnect button',
        buttons: [
          {
            text: 'Next',
            action: tour.next
          }
        ]
      };

      const step3 = {
        attachTo: {
          element: "#open-settings-modal-button",
          on: 'top-start'
        },
        text: 'Reconnect button',
        buttons: [
          {
            text: 'Next',
            action: tour.next
          }
        ]
      };

      tour.addSteps([
          step0,
          step1,
          step2,
          step3
      ]);

      tour.start();
    });
  },
  components: {
    NavBar,
    SettingsDialog,
    Notifications,
    SubtitlesDialog
  }
}
</script>

<style lang="css">
  @import '~vue-virtual-scroller/dist/vue-virtual-scroller.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
  @import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');
  @import '~shepherd.js/dist/css/shepherd.css';

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
