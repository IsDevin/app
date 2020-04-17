<template>
	<view>
		<lines></lines>
		<view class="list">
			<!-- 左侧 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+pageHight+'px'">
				<view v-for="(item,index) in leftData" class="left-item" :key="index" @tap="changesLeftTap(index,item.id)">
					<view class="left-name f-color" :class="index === currentIndex ? 'left-name-active' : ''">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+pageHight+'px'">
				<view class="right-list" v-for="(item,index) in rightData" :key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(j,xid) in k.list" :key="xid">
								<image class="right-img" :src="j.imgUrl" mode=""></image>
								<view class="right-name">{{j.name}}</view>
							</view>
						</view>
					</block>
				</view>			
			</scroll-view>
		</view>
		<tab-bar currentItem="categoty"></tab-bar>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import $http from '@/common/js/request.js'
	import TabBar from '@/components/common/TabBar.vue';
	export default {
		data() {
			return {
				pageHight:0,
				currentIndex:0,
				leftData:[],
				rightData:[]
			}
		},
		components: {
			Lines,
			TabBar
		},
		onLoad() {
			this.getData();
		},
		//搜索栏点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'../search/search'
			})
		},
		methods: {
			//获取数据
			getData(id) {
				//点击当前选中内容时不再请求
				if(id === this.currentIndex+1) {
					return;
				}

				$http.request({
					url:'/api/goods/categoryList'
				})
				.then((res) => {
					let leftData = [];
					let rightData = [];
					let data = res.data.data;
					for(let k of data) {
						leftData.push({
							id:k.id,
							name:k.name
						});
						//点击的id等于对应数据的id就显示对应的数据
						if(k.id === (this.currentIndex+1)) {
							rightData.push(k.data);
						}
					}
					this.leftData = leftData;
					this.rightData = rightData;
				})
				.catch((err) => {
					console.log(err);
				})

			},
			getSystemInfo() {
				let system = '';
				//获取不同端的信息解决刘海屏问题
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
			changesLeftTap(i,id) {
				this.getData(id);
				this.currentIndex = i;
			}
		},
		onReady() {
			//获取系统信息，解决可视化高度的问题
			uni.getSystemInfo({
				success: (res) => {
					this.pageHight = res.windowHeight-this.getSystemInfo();
				}
			})
		}
	}
</script>

<style scoped>
.list {
	display: flex;
	margin-bottom: 120rpx;
}
.list-left {
	width: 200rpx;
}
.list-right {
	flex: 1;
}
.left-item {
	font-size: 28rpx;
	background-color: #F7F7F7;
	padding-bottom: 2rpx;
	border-bottom: #FFFFFF;
}
.left-name {
	padding: 20rpx 2rpx;
	text-align: center;
	font-weight: bold;
}
.left-name-active {
	border-left: 10rpx solid #49BDFD;
	background-color: #FFFFFF;
}
.list-title {
	padding: 20rpx 0;
	font-weight: bold;
}
.right-content {
	display: flex;
	flex-wrap: wrap;

}
.right-item {
	width: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10rpx;
}
.right-name {
	padding: 16rpx 0;
}
.right-img {
	width: 150rpx;
	height: 150rpx;
}
</style>
