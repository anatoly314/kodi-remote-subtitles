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
            <v-btn icon @click="openSubtitles">
                <v-icon :color="isConnected ? 'primary' : 'red'">fa-closed-captioning</v-icon>
            </v-btn>
            <async-button icon @click="CONNECT" v-if="!isConnected">
                <v-icon color="red">fa-link</v-icon>
                <v-icon slot="loading">fa fa-spinner fa-spin fa-fw</v-icon>
            </async-button>
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
    import { mapGetters, mapActions } from 'vuex';

    import AsyncButton from './async-button';

    export default {
        name: 'NavBar',
        mixins: [ ENV_CHECKER ],
        data () {
          return {
              drawer: null,
              items: [
                  {
                      title: 'Remote with Subtitles',
                      icon: 'fa-closed-captioning',
                      to: '/'
                  },
                  {
                      title: 'Remote Only',
                      icon: 'fa-tv',
                      to: '/remoteonly'
                  },
                  {
                    title: 'Settings',
                    icon: 'fa-tv',
                    to: '/settings'
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
            ...mapActions('kodi', [
                'CONNECT'
            ]),
            openSubtitles () {
                this.$bus.$emit('subtitles-modal:open');
            }
        },
        components: {
          AsyncButton
        }
    }
</script>
