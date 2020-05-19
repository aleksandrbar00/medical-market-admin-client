<template>
    <form>
        <v-text-field
            v-model="title"
            label="Название"
            required
        >
        </v-text-field>
        <v-select
                label="Категории"
                :items="categories.map(item => ({text: item.title, value: item.id}))"
                v-model="categoryId"
        ></v-select>
        <v-text-field
                v-model="color"
                label="Цвет"
                required
        >
        </v-text-field>
        <v-select
            :items="sexItems"
            v-model="sex"
            label="Пол"
        ></v-select>
        <v-select
            label="Бренд"
            :items="brands.map(item => ({text: item.title, value: item.id}))"
            v-model="brandId"
        ></v-select>
        <p>Размер</p>
        <vue-number-input
            :min="38"
            :max="56"
            :step="2"
            inline
            controls
            v-model="size"
        />
        <v-file-input
                v-model="image"
                label="Изображение"
                show-size
                prepend-icon="mdi-camera"
        ></v-file-input>
        <v-textarea
                v-model="about"
                solo
                label="Описание"
        ></v-textarea>
        <v-btn class="mr-3" @click="submitForm">
            Добавить
        </v-btn>
    </form>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data(){
        return {
            sexItems: ['муж', 'жен'],
            title: '',
            sex: '',
            size: 38,
            about: '',
            color: '',
            image: null,
            brandId: '',
            categoryId: ''
        }
    },
    computed: {
        ...mapState(['brands', 'categories'])
    },
    methods: {
        ...mapActions(['addNewItem']),
        submitForm(){
            try{
                this.addNewItem({
                    sex: this.sex === 'муж' ? 'man' : 'women',
                    name: this.title,
                    size: this.size,
                    about: this.about,
                    color: this.color,
                    brandId: this.brandId,
                    categoryId: this.categoryId,
                    image: this.image,
                })
            }catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
