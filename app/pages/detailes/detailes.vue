<template>
	<view class="detail-wrapper">
		<swiper 
		:indicator-dots="true" 
		:autoplay="true" 
		:interval="3000"  
		:duration="1000"  
		:circular="true"
		class="swiper">
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-img" :src="detailList.imageUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品价格 -->
		<view class="goods-detailPrice">
			<view class="goods-text goods-price">￥{{detailList.price}}</view>
			<view class="goods-text goods-oprice">￥{{detailList.oprice}}</view>
			<view class="goods-text goods-name">{{detailList.title}}</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-detail">
			<image class="detail-img" src="../../static/img/detail1.jpg" mode=""></image>
			<image class="detail-img" src="../../static/img/detail2.jpg" mode=""></image>
			<image class="detail-img" src="../../static/img/detail3.jpg" mode=""></image>
			<image class="detail-img" src="../../static/img/detail4.jpg" mode=""></image>
		</view>
		<!-- 商品列表 -->
		<card title="看了又看"></card>
		<commdity-list :list="data"></commdity-list>
		<!-- 脚部 -->
		<view class="detail-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche"></view>
			<view class="add-shopcart" @tap="addToShopCart()">加入购物车</view>
			<view class="buy" @tap="ShowPop">立即购买</view>
		</view>
		<!-- 底部弹出层 -->
		<view v-show="isShow" class="pop" @touchmove.stop.prevent="">
			<!-- 蒙层 -->
			<view class="mask" @tap="HidePop"></view>
			<!-- 内容区域 -->
			<view class="pop-content" :animation="animationData">
				<view class="detail">
					<image class="img" :src="detailList.imageUrl" mode=""></image>
					<view class="detail-price">
						<text class="f-active-color">￥58.00</text>
						<text class="f-color">可购33件</text>
						<text class="f-color">已选:"透明"</text>
					</view>
				</view>
				<view class="choose">
					<view class="choose-title">
						颜色分类
					</view>
					<view class="choose-list">
						<view class="choose-item">
							透明
						</view>
					</view>
				</view>
				<view class="count">
					<view class="how-many">
						购买数量
					</view>
					<view class="count-num">
						<uni-num-box
						:min="1"
						:value="num"
						@change="changeNum($event)"></uni-num-box>
					</view>
				</view>
				<view class="comfirm" @tap="toShopcart()">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Card from '@/components/common/Card.vue';
	import CommdityList from '@/components/common/CommondityList.vue';
	import UniNumBox from '@/components/uni/uni-number-box/uni-number-box.vue';
	import $http from '@/common/js/request.js';
	import {mapMutations} from 'vuex';
 	export default {
		data() {
			return {
				imgList:[
					{imgUrl:"/static/img/details1.jpeg"},
					{imgUrl:"/static/img/details2.jpeg"},
					{imgUrl:"/static/img/details3.jpeg"}
				],
				num:1,
				isShow: false,
				animationData: {},
				id:0,
				data:[
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				],
				detailList:{},
				type:''
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.getData(e.id);
		},
		onBackPress() {
			if(this.isShow) {
				this.HidePop();
				return true;
			}
		},
		//监听原生标题栏点击事件(完成分享操作)
		onNavigationBarButtonTap(e) {
			console.log(e.type);
			//分享操作
			if(e.type === 'share'){
				this.share('weixin',0,this.detailList.title,this.id,this.detailList.imageUrl,'WXSceneSession')
			}
		},
		methods: {
			...mapMutations(['addCart']),
			//封装分享方法
			share(provider,type,title,id,imageUrl,scene) {
				uni.share({
					provider:provider,
					type:type,
					title:title,
					scene,
					href:`http://192.168.101.144:8080/#/pages/detailes/detailes?id=${id}`,
					imageUrl,
					success: (res) => {
						uni.showToast({
							title:'分享成功！'
						})
					},
					fail: (err) => {
						uni.showToast({
							title:`分享失败，错误码${JSON.stringify(err)}`,
							icon:'none'
						})
					}
				})
			},
			//改变购买数量
			changeNum(value) {
				this.num = value; 
			},
			//点击跳转到购物车
			toShopcart() {
				if(this.type==='') return;
				if(this.type === 'add'){
					//token验证
					$http.request({
						url:'/api/test',
						method:'POST',
						header:{
							token:true
						}
					})
					.then(res => {
						let goodsList = this.detailList;
						goodsList['num'] = this.num;
						goodsList['checked'] = false;
						this.addCart(goodsList);
						this.HidePop();
					})
				}else {
					uni.switchTab({
						url:'../shopcart/shopcart'
					})
				}
			},
			//添加到购物车
			addToShopCart() {
				this.ShowPop('add')
			},
			ShowPop(type) {
				//调用动画
				var animation = uni.createAnimation({
				  duration: 700,
				  timingFunction: "ease"
				})

				animation.translateY(600).step();
				this.animationData = animation.export()
				
				setTimeout(function() {
				   animation.translateY(0).step()
				   this.animationData = animation.export()
				}.bind(this), 200)
				 this.isShow = true;
				 if(type==='add') {
					 this.type = type;
				 }
			},
			getData(id) {
				$http.request({
					url: '/api/goods/getDataById',
					data: {
						id:id
					}
				})
				.then((res) => {
					this.detailList = res.data.list[0];
				})
				.catch((err) => {
					console.log(err);
				})
			},
			HidePop() {
				//调用动画
				var animation = uni.createAnimation({
				  duration: 700,
				  timingFunction: "ease"
				})
				
				animation.translateY(600).step();
				this.animationData = animation.export()
				
				setTimeout(function() {
				   animation.translateY(0).step()
				   this.isShow = false;
				}.bind(this), 200)
				
			}
		},
		components: {
			Card,
			CommdityList,
			UniNumBox
		}
	}
</script>

<style scoped>
.detail-wrapper {
	/* position: relative; */
	padding-bottom: 120rpx;
}
.swiper {
	width: 100%;
	height: 600rpx;
}
.swiper-img {
	width: 100%;
	height: 600rpx;
}
.detail-img {
	width: 100%;
	height: 600rpx;
}
.goods-text {
	text-align: center;
}
.detail-foot {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #FFFFFF;
	height: 120rpx;
}
.iconfont {
	width: 80rpx;
	height: 80rpx;
	background-color: #000000;
	color: #FFFFFF;
	border-radius: 100%;
	font-size: 60rpx;
	margin: 15rpx 20rpx;
	text-align: center;
	line-height: 80rpx;
}
.add-shopcart {
	width: 220rpx;
	height: 60rpx;
	color: #FFFFFF;
	background-color: #000000;
	border-radius: 40rpx;
	margin: 15rpx 20rpx;
	text-align: center;
	line-height: 60rpx;
	font-size: 30rpx;
}
.buy {
	width: 220rpx;
	height: 60rpx;
	color: #FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
	margin: 15rpx 20rpx;
	text-align: center;
	line-height: 60rpx;
	font-size: 30rpx;
}
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,.5);
	z-index: 9;
}
.pop-content {
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	height: 500px;
	background-color: #FFFFFF;
	z-index: 9999;
}
.detail {
	display: flex;
}
.img {
	position: relative;
	top: -40rpx;
	left: 20rpx;
	width: 260rpx;
	height: 260rpx;
}
.detail-price {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-left: 30rpx;
}
.choose {
	display: flex;
	flex-direction: column;
}
.choose-title {
	font-weight: bold;
	margin: 20rpx 0;
}
.choose-list {
	display: flex;
}
.choose-item {
	width: 110rpx;
	height: 60rpx;
	background-color: #49BDFB;
	border-radius: 30rpx;
	text-align: center;
	line-height: 60rpx;
	color: #FFFFFF;
}
.count {
	display: flex;
	justify-content: space-between;
	margin-top: 60rpx;
}
.comfirm {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #49BDFB;
	color: #FFFFFF;
	width: 100%;
	height: 110rpx;
	text-align: center;
	line-height: 110rpx;
}
</style>
