<template>
	<view class="recommend">
		<view class="recommend-item" v-for="(item,index) in list" :key="index">
			<view class="big-item">
				<image class="big-img" :src="item.bigImg" mode=""></image>
			</view>
			<view class="small-item">
				<block v-for="(k,i) in item.data" :key="i">
					<image class="small-img" :src="k.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		}
	}
</script>

<style scoped>
	.recommend-item {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		margin: 20rpx;
		border-top: 1px solid rgba(191,191,191,.5);
		border-left: 1px solid rgba(191,191,191,.5);
		border-right: 1px solid rgba(191,191,191,.5);
		border-bottom: 1px solid rgba(191,191,191,.3);
		border-radius: 20rpx;
	}
	.big-img {
		width: 100%;
		height: 300rpx;
	}
	.small-item {
		width: 100%;
		display: flex;
	}
	.small-img {
		flex: 1;
		height: 240rpx;
	}
</style>
