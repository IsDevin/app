<template>
	<view class="card-wrapper f-color">
		<view>-</view>
		<view class="text">{{title}}</view>
		<view>-</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String
	}
}
</script>

<style scoped>
	.card-wrapper {
		display: flex;
		justify-content: center;
		font-weight: bold;
		padding: 20rpx 0;
	}
	.text {
		margin: 0 20rpx;
		font-size: 32rpx;
	}
</style>
