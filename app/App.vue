<script>
	export default {
		onLaunch: function() {
			this.$store.commit('_initUserInfo');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("~@/common/common.css");
	@import url("~@/common/uni.css");
	@import url("~@/common/iconfont.css");
</style>
