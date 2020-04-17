import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import cart from './modules/cart.js'
import path from './modules/path.js'
import user from './modules/user.js'
export default new Vuex.Store({
	modules:{
		cart,
		path,
		user
	}
})