<template>
	<view class="aff-wrapper">
		<banner :imageUrl="imageUrl"></banner>
		<icons-list :iconsList="iconsList"></icons-list>
		<card title="热销爆品"></card>
		<hot></hot>
		<card title="推荐店铺"></card>
		<slider-content 
		:recommImage="recommImage" 
		:sliderList="sliderList"></slider-content>
		<card title="为您推荐"></card>
		<commodity :list="sliderList"></commodity>
	</view>
</template>

<script>
	import Banner from '@/components/index/affiliate/Banner.vue';
	import IconsList from '@/components/index/affiliate/Icons.vue';
	import Hot from '@/components/index/affiliate/Hot.vue';
	import Card from '@/components/common/Card.vue';
	import SliderContent from '@/components/index/affiliate/SliderContent.vue';
	import Commodity from '@/components/common/Commodity.vue';
	export default {
		data() {
			return {
				recommImage:'/static/img/shop1.jpg',
				imageUrl:'/static/img/banner1.jpg',
				sliderList: [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				],
				iconsList: [
					{
						iconsUrl: '/static/img/icons1.png',
						title: '进口食品'
					},
					{
						iconsUrl: '/static/img/icons2.png',
						title: '中外名酒'
					},
					{
						iconsUrl: '/static/img/icons3.png',
						title: '休闲食品'
					},
					{
						iconsUrl: '/static/img/icons4.png',
						title: '居家出行'
					},
					{
						iconsUrl: '/static/img/icons5.png',
						title: '洗护喂养'
					},
					{
						iconsUrl: '/static/img/icons6.png',
						title: '进口食品'
					},
					{
						iconsUrl: '/static/img/icons7.png',
						title: '进口食品'
					},
					{
						iconsUrl: '/static/img/icons8.png',
						title: '进口食品'
					}
				]
			}
		},
		components: {
			Banner,
			IconsList,
			Hot,
			Card,
			SliderContent,
			Commodity
		}
		
	}
</script>

<style>
</style>
