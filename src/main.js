import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";

window.Bus = new Vue();
window.axios = axios;

window.token = localStorage.getItem("token");
window.user = localStorage.getItem("user");

axios.defaults.baseURL = "http://127.0.0.1:8000/api/auth";

axios.defaults.headers.common["Authorization"] = "Bearer " + window.token;
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
