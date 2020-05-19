<template>
    <v-card>
        <v-card-title>
            Список товаров({{items.length || 0}})
            <v-spacer></v-spacer>

            <v-dialog width="600px">
                <template
                    v-slot:activator="{on}"
                >
                    <v-btn
                        class="mx-2"
                        color="blue"
                        v-on="on"
                        small
                        text
                    >
                        <v-icon light>
                            mdi-plus
                        </v-icon>
                        <span>Добавить</span>
                    </v-btn>
                </template>

                <v-card class="px-5 py-4">
                    <v-card-title>
                        Добавить новый товар
                    </v-card-title>
                    <v-card-text>
                        <ShopItemForm/>
                    </v-card-text>
                </v-card>

            </v-dialog>

            <v-spacer></v-spacer>
            <v-text-field
                v-model="query"
                append-icon="mdi-magnify"
                label="поиск"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            :search="query"
            show-select
            v-model="selected"
            item-key="id"
        >
            <template v-slot:item.imageLink="{item}">
                <v-dialog v-if="item.imageLink" width="600px">
                    <template
                        v-slot:activator="{on}"
                    >
                        <v-img  v-on="on" :src="'http://localhost:7071/' + item.imageLink" aspect-ratio="1.5" contain/>
                    </template>
                    <v-card class="px-5 py-4">
                        <v-card-title>
                            Загрузить новое изображение
                        </v-card-title>
                        <v-file-input
                                label="File input"
                                filled
                                v-model="imageModal.file"
                                prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn
                            v-if="imageModal.file"
                            :loading="imageModal.isLoadingImage"
                            @click="submitNewImage(item.id)"
                        >
                            Загрузить
                        </v-btn>
                    </v-card>
                </v-dialog>
                <span v-else>Нет изображения</span>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import ShopItemForm from '@/components/feed/forms/ShopItemForm'
import {mapActions} from 'vuex'
export default {
    components: {ShopItemForm},
    props: ['items'],
    data(){
        return {
            imageModal: {
                file: null,
                isLoadingImage: false,
            },
            query: '',
            selected: [],
            headers: [
                {
                    text: 'id',
                    align: 'start',
                    sortable: true,
                    value: 'id'
                },
                {
                    text: 'Название',
                    sortable: true,
                    value: 'name'
                },
                {
                    text: 'Пол',
                    sortable: true,
                    value: 'sex'
                },
                {
                    text: 'Размер',
                    sortable: true,
                    value: 'size'
                },
                {
                    text: 'Бренд',
                    sortable: false,
                    value: 'brand'
                },
                {
                    text: 'Цвет',
                    sortable: false,
                    value: 'color'
                },
                {
                    text: 'Фото',
                    sortable: false,
                    value: 'imageLink'
                }

            ],

        }
    },
    methods: {
        ...mapActions(['attachNewImage']),
        async submitNewImage(itemId){
            try{
                this.imageModal.isLoadingImage = true
                await this.attachNewImage({itemId, image: this.imageModal.file})
            }catch (e) {
              console.log(e)
            } finally {
                this.imageModal.isLoadingImage = false
            }
        }
    }
}
</script>
