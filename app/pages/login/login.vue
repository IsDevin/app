<template>
	<view class="login">
		<view class="containner-wrap">
			<view class="containner">
				<swiper :vertical="true" style="height: 100vh;">
					<swiper-item>
						<view class="close" @tap="toBack">
							<image src="../../static/img/close.png" mode=""></image>
						</view>
						<view class="logo">
							<image src="../../static/img/logo.jpg" mode=""></image>
						</view>
						<view class="tel-res" @tap="toRes">
							<text>手机号注册</text>
						</view>
						<other-login></other-login>
						<view class="to-login">
							<view class="to-text">
								已有账号，去登录
							</view>
							<image src="../../static/img/down.png" mode=""></image>
						</view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<view class="top">
							<view>
								<view class="close" @tap="toBack">
									<image src="../../static/img/close.png" mode=""></image>
								</view>
							</view>
							<view>
								<image class="up" src="../../static/img/up.png" mode=""></image>
								<view class="to-text">
									没有账号，去注册
								</view>
							</view>
							<view class="empty"></view>
						</view>
						<view class="user-info">
							<view class="input">
								<view class="user-name">
									<text class="input-title">帐号</text>
									<input type="number" v-model="inputInfo.userName" placeholder="请输入手机号" />
								</view>
								<view class="password">
									<text class="input-title">密码</text>
									<input type="password" v-model="inputInfo.userPwd" placeholder="6-16位字符" />
								</view>
							</view>
							<view class="unfor">
								<view class="forgot">
									<text>忘记密码？</text>
								</view>
								<view class="no-pwd">
									<text>免密登录</text>
								</view>
							</view>
							<view class="tel-res" @tap="login">
								<text>登录</text>
							</view>
							<view class="message">
								<text>温馨提示：您可以选择免密登录，更加方便!</text>
							</view>
						</view>
						<other-login></other-login>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import OtherLogin from '@/components/login/OtherLogin.vue';
	import $http from '../../common/js/request.js';
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				inputInfo:{
					userName:"",
					userPwd:""
				},
				rules:{
					"userName":{
						emptyRule:/\S/,
						emptyMsg:"用户名不能为空"
					},
					"userPwd": {
						emptyRule:/\S/,
						emptyMsg:'密码不能位空',
						lengthRule:/^[a-zA-Z0-9-_.]{6,16}$/,
						lengthMsg:'密码长度必须6-16位'
					}
				}
			}
		},
		methods: {
			...mapMutations(['getUserInfo']),
			toRes () {
				uni.navigateTo({
					url:'../login-tel/login-tel'
				})
			},
			toBack() {
				uni.navigateBack({
					delta:1
				})
			},
			login() {
				if(!this.validate('userName','emptyRule')) return;
				if(!this.validate('userPwd','emptyRule')) return;
				if(!this.validate('userPwd','lengthRule')) return;
				$http.request({
					url:'/api/login',
					method:'POST',
					data:this.inputInfo
				})
				.then(res => {
					if(res.data.success) {
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						})
						this.getUserInfo(res.data.userInfo);
						setTimeout(() => {
							uni.hideLoading();
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else {
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						})
					}
				})
				.catch(err => {
					console.log(err);
				})

			},
			//表单验证
			validate(key,vali) {
				let flag = true;
				if(key) {
					if(vali === 'emptyRule') {
						if(!this.rules[key].emptyRule.test(this.inputInfo[key])) {
							uni.showToast({
								title:this.rules[key].emptyMsg,
								icon:'none'
							})
							flag = false;
						}
					}
					if(flag) {
						if(vali === 'lengthRule') {
							if(!this.rules[key].lengthRule.test(this.inputInfo[key])) {
								uni.showToast({
									title:this.rules[key].lengthMsg,
									icon:'none'
								})
								flag = false;
							}
						}
					}
					return flag;
				}
			}
		},
		components: {
			OtherLogin
		}
	}
</script>

<style scoped>
	.containner-wrap {
		width: 100vw;
		height: 100vh;
	}
	.containner {
		padding: 0 20rpx;
	}
	.close {
		width: 60rpx;
		height: 60rpx;
		padding-top: 60rpx;
	}
	.close image {
		width: 100%;
		height: 100%;
	}
	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		margin:50rpx 0 120rpx 0;
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
	}
	.to-login {
		width: 100%;
		text-align: center;
		padding-top: 120rpx;
	}
	.to-login image {
		width: 54rpx;
		height: 54rpx;
	}
	/* 第二部分 */
	.top {
		display: flex;
		padding-top: 30rpx;
		justify-content: space-between;
	}
	.top>view {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.top .close {
		padding-right: 120rpx;
	}
	.up {
		padding-top: 50rpx;
		width: 54rpx;
		height: 54rpx;
	}
	.user-info {
		padding-top: 200rpx;
	}
	.user-name {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E7E7E7;
		padding: 10rpx 0;
	}
	.password {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		border-bottom: 1px solid #E7E7E7;
		padding: 10rpx 0;
	}
	.input-title {
		padding-right: 20rpx;
	}
	.unfor {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0 160rpx 0;
	}
	.message {
		text-align: center;
		color: #CCCCCC;
		font-size: 28rpx;
	}
</style>
