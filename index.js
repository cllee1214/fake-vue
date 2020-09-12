import Vue from './src/vue.js';

var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    say: function() {
      console.log(1111)
      console.log(this)
    }
  },
  computed: {
    c1: function() {
      return this.message + ' c1'
    }
  },
  beforeCreate () {
      console.log('beforecreate!')
  }
});

window.vm = vm
console.log(vm)
vm.message ='dfdfdf'
vm.say()