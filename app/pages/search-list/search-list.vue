<template>
	<view class="shop-list">
		<shop-list :keyword="keyword"></shop-list>
	</view>
</template>

<script>
	import ShopList from '../../components/common/ShopList.vue';
	export default {
		data() {
			return {
				keyword: ''
			}
		},		
		onLoad(e) {
			this.keyword = e.keyword
		},
		components:{
			ShopList
		}
	}
</script>

<style scoped>
</style>
