<template>
	<view class="commodity-item-wraper" :style="'flex-wrap:'+isWrap+''">
		<view 
		class="commodity-item" 
		v-for="(item,index) in list" :style="'width:'+cwidth+''"
		@tap="toDetail(item.id)">
			<image class="item-img" :src="item.imageUrl" :style="'height:'+hwidth+';width:'+iwidth+''"></image>
			<view class="context">
				<view class="text">{{item.title}}</view>
				<view><text class="price f-color">￥{{item.price}}</text><text class="oprice">￥{{item.oprice}}</text></view>
				<view class="discount"><text>{{item.discount}}折扣</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			cwidth: {
				type: String,
				default: '375rpx'
			},
			hwidth: {
				type: String,
				default: '375rpx'
			},
			isWrap: {
				type: String,
				default: 'wrap'
			},
			iwidth: {
				type: String,
				default: '100%'
			}
			
		},
		methods:{
			toDetail(id) {
				uni.navigateTo({
					url:'../../pages/detailes/detailes?id='+id+''
				})
			}
		}
	}
</script>

<style scoped>
	.commodity-item-wraper {
		width: 100%;
		display: flex;
	}
	.commodity-item {
/* 		width: 375rpx; */
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}
	.item-img {
		/* width: 100%; */
		/* width: 250rpx; */
		height: 250rpx;
		border: 1px solid #ccc;
	}
	.context {
		text-align: center;
	}
	.text {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp:2; //设置文本显示两行
		-webkit-box-orient:vertical; //从上到下排列子元素
		white-space:normal;
		word-break: break-all;
	}
	.price {
		font-weight: bold;
	}
	.oprice {
		color: #ccc;
		text-decoration: line-through;
	}
	.discount {
		color: #aa0000;
		font-size: 20rpx;
	}
	.discount text {
		border: 1px solid #aa0000;
		border-radius: 5rpx;
		padding: 2rpx;
	}
</style>
