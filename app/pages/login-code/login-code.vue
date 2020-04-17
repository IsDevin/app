<template>
	<view class="containner-wrap">
		<lines></lines>
		<view class="containner">
			<view class="user-name">
				<text class="input-title">手机号</text>
				<input type="number" placeholder="请输入验证码" />
				<button type="primary" :disabled="isFinshed" v-model="code" plain="true" size="mini" @tap="sendCode">{{message}}</button>
			</view>
			<view class="tel-res" @tap="finshed">
				<text>下一步</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue';
	export default {
		data() {
			return {
				num:60,
				message:'发送验证码',
				isFinshed: false,
				code:''
			}
		},
		onLoad() {
			this.sendCode();
		},
		methods: {
			//发送验证码
			sendCode() {
				this.isFinshed = true;
				let timmer = setInterval(() => {
					this.message=`${this.num}秒后可以重新发送`;
					this.num--;
					if(this.num === 0) {
						this.message = '发送验证码';
						this.isFinshed = false;
						this.num = 60;
						clearInterval(timmer);
					}
				},6000)
			},
			finshed() {
				uni.redirectTo({
					url:'../index/index'
				})
			}
		},
		components: {
			Lines
		}
	}
</script>

<style scoped>
	.containner-wrap {
		width: 100vw;
		height: 100vh;
	}
	.containner {
		padding: 0 30rpx;
	}
	.user-name {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E7E7E7;
		padding: 30rpx 0;
	}
	.input-title {
		padding-right: 20rpx;
		font-size: 32rpx;
	}
	.tel-res {
		width: 100%;
		height: 88rpx;
		color: #FFFFFF;
		background-color: #49BDFB;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		border-radius: 60rpx;
		margin-top: 60rpx;
	}
</style>
