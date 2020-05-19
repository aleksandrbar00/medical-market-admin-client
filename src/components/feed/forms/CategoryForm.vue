<template>
    <form>
        <v-text-field
            label="Название"
            v-model="title"
        ></v-text-field>
        <v-btn
            @click="submitForm"
        >
            Добавить
        </v-btn>
    </form>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data(){
            return {
                title: ''
            }
        },
        methods: {
            ...mapActions(['addNewCategory']),
            submitForm(){
                try{
                    this.addNewCategory({
                        title: this.title
                    })
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
