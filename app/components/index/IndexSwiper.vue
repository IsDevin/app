<template>
	<swiper class="swiper" 
	:indicator-dots="true" 
	:autoplay="true" 
	:interval="3000" 
	:duration="1000"
	indicator-active-color="#fff"
	circular="true">
		<swiper-item v-for="(item,index) in list" :key="index">
			<view class="swiper-item"><image class="swiper-img" :src="item.imgUrl" mode=""></image></view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		// data() {
		// 	return {
		// 		dataList: [
		// 			{imgUrl: '/static/img/swiper1.jpg'},
		// 			{imgUrl: '/static/img/swiper2.jpg'},
		// 			{imgUrl: '/static/img/swiper3.jpg'}
		// 		]
		// 	}
		// },
		created() {
		}
	}
</script>

<style scoped>
	.swiper {
		width: 100%;
		height: 400rpx;
	}
	.swiper-img {
		width: 100%;
		height: 400rpx;
	}
</style>
