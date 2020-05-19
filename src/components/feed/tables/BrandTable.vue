<template>
    <v-card>
        <v-card-title>
            Список брендов({{brands.length || 0}})
            <v-spacer></v-spacer>

            <v-dialog width="600px">
                <template
                    v-slot:activator="{on}"
                >
                    <v-btn
                        color="blue"
                        text
                        small
                        v-on="on"
                    >
                        <v-icon light>
                            mdi-plus
                        </v-icon>
                        <span>Добавить</span>
                    </v-btn>
                </template>

                <v-card class="px-5 py-4">
                    <v-card-title>
                        Добавить новый бренд
                    </v-card-title>
                    <v-card-text>
                        <BrandForm/>
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
            :items="brands"
            :search="query"
            show-select
            v-model="selected"
            item-key="id"
        ></v-data-table>
    </v-card>
</template>

<script>
import BrandForm from '@/components/feed/forms/BrandForm'
import {mapState} from 'vuex'

export default {
    components: {BrandForm},
    data(){
        return {
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
                    value: 'title'
                },
                {
                    text: 'Страна',
                    sortable: true,
                    value: 'country'
                },

            ],
            query: ''
        }
    },
    computed: {
        ...mapState(['brands'])
    }
}
</script>
