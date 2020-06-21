<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/basic' }">
                Basic Mode
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/advanced' }">
                Advanced Mode
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button tag="router-link"
                              to="/settings"
                              type="is-info">
                        Settings
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>

    export default {
        name: 'NavBar',
        components: {
        }
    }
</script>
