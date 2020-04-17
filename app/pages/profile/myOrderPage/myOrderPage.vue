<template>
	<view class="wrapper">
		<lines></lines>
			<!-- 头部导航部分 -->
			<view class="header-list">
				<view class="header-item" 
				v-for="(item,index) in navList" 
				:key="index"
				@tap="changeCurrent(index)">
					<text class="item-text" :class="index === currentIndex ? 'active': 'item-text'">{{item.title}}</text>
				</view>
			</view>
			<!-- 商品部分 -->
			<view v-for="(item,index) in navList" :key="index">
				<view v-show="index === currentIndex">	
				<view v-if="item.list.length > 0">
					<block v-for="(k,i) in item.list" :key="i">
							<view class="goods-main">
								<!-- 上部分 -->
								<view class="message">
									<view class="message-text f-active-color">
										{{k.status}}
									</view>
								</view>
								<!-- 中间部分 -->
								<view class="goods-content">
									<!-- 订单列表 -->
									<order-list :itemList="k.itemList"></order-list>
									
									<lines></lines>
									<view class="totle">
										<text>订单金额:</text>
										<text class="t-price f-active-color">￥{{k.totalPrice}}</text>
										<text class="fee">包含运费(￥0.00)</text>
									</view>
								</view>
								<lines></lines>
								<!-- 下部分 -->
								<view class="payment">
									<view class="pay-text f-active-color">
										支付
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class="no-order" v-else>
						<view class="no-message">
							您还没有相关信息
						</view>
						<view class="btn">
							去首页逛逛
						</view>
					</view>
					
				</view>
			</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue';
	import OrderList from '../../../components/order/OrderList.vue';
	export default {
		data() {
			return {
				navList:[
					{
						id:1,
						title:'全部',
						list:[
							{
								status:'待付款',
								totalPrice:'399',
								itemList:[
									{
										imageUrl:'/static/img/Children1.jpg',
										title:'雅鹿·自由自在 蚊帐家纺 蒙古包蚊帐 免安装可折叠钢丝蚊帐床帘 帐纱加密魔术蚊帐 1.5米床 蓝色',
										price:'299.00',
										color:'黑色',
										isreson:true,
										num:1
									}
								]
							}
						]
					},
					{
						id:2,
						title:'待付款',
						list:[]
					},
					{
						id:3,
						title:'待发货',
						list:[]
					},
					{
						id:4,
						title:'待收款',
						list:[]
					},
					{
						id:5,
						title:'待评价',
						list:[]
					}
				],
				currentIndex:0
			}
		},
		methods: {
			changeCurrent(index) {
				this.currentIndex = index;
			}
		},
		components: {
			Lines,
			OrderList
		}
	}
</script>

<style>
.wrapper {
	width: 100vw;
	height: 100vh;
	background-color: #E7E7E7;
}
.header-list{
	display: flex;
	height: 88rpx;
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
	border-bottom: 1px solid #CCCCCC;
	padding: 5rpx;
}
.header-item {
	flex: 1;
	text-align: center;
}
.item-text {
	padding: 24rpx 0;
}
.active {
	border-bottom: 5rpx solid #49BDFB;
}
.goods-main {
	background-color: #FFFFFF;
	width: 100%;
}
.message {
	width: 100%;
	height: 88rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.message-text {
	padding-right: 20rpx;
}
.goods-content {
	background-color: #FFFFFF;
}
.totle {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
}
.totle text {
	margin-right: 5rpx;
}
.t-price {
	padding-right: 10rpx;
}
.fee {
	padding-right: 30rpx;
}
.payment {
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.pay-text {
	margin-right: 40rpx;
	width: 140rpx;
	height: 64rpx;
	text-align: center;
	line-height: 64rpx;
	border: 1px solid #49BDFB;
	border-radius: 40rpx;
}
.no-order {
	width: 97vw;
	height: 99vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: -95rpx;
	color: #000000;
}
.btn {
	margin-top: 20rpx;
	padding: 10rpx 80rpx;
	border: 1px solid #49BDFB;
	border-radius: 40rpx;
	color: #49BDFB;
}
</style>
