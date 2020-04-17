<template>
	<view class="banner-wrapper">
		<image class="banner-img" :src="imgList[0].imageUrl"></image>
	</view>
</template>

<script>
	export default {
		props: {
			imgList: Array
		}
	}
</script>

<style scoped>
	.banner-wrapper {
		width: 100%;
		height: 500rpx;
	}
	.banner-img {
		width: 100%;
		height: 500rpx;
	}
</style>
