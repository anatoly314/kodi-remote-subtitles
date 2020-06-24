<template>
    <div>
        <v-app-bar app dense>
            <v-btn icon  @click.stop="drawer = !drawer">
                <v-icon>fa-bars</v-icon>
            </v-btn>

            <v-toolbar-title>
                Kodi Remote Subtitles
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="openSettings">
                <v-icon :color="isConnected ? 'primary' : 'red'">fa-cog</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app
                             temporary
                             v-model="drawer">
            <v-list
                    dense
                    nav
                    class="py-0"
            >
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        :to="item.to"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

    import { ENV_CHECKER } from "../../mixins/helpers";
    import SOCKET_STATES from "../../enums/socket.states";
    import { mapGetters } from 'vuex';
    export default {
        name: 'NavBar',
        mixins: [ ENV_CHECKER ],
        data () {
          return {
              drawer: null,
              items: [
                  {
                      title: 'Home',
                      icon: 'mdi-help-box',
                      to: '/'
                  },
                  {
                      title: 'Basic View',
                      icon: 'mdi-image',
                      to: '/basic'
                  },
                  {
                      title: 'Advanced View',
                      icon: 'mdi-view-dashboard',
                      to: '/advanced-list'
                  }
              ]
          }
        },
        computed: {
            ...mapGetters('kodi', [
                'connectionState'
            ]),
            isConnected () {
                return this.connectionState === SOCKET_STATES.OPEN;
            }
        },
        methods: {
            openSettings () {
                this.$bus.$emit('settings-modal:open');
            }
        },
        components: {
        }
    }
</script>
