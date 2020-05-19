<template>
    <v-container>
        <v-row class="justify-start">
            <v-col
                cols="12"
            >
                <v-row>
                    <FeedPanel/>
                </v-row>
                <v-row>
                    <v-col
                        cols="2"
                        class="py-6"
                    >
                        <SideDrawer/>
                    </v-col>
                    <v-col
                        cols="10"
                    >
                        <v-row>
                            <v-col
                                    cols="12"
                            >
                               <transition
                                   name="fade-router"
                                   mode="out-in"
                               >
                                   <router-view/>
                               </transition>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import ShopItemsTable from '@/components/feed/tables/ShopItemsTable'
import BrandTable from '@/components/feed/tables/BrandTable'
import FeedPanel from '@/components/feed/panels/FeedPanel'
import SideDrawer from '@/components/feed/drawers/SideDrawer'
import {mapActions} from 'vuex'

export default {
    components: {
        ShopItemsTable,
        BrandTable,
        FeedPanel,
        SideDrawer
    },

    methods: {
        ...mapActions(['fetchCatalogItems', 'fetchBrands', 'fetchCategories'])
    },

    async created() {
        try{
            this.fetchCatalogItems()
            this.fetchBrands()
            this.fetchCategories()
        }catch (e) {
            console.log(e)
        }
    }
}
</script>


<style lang="scss">
    .fade-router-enter-active,
    .fade-router-leave-active{
        transition-duration: .1s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-router-enter,
    .fade-router-leave-active{
        opacity: 0;
    }
</style>
