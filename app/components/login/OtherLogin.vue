<template>
	<view class="other-way">
		<view class="other-title">
			<view class="other">
				或者用以下方式登录
			</view>
		</view>
		<view class="other-logo">
			<view class="other-img" @tap="otherLogin('weixin')">
				<image src="../../static/img/wx.png" mode=""></image>
				<view class="text">
					微信登录
				</view>
			</view>
			<view class="other-img" @tap="otherLogin('sinaweibo')">
				<image src="../../static/img/wb.png" mode=""></image>
				<view class="text">
					微博登录
				</view>
			</view>
			<view class="other-img" @tap="otherLogin('qq')">
				<image src="../../static/img/qq.png" mode=""></image>
				<view class="text">
					QQ登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/js/request.js';
	import {mapMutations} from 'vuex';
	export default {
		methods:{
			...mapMutations(['getUserInfo']),
			otherLogin(type) {
				uni.login({
					provider:type,
					success: (res) => {
						//最主要的是openid
						uni.getUserInfo({
							provider:type,
							success:(res) => {
								let obj = {
									provider: type,
									openid:res.userInfo.openId,
									nickName:res.userInfo.nickName,
									avatarUrl:res.userInfo.avatarUrl
								}
								$http.request({
									url:'/api/otherLogin',
									method:'POST',
									data:obj
								})
								.then(res => {
									console.log(res);
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
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.other-title {
		padding: 50rpx 0;
	}
	.other {
		display: flex;
		width: 100%;
		margin-top: 40rpx;
		text-align: center;
		line-height: 0;
	}
	.other::after {
		flex: 1;
		content: '';
		height: 2rpx;
		background-color: #CCCCCC;
	}
	.other::before {
		flex: 1;
		content: '';
		height: 2rpx;
		background-color: #CCCCCC;
	}
	.other-logo {
		display: flex;
	
	}
	.other-img {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.other-img image {
		width: 88rpx;
		height: 88rpx;
		margin-bottom: 10rpx;
	}
</style>
