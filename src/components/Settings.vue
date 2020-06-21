<template>
    <div>
       Settings
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'Settings',
        data() {
            return {
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters('kodi', [
            ])
        },
        mounted() {
        },
        methods: {
            ...mapActions('kodi', [

            ])
        },
        components: {
        }
    }
</script>
<style scoped>
</style>
