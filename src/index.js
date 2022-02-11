import getData from "./utils";

import './style/common.scss'

import Vue from 'vue';
import App from './App.vue';

import './style/common.scss';

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})