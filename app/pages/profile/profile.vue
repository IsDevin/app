<template>
	<view class="profile">
		<!-- 头像部分 -->
		<view class="profile-header">
			<image class="header-config" @tap="toEditList" src="../../static/img/config.png" mode=""></image>
			<view class="header-vator-wrap">
				<image class="vator" :src="statusCode ? userInfo.imageUrl : '/static/img/config.png'" mode=""></image>
				<text class="nike">{{statusCode ? userInfo.nike : '用户名称'}}</text>
			</view>
		</view>
		<!-- 订单列表部分 -->
		<view class="order-wrap">
			<view class="order-top" @tap="toOrderPage">
				<view class="top-title">我的订单</view>
				<view class="top-title">全部订单<text class="left">></text></view>
			</view>
			<view class="order-content">
				<view class="order-item">
					<image class="item-img" src="../../static/img/order1.png" mode=""></image>
					<text class="item-text">待付款·</text>
				</view>
				<view class="order-item">
					<image class="item-img" src="../../static/img/order2.png" mode=""></image>
					<text class="item-text">待付款</text>
				</view>
				<view class="order-item">
					<image class="item-img" src="../../static/img/order3.png" mode=""></image>
					<text class="item-text">待付款</text>
				</view>
				<view class="order-item">
					<image class="item-img" src="../../static/img/order4.png" mode=""></image>
					<text class="item-text">待付款</text>
				</view>
				<view class="order-item">
					<image class="item-img" src="../../static/img/order5.png" mode=""></image>
					<text class="item-text">待付款</text>
				</view>
			</view>
		</view>
		<!-- 个人信息部分 -->
		<view class="profile-info">
			<view class="info-item">
				<view class="info-text">
					我的收藏
				</view>
				<view class="info-icon">
					>
				</view>
			</view>
			<view class="info-item">
				<view class="info-text">
					我的收藏
				</view>
				<view class="info-icon">
					>
				</view>
			</view>
			<view class="info-item">
				<view class="info-text">
					我的收藏
				</view>
				<view class="info-icon">
					>
				</view>
			</view>
			<view class="info-item">
				<view class="info-text">
					我的收藏
				</view>
				<view class="info-icon">
					>
				</view>
			</view>
			<view class="info-item">
				<view class="info-text">
					我的收藏
				</view>
				<view class="info-icon">
					>
				</view>
			</view>
		</view>
		<tab-bar currentItem="profile"></tab-bar>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import TabBar from '@/components/common/TabBar.vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toEditList() {
				uni.navigateTo({
					url:'./comfig/profile-config/profile-config'
				})
			},
			//进入我的订单页面
			toOrderPage() {
				uni.navigateTo({
					url:'myOrderPage/myOrderPage'
				})
			}
		},
		computed:{
			...mapState({
				statusCode:state => state.user.statusCode,
				userInfo:state => state.user.userInfo
			})
		},
		components:{
			TabBar
		}
	}
</script>

<style scoped>
.profile {
	margin-bottom: 120rpx;
}
.profile-header {
	position: relative;
	background-image: url(../../static/img/mybg.png);
	width: 100%;
	height: 400rpx;
}
.header-vator-wrap {
	width: 150rpx;
	height: 180rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -75rpx;
	margin-top: -80rpx;
}
.vator {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	border: 1px solid #e7e7e7;
}
.nike {
	color: #FFFFFF;
	padding-top: 20rpx;
}
.header-config {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	top: 50rpx;
	left: 50rpx;
	font-size: 28rpx;
}
.order-top {
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
}
.top-title {
	font-size: 30rpx;
}
.left {
	font-size: 30rpx;
	font-weight: bold;
	margin: 0 20rpx;
}
.order-content {
	margin-top: 20rpx;
	display: flex;
}
.order-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 30rpx;
}
.item-img {
	width: 66rpx;
	height: 66rpx;
}
.profile-info {
	padding: 20rpx 30rpx;
	margin-top: 10rpx;
}
.info-item {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e7e7e7;
	padding: 20rpx 0;
}
.info-icon {
	font-size: 40rpx;
	font-weight: bold;
	color: #CCCCCC;
}
</style>
