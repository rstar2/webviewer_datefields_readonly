import Vue from 'vue';

import App from './App.vue'

console.dbg = function (msg) {
    console.log('%c %s %s %s %s', 'color: yellow; background-color: black;', '--', new Date(), msg, '--');
}

export default new Vue({
    render: h => h(App)
  }).$mount('#app');