import store from '../../store/index.js';
export default {
	common: {
		baseUrl: 'http://192.168.101.144:3000',
		header: {
			'Content-Type': 'application/json',
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'GET',
		sslVerify: false,
		data: {},
		dataType: 'JSON'
	},
	request(options = {}) {
		options.url = this.common.baseUrl + options.url;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.data = options.data || this.common.data;
		options.dataType = options.dataType || this.common.dataType;
		options.sslVerify = options.sslVerify || this.common.sslVerify;
		//token验证
		if(options.header.token){
			if(!store.state.user.token) {
				uni.showToast({
					title:'请先登录',
					icon:'none'
				})
				return uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			options.header.token = store.state.user.token;
		}
		return new Promise((res,rej) => {
			uni.request({
				...options,
				success: (result) => {
					res(result);
				},
				fail: (err) => {
					rej(err);
				}
			})
		})

	}
}