export default {
	state: {
		pathList:[]
	},
	getters: {
		getDefault(state) {
			return state.pathList.filter(v => v.isDefault)
		}
	},
	mutations: {
		//增加地址
		addPath(state,obj) {
			state.pathList.unshift(obj);
		},
		//修改地址
		updataPath(state,{index,item}) {
			for(let k in item) {
				state.pathList[index][k] = item[k];
			}
		},
		removeDefault(state) {
			state.pathList.forEach(v => {
				if(v.isDefault) {
					v.isDefault = false;
				}
			})
		}
	},
	actions: {
		//添加地址
		addPath({commit},obj) {
			if(obj.isDefault) {
				commit('removeDefault');
			}
			commit('addPath',obj);
		},
		//更新地址
		updataPathFn({commit},pathObj) {
			if(pathObj.item.isDefault) {
				commit('removeDefault');
			}
			commit('updataPath',pathObj);
		}
	}
	
}