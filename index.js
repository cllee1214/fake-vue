import Vue from './src/vue.js';

var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    age: 5
  },
  methods: {
    say: function() {
      console.log(1111)
      console.log(this)
    }
  },
  beforeCreate () {
      console.log('beforecreate!')
  }
});


console.log(vm)
vm.message ='dfdfdf'
vm.say()