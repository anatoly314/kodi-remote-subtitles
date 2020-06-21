<template>
    <div>
        <v-card
                color="grey lighten-4"
                flat
                height="200px"
                tile
        >
            <v-toolbar dense>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer">
                </v-app-bar-nav-icon>

                <v-toolbar-title>Kodi Remote Subtitles</v-toolbar-title>
            </v-toolbar>
        </v-card>

        <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
        >
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

    export default {
        name: 'NavBar',
        data () {
          return {
              drawer: null,
              items: [
                  {
                      title: 'advanced',
                      icon: 'mdi-view-dashboard',
                      to: 'advanced'
                  },
                  {
                      title: 'basic',
                      icon: 'mdi-image',
                      to: 'basic'
                  },
                  {
                      title: 'home',
                      icon: 'mdi-help-box',
                      to: 'home'
                  },
              ]
          }
        },
        components: {
        }
    }
</script>
