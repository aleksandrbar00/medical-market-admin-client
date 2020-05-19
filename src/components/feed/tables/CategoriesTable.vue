<template>
    <v-card>
        <v-card-title>
            Список категорий({{categories.length || 0}})
            <v-spacer></v-spacer>

            <v-dialog width="600px">
                <template
                        v-slot:activator="{on}"
                >
                    <v-btn
                            text
                            small
                            color="blue"
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
                        Добавить новую категорию
                    </v-card-title>
                    <v-card-text>
                        <CategoryForm/>
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
                :items="categories"
                :search="query"
                show-select
                v-model="selected"
                item-key="id"
        ></v-data-table>
    </v-card>
</template>

<script>
    import CategoryForm from "../forms/CategoryForm"
    export default {
        components: {
            CategoryForm
        },
        props: ['categories'],
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

                ],
                query: ''
            }
        },
    }
</script>
