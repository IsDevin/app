<template>
	<view class="path-wrap">
		<view class="path-list">
			
			<view v-for="(item,index) in pathList" :key="index" @tap="toComfirm(item)">
				<view class="path-list-item"
				@tap="editPath(index)">
					<view class="path-main">
						<view class="name">
							<text>{{item.name}}</text>
						</view>
						<view class="number">
							<text>{{item.number}}</text>
						</view>
					</view>
					<view class="path-main">
						<view class="mark" v-if="item.isDefault">
							<text>默认</text>
						</view>
						<view class="path">
							{{item.city}}{{item.detail}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add-new-path">
			<text class="path-text" @tap="toAddPathPage">新增地址</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				isConfirm:false
			}
		},
		onLoad(e) {
			if(e.type === 'selectPath') {
				this.isConfirm = true;
			}
		},
		methods: {
			//新增
			toAddPathPage() {
				uni.navigateTo({
					url:'../add-path-page/add-path-page'
				})
			},
			//修改
			editPath(index) {
				let list = JSON.stringify({
					index:index,
					item:this.pathList[index]
				})
				uni.navigateTo({
					url:'../add-path-page/add-path-page?data='+list+''
				})
			},
			toComfirm(item) {
				if(this.isConfirm) {
					uni.$emit('selectPathFn',item);
					uni.navigateBack({
						delta:1
					})
				}
			}
		},
		computed:{
			...mapState({
				pathList:state => state.path.pathList
			})
		}
	}
</script>

<style scoped>
.path-wrap {
	padding: 0 30rpx;
}
.path-list-item {
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #E7E7E7;
	margin-top: 20rpx;
}
.path-main {
	display: flex;
	align-items: center;
	
}
.name {
	margin-right: 10rpx;
}
.mark {
	margin-right: 10rpx;
}
.mark {
	padding: 2rpx 6rpx;
	color: #FFFFFF;
	font-size: 18rpx;
	border-radius: 20rpx;
	background-color: #49BDFB;
}
.add-new-path {
	margin-top: 60rpx;
	width: 100%;
	height: 70rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.path-text {
	width: 300rpx;
	height: 68rpx;
	color: #49BDFB;
	border: 1px solid #49BDFB;
	border-radius: 80rpx;
	font-size: 32rpx;
	text-align: center;
	line-height: 60rpx;
}
</style>
