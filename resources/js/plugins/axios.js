import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = '/api';
axios.defaults.params = {};

export default axios;
