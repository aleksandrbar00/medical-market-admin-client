<template>
    <v-container
        class="fill-height main-back"
        fluid
    >
        <v-row
            align="center"
            justify="center"
        >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card 
                    class="px-5 py-4"
                    elevation="6"
                >
                    <v-card-title>
                        Войти в админ панель
                    </v-card-title>
                    <v-card-text>
                        <AuthForm/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm'

export default {
    components: {
        AuthForm
    }
}
</script>

<style lang="scss">
    .main-back{
        background-color:#6c7cb9;
    }
</style>