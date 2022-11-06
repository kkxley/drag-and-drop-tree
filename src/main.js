import Vue from 'vue';
import App from './App.vue';
import TextHighlight from 'vue-text-highlight';
import './main.scss';

Vue.component('text-highlight', TextHighlight);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
