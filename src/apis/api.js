import axios from 'axios'
import {API_URI} from "./config";


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
            const data = await axios.post(API_URI + '/login', payload)
            return data.data.token
        }catch (e) {
            console.log(e)
        }
    }

    async fetchItems(){
        try{
            const list = await axios.get(API_URI + '/shop-items', this.getAuthHeaders())
            return list.data.items
        }catch (e) {
            console.log(e)
        }
    }

    async updateItem(itemId, payload){
        try{
            await axios.put(API_URI + '/shop-items/' + itemId, payload, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }


    async deleteItem(itemId){
        try{
            await axios.delete(API_URI + '/shop-items/' + itemId, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }

    async fetchBrands(){
        try{
            const brands = await axios.get(API_URI + '/brands', this.getAuthHeaders())
            return brands.data
        }catch (e) {
            console.log(e)
        }
    }

    async addNewItem(payload){
        try{
            const itemId = await axios.post(API_URI + '/shop-items', payload, this.getAuthHeaders())
            return itemId.data
        }catch (e) {
            console.log(e)
        }
    }

    async addNewBrand(payload){
        try{
            const brand = await axios.post(API_URI +  '/brands', payload, this.getAuthHeaders())
            return brand
        }catch (e) {
            console.log(e)
        }
    }

    async updateBrand(brandId, payload){
        try{
            await axios.put(API_URI + '/brands/' + brandId, payload, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }


    async deleteBrand(brandId){
        try{
            await axios.delete(API_URI + '/brands/' + brandId, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }

    async uploadItemImage(itemId, file){
        try{
            const formData = new FormData()
            formData.append('image', file)
            const fileName = await axios.post(`https://med-magazine.herokuapp.com/catalog/items/${itemId}/media`, formData)
            console.log(fileName)
            return fileName
        }catch (e) {
            console.log(e)
        }
    }

    async fetchCategories(){
        try{
            const categories = await axios.get(API_URI + '/categories', this.getAuthHeaders())
            return categories.data
        }catch (e) {
            console.log(e)
        }
    }

    async addNewCategory(payload){
        try{
            await axios.post(API_URI + '/categories', payload, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }

    async updateCategory(categoryId, payload){
        try{
            await axios.put(API_URI + '/categories/' + categoryId,  payload, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }


    async deleteCategory(categoryId){
        try{
            await axios.delete(API_URI + '/categories/' + categoryId, this.getAuthHeaders())
        }catch (e) {
            console.log(e)
        }
    }


}


export default ApiService
