<template>
	<view>
		<lines></lines>
		<view class="search-item">
			<view class="search-title f-color">
				<view class="f-color">
					最近搜索
				</view>
				<view class="iconfont icon-lajitong" @tap="clearHistory"></view>
			</view>
			<view v-if="historyData.length > 0">
				<view 
				class="search-name f-color"
				v-for="(item,index) in historyData" :key="index"
				@tap="histryTap(item)"
				>
					{{item}}
				</view>
			</view>
			<view v-else class="search-end">
				暂无历史数据...
			</view>
		</view>
		<view class="search-item">
			<view class="search-title f-color">
				<view class="f-color">
					热门搜索
				</view>
			</view>
			<view>
				<view class="search-name f-color">
					AI机器人
				</view>
				<view class="search-name f-color">
					Iphone11
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '../../components/common/Lines.vue';
	export default {
		data() {
			return {
				keyword: '',
				historyData: []
			}
		},
		components:{
			Lines
		},
		onLoad() {
			uni.getStorage({
				key: 'searchData',
				success:(res) => {
					this.historyData = JSON.parse(res.data)
				}
			})
		},
		methods: {
			search() {
				if(this.keyword === '') {
					return uni.showToast({
						title: '关键字不能为空...',
						duration : 1500,
						icon: 'none'
					})
				}else {
					//调用跳转方法
					this.histryTap(this.keyword);
					uni.hideKeyboard();
					//添加搜索历史
					this.addSearchHistory();
				}
			},
			addSearchHistory() {
				let index = this.historyData.indexOf(this.keyword);
				if(index < 0) {
					this.historyData.unshift(this.keyword);	
				}else {
					this.historyData.splice(index,1);
					this.historyData.unshift(this.keyword);
				}
				uni.setStorage({
					key: 'searchData',
					data: JSON.stringify(this.historyData)
				})
			},
			//清空历史记录
			clearHistory() {
				uni.removeStorage({
					key: 'searchData',
					success: (res) => {
						uni.showToast({
							title:'删除成功'
						});
						this.historyData = [];
					}
				})
			},
			//点击历史记录跳转
			histryTap(item) {
				uni.navigateTo({
					url:'../search-list/search-list?keyword='+item+''
				})
				uni.hideKeyboard();
			}
		},
		//监听搜索宽输入
		onNavigationBarSearchInputChanged (e) {
			this.keyword = e.text;
		},
		//监听右上角搜索点击
		onNavigationBarButtonTap(e) {
			if(e.float === 'right'){
				this.search();
			}
		},
		//监听软键盘上的搜索
		onNavigationBarSearchInputConfirmed() {
			this.search();
		}
	}
</script>

<style scoped>
	.search-item {
		padding: 30rpx;
	}
	.search-title {
		display: flex;
		justify-content: space-between;
	}
	.search-name {
		display: inline-block;
		padding: 10rpx 20rpx;
		margin: 10rpx;
		border-radius: 15rpx;
		background-color: #DDDDDD;
	}
	.search-end {
		text-align: center;
	}
</style>
