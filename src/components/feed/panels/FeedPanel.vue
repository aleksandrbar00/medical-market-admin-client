<template>
    <v-container>
        <v-row class="align-center">
            <div class="px-3">
                <h3 class="panel__title">Панель администратора</h3>
                <v-btn
                    class="mt-3"
                    link
                    x-small
                    href="http://localhost:7071"
                    color="deep-purple"
                >
                    Перейти на сайт
                </v-btn>
            </div>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<style lang="scss">
    .panel__title{
        color: #a6a6a6;
    }
</style>
