<template>
	<view class="wrap">
		<block v-for="(goods,xid) in itemList">
			<view class="goods-item">
				<view class="image-wrap">
					<image :src="goods.imageUrl" mode=""></image>
				</view>
				<view class="goods-text">
					<view class="title">
						<view class="title-item">
							{{goods.title}}
						</view>
						<view class="title-price">
							￥{{goods.price}}
						</view>
					</view>
								
					<view class="mark">
						<view class="color">
							<text class="category">颜色分类: {{goods.color}}</text>
							<text class="reson f-active-color" v-if="goods.isreson">7天无理由</text>
						</view>
						<view class="num">
							x {{goods.num}}
						</view>
					</view>				
				</view>	
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			itemList:{
				type:Array,
				default: []
			}
		}
	}
</script>

<style scoped>
	.goods-item {
		display: flex;
		background-color: #E7E7E7;
		padding: 20rpx;
		margin: 20rpx 0;
	}
	.image-wrap {
		width: 180rpx;
		height: 180rpx;
		overflow: hidden;
		margin-right: 10rpx;
	}
	.image-wrap image {
		width: 100%;
		height: 100%;
	}
	.goods-text {
		flex: 1;
	}
	.title {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
	}
	.mark {
		display: flex;
		justify-content: space-between;
	}
	.title-item {
		width: 350rpx;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 2;
		 line-clamp: 2;
		 -webkit-box-orient: vertical;
	}
	.title-price {
		line-height: 120rpx;
	}
	.color {
		display: flex;
		flex-direction: column;
	}
	.reson {
		font-size: 24rpx;
	}
	.num,.category{
		color: #555555;
		font-size: 24rpx;
	}
</style>
