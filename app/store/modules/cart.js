export default {
	state:{
		list:[],
		selectList:[]
	},
	getters:{
		//全选
		checkedAll(state) {
			return state.list.length === state.selectList.length;
		},
		//计算总数
		totalCount(state) {
			let obj = {
				price:0,
				num:0
			}
			state.list.forEach(v => {
				let id = state.selectList.indexOf(v.id)
				if(id > -1) {
					obj.price += v.price * v.num;
					obj.num += 1;
				}
			})
			
			return obj;
		}
	},
	mutations: {
		// 全不选
		checkedAll(state) {
			state.selectList = state.list.map(v => {
				v.checked = true;
				return v.id;
			})
		},
		//添加到购物车
		addCart(state,goodsList) {
			state.list.push(goodsList);
			if(state.list.length > 0) {
				uni.showToast({
					title:'成功添加到购物车!'
				})
			}else {
				uni.showToast({
					title:'添加失败!'
				})
			}
		},
		//全选
		unCheckedAll(state) {
			state.list.forEach(v => {
				v.checked = false
			})
			state.selectList = [];
		},
		//单选
		selectItem(state,index) {
			let id = state.list[index].id;
			let i = state.selectList.indexOf(id);
			//如果存在这个id，说明时选中状态
			if (i > -1) {
				state.list[index].checked = false;//改变状态
				return state.selectList.splice(i,1);//删除
			}
			
			state.list[index].checked = true;
			state.selectList.push(id);
		},
		//删除购物车商品
		delGoods(state) {
			state.list = state.list.filter(v => {
				return state.selectList.indexOf(v.id) === -1;
			})
		}
	},
	actions: {
		checkedAllFn({commit,getters}) {
			getters.checkedAll ? commit('unCheckedAll') : commit('checkedAll')
		},
		delGoods({commit}) {
			commit('delGoods');
			commit('unCheckedAll');
		}
	}

}