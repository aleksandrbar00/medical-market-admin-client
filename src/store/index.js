import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '../apis/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: '',
    },
    catalog: [],
    brands: [],
    categories: []
  },
  mutations: {
    SET_ITEMS(state, items){
      state.catalog = items
    },

    SET_BRANDS(state, brands){
      state.brands = brands
    },

    SET_TOKEN(state, token){
      state.auth.token = token
    },

    SET_CATEGORIES(state, categories){
      state.categories = categories
    }
  },
  actions: {

    initStore({state, commit}){
      if(!state.auth.token && window.localStorage){
        const token = window.localStorage.getItem('token')
        if(token){
          commit('SET_TOKEN', token.toString())
        }
      }
    },

    async loginUser({commit, getters}, payload){
      try{
        const token = await getters.apiService.loginUser(payload)
        commit('SET_TOKEN', token)
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async fetchCatalogItems({commit, getters}){
      try{
        const items = await getters.apiService.fetchItems()
        commit('SET_ITEMS', items)
      }catch (e) {
        console.log(e)
      }
    },

    async addNewItem({getters, dispatch}, payload){
      try{
        const shopItem = await getters.apiService.addNewItem(payload)
        await getters.apiService.uploadItemImage(shopItem.shopItem.id, payload.image)
        dispatch('fetchCatalogItems')
      }catch (e) {
        console.log(e)
      }
    },

    async addNewBrand({commit, getters, dispatch}, payload){
      try{
        await getters.apiService.addNewBrand(payload)
        dispatch('fetchBrands')
      }catch (e) {
        console.log(e)
      }
    },

    async fetchBrands({commit, getters}){
      try{
        const brands = await getters.apiService.fetchBrands()
        console.log(brands)
        commit('SET_BRANDS', brands)
      }catch (e) {
        console.log(e)
      }
    },

    async attachNewImage({commit, getters}, {itemId, image}){
      try{
        await getters.apiService.uploadItemImage(itemId, image)
        return Promise.resolve()
      }catch (e) {
        throw e
        console.log(e)
      }
    },

    async logout({commit}){
      commit('SET_TOKEN', '')
      if(window.localStorage){
        window.localStorage.clear()
      }
    },

    async fetchCategories({commit, getters}){
      try{
        const categories = await getters.apiService.fetchCategories()
        commit('SET_CATEGORIES', categories)
      }catch (e) {
        console.log(e)
      }
    },

    async addNewCategory({getters, dispatch}, payload){
      try{
        await getters.apiService.addNewCategory(payload)
      }catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    apiService: state => new ApiService(state.auth.token),
    token: state => state.auth.token
  },
  modules: {
  },
})
