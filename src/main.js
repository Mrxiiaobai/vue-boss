// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import router from './router'
import store from './store'
import {Icon,Toast,Button  } from 'vant';
import VueScroller from 'vue-scroller'


import {
	setCookie,
	getCookie,
	delCookie
} from './assets/js/cookie.js';

import io from 'socket.io-client';
import VueSocketIo from 'vue-socket.io';

Vue.use(new VueSocketIo({
   debug: true,
   connection: io('http://localhost:3000/') //xxx填后台给的socket地址，端口号根据实际后台端口写
}))

Vue.use(Icon);
Vue.use(Toast);
Vue.use(Button);
Vue.use(VueScroller)

Vue.prototype.$cookieStore = {
	setCookie,
	getCookie,
	delCookie
}

Vue.prototype.goBack = () =>{
	console.log('11')
	router.back(-1)
}
Vue.config.productionTip = false



const requireComponent = require.context(
	'./components/subcomponents/',
	false,
	/.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)

	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 剥去文件名开头的 `'./` 和结尾的扩展名
			fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
		)
	)
	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
