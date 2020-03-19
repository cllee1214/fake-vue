import Vue from './src/vue.js';

var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  beforeCreate () {
      console.log('beforecreate!')
  }
});


console.log(vm)
vm.message ='dfdfdf'