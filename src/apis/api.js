import axios from 'axios'


class ApiService {
    constructor(authToken) {
        this.authToken = authToken
    }

    getAuthHeaders(headers){
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${this.authToken}`
            }
        }
    }

    async loginUser(payload){
        try{
            const data = await axios.post('http://localhost:7071/api/login', payload)
            return data.data.token
        }catch (e) {
            console.log(e)
        }
    }

    async fetchItems(){
        try{
            const list = await axios.get('http://localhost:7071/api/shop-items', this.getAuthHeaders())
            return list.data.items
        }catch (e) {
            console.log(e)
        }
    }

    async fetchBrands(){
        try{
            const brands = await axios.get('http://localhost:7071/api/brands', this.getAuthHeaders())
            return brands.data
        }catch (e) {
            console.log(e)
        }
    }

    async addNewItem(payload){
        try{
            const itemId = await axios.post('http://localhost:7071/api/shop-items', payload, this.getAuthHeaders())
            return itemId.data
        }catch (e) {
            console.log(e)
        }
    }

    async addNewBrand(payload){
        try{
            const brand = await axios.post('http://localhost:7071/api/brands', payload, this.getAuthHeaders())
            return brand
        }catch (e) {
            console.log(e)
        }
    }

    async uploadItemImage(itemId, file){
        try{
            const formData = new FormData()
            formData.append('image', file)
            const fileName = await axios.post(`http://localhost:7071/catalog/items/${itemId}/media`, formData)
            console.log(fileName)
            return fileName
        }catch (e) {
            console.log(e)
        }
    }

    async fetchCategories(){
        try{
            const categories = await axios.get('http://localhost:7071/api/categories', this.getAuthHeaders())
            return categories.data
        }catch (e) {
            console.log(e)
        }
    }

    async addNewCategory(payload){
        try{
            await axios.post('http://localhost:7071/api/categories', payload, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }


}


export default ApiService
