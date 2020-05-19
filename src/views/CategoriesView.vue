<template>
    <CategoriesTable :categories="categories"/>
</template>

<script>
    import CategoriesTable from "../components/feed/tables/CategoriesTable"
    import {mapState} from 'vuex'
    export default {
        components: {CategoriesTable},
        computed: {
            ...mapState(['categories'])
        }
    }
</script>
