<template>
	<view class="config-wrap">
		<view class="config-list">
			<view class="list-item" @tap="toPathPage">
				<view class="item-title">
					地址管理
				</view>
				<view class="right">
					>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					地址管理
				</view>
				<view class="right">
					>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					地址管理
				</view>
				<view class="right">
					>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					地址管理
				</view>
				<view class="right">
					>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					地址管理
				</view>
				<view class="right">
					>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					地址管理
				</view>
				<view class="right">
					>
				</view>
			</view>
		</view>
		<view class="logout" @tap="loginOut">
			<text class="exit">退出</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['logout']),
			toPathPage() {
				uni.navigateTo({
					url:'../profile-path-list/profile-path-list'
				})
			},
			loginOut() {
				this.logout();
				uni.showToast({
					title:'退出登录成功',
					icon:'none'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				},1000)
			}
		}
	}
</script>

<style scoped>
.config-list {
	padding: 10rpx 20rpx;
}
.list-item {
	padding: 30rpx 20rpx;
	border-bottom: 1px solid #E7E7E7;
	display: flex;
	justify-content: space-between;
	font-size: 33rpx;
}
.logout{
	width: 100%;
	height: 88rpx;
	background-color: #49BDFB;
	text-align: center;
	line-height: 88rpx;
	color: #FFFFFF;
}
.right {
	font-size: 30rpx;
	font-weight: blod;
	color: #CCCCCC;
}
</style>
