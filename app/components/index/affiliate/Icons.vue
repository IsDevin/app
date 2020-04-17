<template>
	<view class="icons-wrapper">
		<view class="icons" v-for="(item,index) in iconsList" :key="index">
			<image class="icons-img" :src="item.iconsUrl" mode=""></image>
			<text class="icons-text">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			iconsList: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style scoped>
	.icons-wrapper {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.icons {
		width: 25%;
	}
	.icons-wrapper {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.icons {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 25%;
	}
	.icons-img {
		width: 110rpx;
		height: 110rpx;
	}
</style>
