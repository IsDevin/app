<template>
	<view class="shop-wrap">
		<!-- 导航栏 -->
		<uni-nav-bar 
		:right-text="rightText" 
		title="购物车"
		:status-bar="true"
		fixed="true"
		color="#606060"
		@clickRight="editFn">
		<view class="message-wrap" slot="right" style="margin-left: 20rpx;">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="messate-num">3</view>
		</view>
		</uni-nav-bar>
		
		<view v-if="list.length > 0">
			<!-- 购物车列表 -->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<view class="left">
						<label class="radio">
							<radio value="" color="#FF3333" @tap="selectItem(index)" :checked="item.checked"/><text></text>
						</label>
						<image class="img" :src="item.imageUrl" mode=""></image>
					</view>
					<view class="right">
						<view class="title">
							{{item.title}}
						</view>
						<view class="color">
							{{item.color}}
						</view>
						<view class="price">
							<text>￥{{item.price}}</text>
							<!-- 没点击编辑时 -->
							<template v-if="!isNavBar">
								<text class="count">x{{item.num}}</text>
							</template>
							<!-- 点击编辑后 -->
							<template v-else>
								<uni-num-box 
								:min="1" 
								:max="1000" 
								class="num-box" 
								:value="item.num" 
								@change="bindChange($event,index)"></uni-num-box>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="shop-foot">
				<label class="radio">
					<radio value="" color="#FF3333" :checked="checkedAll" @tap="checkedAllFn"/><text>全选</text>
				</label>
				
				<template v-if="!isNavBar">
					<view class="center">
						<view class="all">
							合计:<text class="all-price">￥{{totalCount.price}}</text>
						</view>
						<view class="delive">
							不含运费
						</view>
					</view>
					<view class="check" @tap="toCheck">
						结算({{totalCount.num}})
					</view>
				</template>
				
				<template v-else>
					<view class="foot-num" style="background-color: #000000; color: #FFFFFF;">移入收藏夹</view>
					<view class="foot-num del" @tap="delGoods">删除</view>
				</template>
			</view>
		</view>
		<view class="if-none" v-else>
			<view class="text">
				~囧  购物车空空如也
			</view>
		</view>
		<tab-bar currentItem="shopcart"></tab-bar>
	</view>
</template>

<script>
	import UniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue';
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex';
	import UniNumBox from '@/components/uni/uni-number-box/uni-number-box.vue';
	import TabBar from '@/components/common/TabBar.vue';
	export default {
		data() {
			return {
				rightText:'编辑',
				isNavBar:false
			}
		},
		methods: {
			...mapActions(['checkedAllFn','delGoods']),
			...mapMutations(['selectItem']),
			//点击编辑
			editFn () {
				this.isNavBar = !this.isNavBar;
			},
			bindChange(value,index) {
				this.list[index].num = value;
			},
			toCheck() {
				if(this.totalCount.num > 0) {
					uni.navigateTo({
						url:'../comfirmOrder/comfirmOrder'
					})
				}else {
					uni.showToast({
						title:'请选择你要购买的商品!',
						icon: 'none'
					})
				} 
			}
		},
		computed: {
			...mapState({
				list:state => state.cart.list
			}),
			...mapGetters(['checkedAll','totalCount'])
		},
		components:{
			UniNavBar,
			UniNumBox,
			TabBar
		},
		created() {
			if(this.list.length > 0) {
				this.rightText='编辑';
			}else {
				this.rightText='';
			}
		}
	}
</script>

<style scoped>
.shop-wrap {
	margin-bottom: 120rpx;
}
.message-wrap {
	position: relative;
}
.iconfont {
	font-size: 50rpx;
}
.messate-num {
	position: absolute;
	top: 10rpx;
	right: 0;
	width: 30rpx;
	height: 30rpx;
	color: #FFFFFF;
	background-color: #AA0000;
	text-align: center;
	line-height: 30rpx;
	border-radius: 100%;
	font-size: 24rpx;
}
.shop-item {
	display: flex;
	background-color: #F6F6F6;
	margin: 10rpx 0;
}
.left {
	display: flex;
	justify-content: center;
	align-items: center;
}
.right {
	margin-left: 20rpx;
}
.img {
	width: 200rpx;
	height: 200rpx;
}
.color {
	color: #CCCCCC;
	font-size: 24rpx;
}
.price{
	display: flex;
	justify-content: space-between;
}
.count{
	color: #CCCCCC;
	font-size: 24rpx;
	margin-right: 30rpx;
}
.radio {
	padding: 0 10rpx;
}
.shop-foot {
	width: 100%;
	height: 110rpx;
	background-color: #FFFFFF;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
}
.radio,.check,.center {
	flex: 1;
	text-align: center;
	line-height: 110rpx;
}
.radio {
	
}
.check {
	background-color: #49BDFB;
	color: #FFFFFF;
	font-size: 32rpx;
}
.center{
	padding-left: 150rpx;
}
.all {
	position: relative;
	top: 10rpx;
}
.all-price {
	padding-left: 10rpx;
	color: #49BDFB;
}
.delive {
	font-size: 20rpx;
	color: #ccc;
	position: relative;
	top: 10rpx;
}
.if-none {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: #CCCCCC;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: -1;
}
.num-box {
	padding-bottom: 20rpx;
}
.foot-num {
	width: 200rpx;
	height: 110rpx;
}
.del {
	background-color: #49BDFB;
	color: #FFFFFF;
}
</style>
