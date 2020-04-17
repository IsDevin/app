<template>
	<view class="wrapper-bg">
		<lines></lines>
		<view class="wrapper">
			<view class="top" @tap="toPathList">
				<template v-if="path">
					<view class="addressee-info">
						<view class="addressee-name">
							收件人: {{path.name}}
						</view>
						<view class="addressee-number">
							{{path.number}}
						</view>
					</view>
					<view class="address-info">
						<view class="address">
							收货地址: {{path.city}} {{path.detail}}
						</view>
					</view>
				</template>
				<template v-else>
					<view class="addressee-info">
						<view class="addressee-name">
							请输入选择收货地址
						</view>
					</view>
				</template>
			</view>
	
			<view class="order-list">
				<order-list :itemList="itemList"></order-list>
			</view>
			<view class="submit-wrap">
				<view class="count">
					合计: <text class="f-active-color">￥3999.00</text>
				</view>
				<view class="submit">
					提交订单
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Lines from '@/components/common/Lines.vue';
	import orderList from '@/components/order/OrderList.vue';
	import {mapGetters} from 'vuex';
	export default {
		data() {
			return {
				itemList:[
					{
						imageUrl:'/static/img/Children1.jpg',
						title:'雅鹿·自由自在 蚊帐家纺 蒙古包蚊帐 免安装可折叠钢丝蚊帐床帘 帐纱加密魔术蚊帐 1.5米床 蓝色',
						price:'299.00',
						color:'黑色',
						isreson:true,
						num:1
					},
					{
						imageUrl:'/static/img/Children2.jpg',
						title:'雅鹿·自由自在 蚊帐家纺 蒙古包蚊帐 免安装可折叠钢丝蚊帐床帘 帐纱加密魔术蚊帐 1.5米床 蓝色',
						price:'299.00',
						color:'黑色',
						isreson:true,
						num:1
					}
				],
				path: false
			}
		},
		methods: {
			//跳转到地址管理页面
			toPathList() {
				uni.navigateTo({
					url:'../profile/comfig/profile-path-list/profile-path-list?type=selectPath'
				})
			}
		},
		computed: {
			...mapGetters(['getDefault'])
		},
		onLoad() {
			//得到收货地址
			if(this.getDefault) {
				this.path = this.getDefault[0];
			}
			//重新选择收货地址
			uni.$on('selectPathFn',res => {
				if(res) {
					this.path = res;
				}
			})
		},
		onUnload() {
			//移除页面通讯事件
			uni.$off('selectPathFn',() => {
				console.log('移动通讯事件成功...');
			})
		},
		components: {
			Lines,
			orderList
		}
	}
</script>

<style>
	.wrapper-bg {
		width: 100vw;
		height: 100vh;
		background-color: #E7E7E7;
	}
	.wrapper {
		background-color: #FFFFFF;
		padding: 10rpx 20rpx;
	}
	.addressee-info {
		display: flex;
		justify-content: space-between;
	}
	.submit-wrap {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 20rpx;
		background-color: #FFFFFF;
	}
	.count {
		margin-right: 20rpx;
		font-size: 32rpx;
	}
	.submit {
		width: 240rpx;
		height: inherit;
		text-align: center;
		line-height: 110rpx;
		color: #FFFFFF;
		background-color: #49BDFB;
	}
</style>
