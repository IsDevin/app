<template>
	<view class="shop-list">
		<view class="shop-title">
			<view class="shop-item"
			v-for="(item,index) in shopList.dataList"
			:key="index"
			@tap="itemTap(index)"
			>
				<view class="f-color" :class="index === shopList.currentIndex ? 'f-active-color' : ''">{{item.name}}</view>
				<view class="shop-icons">
					<view class="iconfont icon-shangjiantou up"
					:class="item.status === 1 ? 'f-active-color': ''"
					></view>
					<view class="iconfont icon-xiajiantou down"
					:class="item.status === 2 ? 'f-active-color': ''"></view>
				</view>
			</view>
		</view>
		<lines></lines>
		<commodity-list :list="list"></commodity-list>
	</view>
</template>

<script>
	import Lines from './Lines.vue';
	import CommodityList from './CommondityList.vue';
	//引入封装好的request
	import $http from '@/common/js/request.js';
	export default {
		data() {
			return {
				shopList: {
					currentIndex: 0,
					dataList: [
						{name: '价格',status:1,key:'price'},
						{name: '折扣',status:0,key:'discount'},
						{name: '品牌',status:0,key:'brand'}
					]
				},
				list: []
			}
		},
		props: {
			keyword: String
		},
		components:{
			Lines,
			CommodityList
		},
		created() {
			// #ifdef APP-PLUS
				var webView = this.$mp.page.$getAppWebview(); 
				webView.setTitleNViewSearchInputText(this.keyword)
			// #endif
		},
		mounted() {
			//获取数据
			this.getData();
		},
		methods: {
			//点击切换
			itemTap(index) {
				this.getData();
				//索引
				let id = this.shopList.currentIndex;
				let item =  this.shopList.dataList[id];
				
				if(index === id) {
					return item.status = item.status === 1 ? 2 : 1;
				}

				let newItem = this.shopList.dataList[index];
				item.status = 0;
				//改变current
				this.shopList.currentIndex = index;
				newItem.status = 1;
				
			},
			//排序功能
			orderBy() {
				let shopList = this.shopList.dataList[this.shopList.currentIndex];
				let way = shopList.status === 1 ? 'desc' : 'asc';
				return {
					[shopList.key]: way
				}
			},
			getData() {
				$http.request({
					url: '/api/goods/search',
					data: {
						title:this.keyword,
						...this.orderBy()
					}
				})
				.then((res) => {
					this.list = res.data.list;
				})
				.catch((err) => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
		height: 88rpx;
	}
	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.shop-icons {
		position: relative;
	}
	.iconfont {
		position: absolute;
		left: 0;
	}
	.up {
		top: -34rpx;
	}
	.down {
		top: -20rpx;	
	}
</style>
