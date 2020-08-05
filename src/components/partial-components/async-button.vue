<template>
  <div>

    <v-btn
        v-if="!noButton"
        class="button"
        x-small="x-small"
        :dark="dark"
        :color="color"
        :small="small"
        v-on="listeners"
    >
      <slot name="loading" v-if="loadingState">Loading...</slot>
      <slot name="error" v-else-if="hasError">Errored</slot>
      <slot v-else />
    </v-btn>

    <div v-if="noButton" v-on="listeners">
      <slot name="loading" v-if="loadingState">Loading...</slot>
      <slot name="error" v-else-if="hasError">Errored</slot>
      <slot v-else />
    </div>

  </div>

</template>
<script>
    export default {
        inheritAttrs: false,
        data: () => ({
            isLoading: false,
            hasError: false
        }),
        props: {
            noButton: {
              type: Boolean,
              default: false
            },
            ['x-small']: Boolean,
            dark: Boolean,
            small: Boolean,
            color: String,
            /**
             * How much time should the error or success state stay visible
             */
            time: {
                type: Number,
                default: 2000
            },
            /**
             * Override the loading state, if promise is not possible to be passed
             */
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            listeners() {
                // spread the listeners passed from the parent, but override the click one
                return {
                    ...this.$listeners,
                    click: this.handleClick
                };
            },
            // uses the loading state from the prop or the internal one
            loadingState() {
                return this.loading || this.isLoading
            }
        },
        methods: {
            async handleClick(e) {
                try {
                    // set the internal loading state
                    this.isLoading = true;
                    // call the parent click listener and await it
                    // Using Async/Await lets us await even none promises
                    // pass the Event so modifiers can work
                    await this.$listeners.click(e);
                } catch (error) {
                    // set the hasError state and revert it back after this.time period
                    this.resetDelayed("hasError");
                } finally {
                    this.isLoading = false;
                }
            },
            resetDelayed(property) {
                // if loading prop is passed, dont set the internal states
                if(Object.prototype.hasOwnProperty.call(this.$options.propsData, "loading")) {
                    return
                }
                this[property] = true;
                setTimeout(() => {
                    this[property] = false;
                }, this.time);
            }
        }
    };
</script>
<style scoped>
    .button {
        transition: .3s;
    }
</style>
