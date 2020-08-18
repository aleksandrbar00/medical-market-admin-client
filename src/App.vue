<template>
  <v-app>
    <v-content>
      <router-view/>
      <v-container>
        <v-snackbar
          :value="notification.show"
          :timeout="notification.timeout"
        >
          {{notification.text}}
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    created() {
      this.unwatch = this.$store.watch(
              (state) => state.auth.token,
              (newVal, oldVal) => {
                if(!newVal){
                  this.$router.push('/auth')
                }
              }
      )
    },

    computed: {
      ...mapState(['notification'])
    },

    beforeDestroy() {
      this.unwatch()
    }
  }
</script>

<style lang="scss">
  .v-content{
    background: #f5f5f5;
  }
</style>
