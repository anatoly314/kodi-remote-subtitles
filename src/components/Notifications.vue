<template>
    <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :color="color"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
    >
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                    dark
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        data() {
            return {
                color: 'primary',
                mode: 'vertical',
                snackbar: false,
                text: 'Default text',
                timeout: 6000,
                x: null,
                y: 'bottom',
            }
        },
        computed: {

        },
        methods: {
            showNotification (notification) {
                this.text = notification.text;
                this.snackbar = true;
            }
        },
        mounted () {
            this.$bus.$on('show-notification', this.showNotification);
        },
        beforeDestroy () {
            this.$bus.$off('show-notification');
        },
        components: {
        }
    }
</script>

<style scoped>

</style>
