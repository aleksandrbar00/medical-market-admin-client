<template>
    <v-card class="px-4 py-3">
        <v-card-title>{{text}}</v-card-title>
        <v-card-actions class="justify-center">
            <v-btn
                class="mr-3"
                color="indigo darken-2"
                outlined
                large
                @click="successHandler"
            >
                Подтвердить
            </v-btn>
            <v-btn
                large
                outlined
                color="red lighten-2"
                @click="closeHandler"
            >
                Отмена
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: ['text', 'closeHandler', 'successHandler']
    }
</script>
