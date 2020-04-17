<template>
	<view class="profile-add-path">
		<view class="add-item">
			<view class="item-text">收件人</view>
			<input type="text" value="" placeholder="收件人名称" v-model="pathObj.name"/>
		</view>
		<view class="add-item">
			<view class="item-text">手机号</view>
			<input type="tel" value="" placeholder="11位手机号" v-model="pathObj.number"/>
		</view>
		<view class="add-item">
			<view class="item-text">所在地区</view>
			<view class="choose" @tap="showCityPicker">{{pathObj.city}} ></view>
			<!-- 三级联动 -->
			<mpvue-city-picker
			ref="mpvueCityPicker" 
			:pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm"
			></mpvue-city-picker>
		</view>
		<view class="add-item">
			<view class="item-text">详细地址</view>
			<input type="text" value="" placeholder="10-50个字符" v-model="pathObj.detail"/>
		</view>
		<view class="add-item">
			<view class="item-text">设为默认地址</view>
			<label class="radio">
				<radio value="" color="#FF3333" 
				:checked="pathObj.isDefault" @tap="changeDefault"/><text></text>
			</label>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/uni/mpvue-citypicker/mpvueCityPicker.vue';
	import {mapActions} from 'vuex';
	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
				label:'请选择',
				pathObj:{
					name:'',
					number:'',
					city:'请选择',
					detail:'',
					isDefault:false
				},
				isStatus:false,
				i:-1
			}
		},
		methods: {
			...mapActions(['addPath','updataPathFn']),
			changeDefault () {
				this.pathObj.isDefault = !this.pathObj.isDefault;
			},
			//三级联动插件
			showCityPicker() {
			  this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
			  this.pathObj.city = e.label;
			}
		},
		onLoad(e) {
			if(e.data) {
				let data = JSON.parse(e.data);
				this.i = data.index;
				this.pathObj = data.item;
				this.isStatus = true;
				uni.setNavigationBarTitle({
					title:'修改地址'
				})
			}else {
				this.isStatus = false;
			}
		},
		//原生标题栏点击事件
		onNavigationBarButtonTap(e) {
			if(e.float === 'right') {
				//修改地址操作
				if(this.isStatus) {
					let pathObj = {
						index:this.i,
						item:this.pathObj
					}
					this.updataPathFn(pathObj);
					uni.navigateBack({
						delta: 1
					})
				}else {//添加地址操作
					this.addPath(this.pathObj);
					uni.navigateBack({
						delta: 1
					})
				}
			}
		},
		components: {
			mpvueCityPicker
		}
	}
</script>

<style>
.profile-add-path {
	padding-left: 20rpx;
}
.add-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	width: 100%;
	border-bottom: 1px solid #E7E7E7;
}
.add-item input {
	flex: 1;
	text-align: left;
	padding-left: 10rpx;
}
.choose {
	padding-right: 30rpx;
}
.radio {
	padding-right: 30rpx;
}

</style>
