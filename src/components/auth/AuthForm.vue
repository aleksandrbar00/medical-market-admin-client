<template>
    <form>
        <v-text-field
            v-model="login"
            type="email"
            label="Логин"
            required
        >
        </v-text-field>
        <v-text-field
            v-model="password"
            label="Пароль"
            :type="!showPass ? 'password' : 'text'"
            required
        ></v-text-field>
        <v-checkbox
                v-model="showPass"
                label="Показать пароль"
        ></v-checkbox>
        <v-checkbox
            v-model="saveLocal"
            label="Автоматический вход"
        ></v-checkbox>

        <v-btn color="blue" @click="submitForm" class="mt-5">Войти</v-btn>
    </form>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data(){
      return {
          login: '',
          password: '',
          showPass: false,
          saveLocal: false
      }
    },
    computed: {
        ...mapState(['auth'])
    },
    methods: {
        ...mapActions(['loginUser']),
        async submitForm(){
            try{
                await this.loginUser({login: this.login, password: this.password})
                if(window && this.saveLocal){
                    window.localStorage.setItem('token', this.auth.token)
                }
                console.log('asdasd')
                await this.$router.push('/catalog')
            }catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
