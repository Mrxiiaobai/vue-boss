export default {
	// getters,实时监听state值的变化
	useInfo(state){
		return state.loginCode
	},
	
    // powerCounter(state){
    //     return state.counter * state.counter
    // },
    // more16stu(state){
    //     return state.students.filter(it=>{
    //         return it.age>16
    //     })
    // },
    // more16stuLength(state,getters){
    //     return getters.more16stu.length
    // },
    // age是传回来的
    // moreAgestu(state){
    //     return age=>{
    //         return state.students.filter(it=>{
    //             return it.age>age
    //         })
    //     }
    // }
}