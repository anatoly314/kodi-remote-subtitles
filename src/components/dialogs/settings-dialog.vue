<template>
    <v-dialog v-model="dialog" persistent max-width="600px" fullscreen>
        <v-card>
            <v-card-title>
                <span class="headline">Kodi Settings</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col col="12">
                            Connection state: {{connectionState}}
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Kodi address ip:port" required v-model="kodiIpPort"></v-text-field>
                            <v-btn small color="primary" dark @click="CONNECT">Connect and Save</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                dialog: false
            }
        },
        computed: {
            ...mapGetters('kodi', [
                'getKodiIpPort',
                'connectionState'
            ]),
            kodiIpPort: {
                get: function () {
                    console.log("getter called")
                    return this.getKodiIpPort;
                },
                set: function (value) {
                    this.SET_KODI_IP_PORT(value);
                }
            }
        },
        methods: {
            ...mapActions('kodi', [
                'CONNECT'
            ]),
            ...mapMutations('kodi', [
                'SET_KODI_IP_PORT'
            ]),
            open () {
                this.dialog = true;
            }
        },
        components: {

        },
        mounted () {
            this.$bus.$on('settings-modal:open', this.open);
        },
        beforeDestroy () {
            this.$bus.$off('settings-modal:open');
        }
    }
</script>
