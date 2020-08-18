<template>
    <ShopItemsTable
        :items="$store.state.catalog.map((item, index) => ({
            ...item,
            id: item.id,
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
