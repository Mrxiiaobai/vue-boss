import {INCREMENT,SETUSERINFO,SETUSERID,SETUSERTYPE,SETLOGINCODE} from './mutations-types'
// import * from  './index'

export default {
    [INCREMENT](state){
        state.counter++
    },
	setUserInfo(state,code){
		state.loginCode = code
	},
	setUserId(state,data){
		state.role.currentId = data.currentId
		state.role.userType = data.type
	}
}
