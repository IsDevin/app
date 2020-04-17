<template>
	<view class="commodity-list">
		<commodity-item :list="list"></commodity-item>
	</view>
</template>

<script>
	import CommodityItem from './Commodity.vue';
	export default {
		props:{
			list: Array
		},
		data() {
			return {

			}
		},
		components: {
			CommodityItem
		}
	}
</script>

<style>
	.commodity-list {
		display: flex;
		flex-wrap: wrap;
	}
</style>
