import Vue from 'vue'
import Vuetify from 'vuetify'
import ru from 'vuetify/es5/locale/ru'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    lang: {
        locales: {ru},
        current: 'ru',
    }
}

export default new Vuetify(opts)