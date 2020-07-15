import Vue from 'vue';
import LoadScript from 'vue-plugin-load-script';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(LoadScript);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
