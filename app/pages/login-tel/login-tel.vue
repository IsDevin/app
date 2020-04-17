<template>
	<view class="containner-wrap">
		<lines></lines>
		<view class="containner">
			<view class="user-name">
				<text class="input-title">手机号</text>
				<input type="number" v-model="userNumber" placeholder="请输入11位手机号" />
			</view>
			<view class="tel-res">
				<text @tap="nextStep">下一步</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '../../components/common/Lines.vue';
	import $http from '../../common/js/request.js';
	export default {
		data() {
			return {
				userNumber:'',
				rules:{
					"userNumber":{
						rule:/^1[3456789]\d{9}$/,
						msg:"请输入11位手机号"
					}
				}
			}
		},
		methods: {
			nextStep() {
				if(!this.validate('userNumber')) return;
				$http.request({
					url:'/api/register',
					data:{
						phoneNumber:this.userNumber
					},
					method:'POST'
				})
				.then(res => {
					if(!res.data.success) {
						uni.showToast({
							title:res.data.msg
						})
					}else {
						uni.navigateTo({
							url:'../login-code/login-code'
						})
					}
				})
				.catch(err => {
					console.log(err);
				})

			},
			//表单验证
			validate(key) {
				let flag = true;
				if(key) {
					if(!this.rules[key].rule.test(this.userNumber)) {
						uni.showToast({
							title:this.rules[key].msg,
							icon:'none'
						})
						flag = false;
					}
					return flag;
				}
			}
		},
		components: {
			Lines
		}
	}
</script>

<style scoped>
	.containner-wrap {
		width: 100vw;
		height: 100vh;
	}
	.containner {
		padding: 0 30rpx;
	}
	.user-name {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E7E7E7;
		padding: 30rpx 0;
	}
	.input-title {
		padding-right: 20rpx;
		font-size: 32rpx;
	}
	.tel-res {
		width: 100%;
		height: 88rpx;
		color: #FFFFFF;
		background-color: #49BDFB;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		border-radius: 60rpx;
		margin-top: 60rpx;
	}
</style>
