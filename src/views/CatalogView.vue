<template>
    <ShopItemsTable
        :items="$store.state.catalog.map((item, index) => ({
            ...item,
            id: index,
            sex: item.sex === 'man' ? 'муж' : 'жен'
         }))"
    />
</template>

<script>
    import ShopItemsTable from "../components/feed/tables/ShopItemsTable";
    export default {
        components: {ShopItemsTable}
    }
</script>
