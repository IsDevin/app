<template>
	<view class="wrapper">
		<view class="slider-wrapper" v-for="(item,index) in list" :key="index">
			<view class="image-wrap">
				<image class="image" :src="item.recommImage"></image>
			</view>
			<view class="slider-part">
				<scroll-view scroll-x="true" :show-scrollbar="false">
					<commodity 
					:list="item.data" 
					hwidth="210rpx"
					isWrap="nowrap"
					iwidth="220rpx"></commodity>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	import Commodity from '../../common/Commodity.vue';
	export default {
		props: {
			list: Array
		},
		components: {
			Commodity
		}
	}
</script>

<style scoped>
	.image-wrap {
		width: 100%;
		height: 600rpx;
	}
	.image {
		width: 100%;
		height: 600rpx;
	}
</style>
