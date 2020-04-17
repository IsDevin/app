import Vue from 'vue'
import App from './App'
import store from 'store'
Vue.config.productionTip = false
Vue.prototype.naviageTo =  (options) => {
	
	if(!store.state.user.statusCode) {
		uni.showToast({
			title:'请先登录',
			icon:'none'
		})
		return uni.navigateTo({
			url:'/pages/login/login',
			animationType:'fade-in',
			duration:0
		})
	}
	
	 uni.redirectTo(options);

}
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
