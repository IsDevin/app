export default {
	state: {
		statusCode:false,
		token:null,
		userInfo:{}
	},
	mutations: {
		_initUserInfo(state) {
			let userInfo = uni.getStorageSync('userInfo');
			if( userInfo ) {
				userInfo = JSON.parse(userInfo);
				state.userInfo = userInfo;
				state.statusCode = true;
				state.token = userInfo.token;
			}
		},
		getUserInfo(state,userInfo) {
			state.statusCode = true;
			state.token = userInfo.token;
			state.userInfo = userInfo;
			uni.setStorageSync('userInfo',JSON.stringify(userInfo));
		},
		logout(state) {
			state.statusCode = false;
			state.token = null;
			state.userInfo = {};
			uni.removeStorageSync('userInfo');
		}
	},
	actions: {
		
	},
	getters:{
		
	}
}