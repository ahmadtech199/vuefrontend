import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// add material-design-icons
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: ['mdi','md']
  },
});
