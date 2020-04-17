<template>
	<view class="tabbar-wrap">
			<view 
			class="tab-item" 
			v-for="(item,index) in tabBarList" 
			:key="index"
			@tap="navTo(item.pagePath)"
			>
				<image v-if="currentItem === item.pagePath" :src="item.selectedIconPath" mode=""></image>
				<image v-else :src="item.iconPath" mode=""></image>
				<view class="text f-color">{{item.text}}</view>
			</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		props:{
			currentItem: {
				type:String,
				default:'index'
			}
		},
		data() {
			return {
				tabBarList:[
					{
						"pagePath":"index",
						"iconPath":"/static/tabbar/home.png",
						"selectedIconPath":"/static/tabbar/active_home.png",
						"text":"首页"
					},
					{
						"pagePath":"category",
						"iconPath":"/static/tabbar/category.png",
						"selectedIconPath":"/static/tabbar/active_category.png",
						"text":"分类"
					},
					{
						"pagePath":"shopcart",
						"iconPath":"/static/tabbar/shop_cart.png",
						"selectedIconPath":"/static/tabbar/active_shop_cart.png",
						"text":"购物车"
					},
					{
						"pagePath":"profile",
						"iconPath":"/static/tabbar/profile.png",
						"selectedIconPath":"/static/tabbar/active_profile.png",
						"text":"我的"
					}
				]
			}
		},
		methods: {
			navTo(e) {
				if(e === 'profile' || e === 'shopcart') {
					this.naviageTo({
						url:`../../pages/${e}/${e}`
					})
				}else {
					uni.redirectTo({
						url:`../../pages/${e}/${e}`
					})
				}
			}
		},
		computed: {
			...mapState({
				statusCode:state => state.user.statusCode
			})
		}
	}
</script>

<style>
	.tabbar-wrap {
		background-color: #FFFFFF;
		width: 100%;
		height: 120rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.tab-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
	}
	.tab-item image {
		width: 56rpx;
		height: 56rpx;
	}
</style>
