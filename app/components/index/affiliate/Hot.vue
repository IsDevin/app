<template>
	<view class="hot">
		<commodity :list="list" cwidth="250rpx" hwidth="250rpx"></commodity>
	</view>
</template>

<script>

	import Commodity from '../../common/Commodity.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		components: {
			Commodity
		}
	}
</script>

<style>
</style>
