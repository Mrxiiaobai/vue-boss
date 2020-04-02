import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'

const state = {
	// 用户登录等级,0为未注册,1为存在用户,未设置密码,2为存在,且设置密码
	loginCode: 0,
	role:{
		// 保存当前用户登录Id
		currentId:'',
		// 保存当前用户登录类型
		userType:''
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
	modules: {
		a: moduleA
	}
})

// 导出store
export default store
