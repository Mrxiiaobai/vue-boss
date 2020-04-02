export default {
	// aupdateInfo(context, payload) {
	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			context.commit('updateInfo')
	// 			console.log(payload)
	// 		}, 1000)
	// 		resolve('1111')
	// 	})
	// },
	asetUserInfo(context,payload) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				context.commit('setUserInfo',payload)
				console.log(payload)
			}, 0)
			resolve('1111')
		})
	},
	asetUserId(context,payload){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('存入state中的data数据',payload)
				context.commit('setUserId',payload)
			}, 0)
			resolve('触发resolve中的console')
		}).then((resolve,reject)=>{
			console.log(resolve)
		}) 
	}
}
