<template>
    <v-navigation-drawer
        dark
        permanent
        class="indigo darken-1"
    >
        <v-list>
            <v-list-item
                link
                to="catalog"
            >
                <v-list-item-icon>
                    <v-icon >
                        mdi-tshirt-crew
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Товары</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                    link
                    to="brands"
            >
                <v-list-item-icon>
                    <v-icon >
                        mdi-hanger
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Бренды</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                    link
                    to="categories"
            >
                <v-list-item-icon>
                    <v-icon >
                        mdi-apps
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Категории</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-dialog v-model="dialog" width="400px">
                <template
                        v-slot:activator="{on}"
                >
                    <v-list-item
                            link
                            v-on="on"
                    >
                        <v-list-item-icon>
                            <v-icon >
                                mdi-location-exit
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Выход</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <ConfirmModal :successHandler="logout" :closeHandler="() => {dialog = !dialog}" text="Вы уверены, что хотите выйти?"/>
            </v-dialog>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions} from 'vuex'
    import ConfirmModal from "../../public/modals/ConfirmModal";
    export default {
        components: {ConfirmModal},
        methods: {
            ...mapActions(['logout'])
        },
        data(){
            return {
                dialog: false
            }
        }
    }
</script>
