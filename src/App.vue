<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
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
