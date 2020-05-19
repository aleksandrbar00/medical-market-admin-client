<template>
    <form>
        <v-text-field
            v-model="title"
            label="Название"
        ></v-text-field>
        <v-select
            :items="countriesList.map(item => ({
                value: item.name,
                text: item.name
            }))"
            v-model="country"
            label="Страна"
        ></v-select>
        <v-btn
                @click="submitForm"
        >Добавить</v-btn>
    </form>
</template>

<script>
    import countries from '../../../data/countries.json'
    import {mapActions} from 'vuex'

    export default {
        data(){
            return {
                title: '',
                country: '',
                countriesList: countries
            }
        },
        methods: {
            ...mapActions(['addNewBrand']),
            submitForm(){
                this.addNewBrand({
                    title: this.title,
                    country: this.country
                })
            }
        }
    }
</script>
