import {$axios} from './requests'

let baseUrl = 'http://localhost:3000'

// 只发送验证码
export function getUsers(type,params){
    return $axios({
		method:type,
        url:'/login',
		data:params
    },baseUrl)
}

// 保存用户
export function saveUsers(type,params){
    return $axios({
		method:type,
        url:'/index',
		data:params
    },baseUrl)
}

// 更新用户的角色类型
export function updateType(type,params){
    return $axios({
		method:type,
        url:'/save',
		data:params
    },baseUrl)
}