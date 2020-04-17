<template>
	<view class="index">
		<scroll-view scroll-x="true" :scroll-into-view="'top'+intoView" class="top-bar">
				<view class="top-bar-item"
				:id="'top'+index"
				v-for="(item,index) in topBarList"
				:key="index"
				@tap="topClick(index)">
					<text :class="currentIndex===index ? 'f-active-color' : ''">{{item.name}}</text>
				</view>
		</scroll-view>
		<swiper class="swiper" @change="swiperChange" :current="currentIndex" :style="'height:'+pageHight+'px'">
			<swiper-item
			v-for="(item,index) in newTopBar"
			:key="index"
			>
				<scroll-view scroll-y="true" :style="'height:'+pageHight+'px'" @scrolltolower="loadMore(index)">
					<block v-for="(k,i) in item.data" :key="i">
						
						<!-- 推荐 -->
						<swiper-index v-if="k.type === 'swiperList'" :list="k.data"></swiper-index>
						<template v-if="k.type === 'recommendList'">
							<recommend :list="k.data"></recommend>
							<card title="猜你喜欢"></card>
						</template>
						
						<!-- 运动户外。。。 -->
						<banner v-if="k.type === 'bannerList'" :imgList="k.data"></banner>
						<template v-if="k.type === 'iconsList'">
							<icons-list :iconsList="k.data"></icons-list>
							<card title="热销爆品"></card>
						</template>
						<template v-if="k.type === 'hotList'">
							<hot :list="k.data"></hot>
							<card title="推荐店铺"></card>
						</template>
						<template v-if="k.type === 'sliderList'">
							<slider-content :list="k.data"></slider-content>
							<card title="猜你喜欢"></card>
						</template>
						
						<commodity-list  v-if="k.type === 'commodityList'" :list="k.data"></commodity-list>						
					</block>
					<view class="load-text f-color">
						{{item.loadText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<tab-bar currentItem="index"></tab-bar>
	</view>
</template>

<script>
	// 推荐相关组件
	import SwiperIndex from '@/components/index/IndexSwiper.vue';
	import Recommend from '@/components/index/Recommend.vue';
	import Card from '@/components/common/Card.vue';
	import CommodityList from '@/components/common/CommondityList.vue';
	// 运动户外与其他相关组件
	import Banner from '@/components/index/affiliate/Banner.vue';
	import IconsList from '@/components/index/affiliate/Icons.vue';
	import Hot from '@/components/index/affiliate/Hot.vue';
	import SliderContent from '@/components/index/affiliate/SliderContent.vue';
	import TabBar from '@/components/common/TabBar.vue';
	//引入封装好的request
	import $http from '@/common/js/request.js';
	
	export default {
		data() {
			return {
				topBarList:[],
				currentIndex:0,
				intoView:0,
				pageHight:0,
				newTopBar: []
			}
		},
		components:{
			SwiperIndex,
			Recommend,
			Card,
			CommodityList,
			Banner,
			IconsList,
			Hot,
			SliderContent,
			TabBar
		},
		onLoad() {
			//请求接口数据
			this.__init();
		},
		onReady() {
			//获取系统信息，解决可视化高度的问题
			uni.getSystemInfo({
				success: (res) => {
					// this.pageHight = res.windowHeight-uni.upx2px(44)-this.getSystemInfo();
					this.pageHight = res.windowHeight-this.getSystemInfo()-uni.upx2px(110);
				}
			})
		},
		//原生标题栏点击事件
		onNavigationBarButtonTap(e) {
			if(e.float === 'left') {
				uni.navigateTo({
					url: '../search/search'
				})
			}
		},
		methods: {
			
			__init() {
				$http.request({
					url: '/api/index_list/data'
				})
				.then((res) => {
					let data = res.data.data;
					this.topBarList = data.topBar;
					this.newTopBar = this.__initData(data);
				})
				.catch((err) => {
					console.log(err);
				})
			},
			getSystemInfo() {
				let system = '';
				//获取系统信息，解决可视化高度的问题
				uni.getSystemInfo({
					success: (res) => {
						if(res.platform === 'ios') {
							system = 44;
						}else if (res.platform === 'android') {
							system = 48;
						}else {
							system = 0;
						}
					}
				})
				return system;
			},
			__initData(res) {
				// console.log(JSON.stringify(res));
				let arr = [];
				for(let i = 0; i < this.topBarList.length; i++) {
					let obj = {
						data: [],
						load: 'frist',
						loadText: '上拉加载更多...'
					};
					if(i == 0) {
						obj.data = res.data;
					}
					arr.push(obj);
				}
				return arr;
			},
			topClick(index) {
				if(index===this.currentIndex) return;
				this.currentIndex = index;
				this.intoView = this.currentIndex;
				//每次请求
				if(this.newTopBar[index].load === 'frist') {
					this.setData();
				}
			},
			//content轮播触发change事件
			swiperChange(e) {
				this.topClick(e.detail.current)
			},
			//点击轮播改变数据
			setData(callback) {
				//拿到索引
				let currentIndex = this.currentIndex;
				//拿到id
				let id = this.topBarList[currentIndex].id;
				//上拉加载更多数据算法
				let page = Math.ceil((this.newTopBar[currentIndex].data.length / 5) + 1);
				
				//请求不同的数据
				$http.request({
					url: `/api/index_list/${id}/data/${page}`
				})
				.then((res) => {
					let data = res.data.data;
					//请求不到数据
					if(typeof data == 'undefined'){
						this.newTopBar[currentIndex].loadText = '没有更多数据了QAQ....';
						return;
					}
					this.newTopBar[currentIndex].data = [...this.newTopBar[currentIndex].data,...data];
				})
				.catch((err) => {
					console.log(err);
				})
				
				this.newTopBar[currentIndex].load = 'last';
				//判断是否还有数据
				if(typeof callback === 'function') {
					callback();
				}
			},
			loadMore(index) {
				this.newTopBar[index].loadText = '加载中...';
				this.setData(() => {
					this.newTopBar[index].loadText = '上拉加载更多...';
				})
			}
		}
	}
</script>

<style scoped>
	.top-bar {
		width: 100%;
		height: 88rpx;
		white-space: nowrap;	
	}
	.top-bar-item {
		display: inline-block;
		font-size: 36rpx;
		padding: 10rpx 20rpx;
	}
	.f-active-color {
		border-bottom: 6rpx solid #49BDFB;
	}
	.load-text {
		text-align: center;	
	}
</style>
