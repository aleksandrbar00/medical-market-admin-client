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
    categories: [],
    notification: {},
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
    },

    SET_NOTIFICATION(state, payload){
      state.notification = payload
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
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async addNewItem({getters, dispatch}, payload){
      try{
        const shopItem = await getters.apiService.addNewItem(payload)
        console.log(shopItem)
        await getters.apiService.uploadItemImage(shopItem.shopItem.id, payload.image)
        await dispatch('fetchCatalogItems')
        await dispatch('setNotification', {
          show: true,
          text: `Наименование (${shopItem.id}) успешно добавлено`,
        })
        dispatch('fetchCatalogItems')
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async deleteItem({getters, state, commit, dispatch}, payload){
      try{
        await getters.apiService.deleteItem(payload)
        const newState = state.catalog.filter(item => item.id !== payload)
        commit('SET_ITEMS', newState)
        await dispatch('setNotification', {
          show: true,
          text: `Наименование (${payload}) успешно удалено`,
        })
        dispatch('fetchCatalogItems')
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async updateItem({getters, dispatch}, payload){
      try{
        await getters.apiService.updateItem(payload.id, payload.data)
        await dispatch('setNotification', {
          show: true,
          text: `Наименование (${payload.id}) успешно обнавлено`,
        })
        dispatch('fetchCatalogItems')
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async addNewBrand({commit, getters, dispatch}, payload){
      try{
        await getters.apiService.addNewBrand(payload)
        await dispatch('fetchBrands')
        await dispatch('setNotification', {
          show: true,
          text: `Бренд  успешно добавлен`,
        })
        dispatch('fetchBrands')
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async deleteBrand({getters, commit, state, dispatch}, brandId){
      try{
        await getters.apiService.deleteBrand(brandId)
        const newState = state.brands.filter(item => item.id !== brandId)
        commit('SET_BRANDS', newState)
        await dispatch('setNotification', {
          show: true,
          text: `Бренд (${brandId}) успешно удален`,
        })
        dispatch('fetchBrands')
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async updateBrand({getters, dispatch}, payload){
      try{
        await getters.apiService.updateBrand(payload.brandId, payload.data)
        await dispatch('setNotification', {
          show: true,
          text: `Бренд (${payload.brandId}) успешно обнавлен`,
        })
        dispatch('fetchBrands')
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async fetchBrands({commit, getters}){
      try{
        const brands = await getters.apiService.fetchBrands()
        commit('SET_BRANDS', brands)
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async attachNewImage({commit, getters, dispatch}, {itemId, image}){
      try{
        await getters.apiService.uploadItemImage(itemId, image)
        await dispatch('setNotification', {
          show: true,
          text: `Изображения добавлено`,
        })
        dispatch('fetchCatalogItems')
        return Promise.resolve()
      }catch (e) {
        throw e
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
        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async addNewCategory({getters, dispatch}, payload){
      try{
        await getters.apiService.addNewCategory(payload)

        await dispatch('setNotification', {
          show: true,
          text: `Категория успешно добавлена`,
        })
        dispatch('fetchCategories')

        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async updateCategory({getters, dispatch}, payload){
      try{
        await getters.apiService.updateCategory(payload.categoryId, payload.data)
        await dispatch('setNotification', {
          show: true,
          text: `Категория (${payload.categoryId}) успешно обновлена`,
        })
        dispatch('fetchCategories')

        return Promise.resolve()
      }catch (e) {
        console.log(e)
      }
    },

    async deleteCategory({getters, state, commit, dispatch}, payload){
      try{
        await getters.apiService.deleteCategory(payload)
        const newState = state.categories.filter(item => item.id !== payload)
        await dispatch('setNotification', {
          show: true,
          text: `Категория (${payload}) успешно удалена`,
        })
        dispatch('fetchCategories')
        commit('SET_CATEGORIES', newState)
      }catch (e) {
        console.log(e)
      }
    },

    async setNotification({commit}, payload){
      try{
        const defaultTimeout = 2000
        commit('SET_NOTIFICATION', {...payload, timeout: payload.timeout || defaultTimeout })
        setTimeout(() => {
          commit('SET_NOTIFICATION', {})
        }, payload.timeout || defaultTimeout)
        return Promise.resolve()
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
