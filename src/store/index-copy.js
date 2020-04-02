// import Vue from 'vue'
// import Vuex from 'vuex'

// // 1.安装插件
// Vue.use(Vuex)
// import mutations from './mutations'
// import {INCREMENT} from './mutations-types'
// import { reject } from 'q'
// // 创建对象
// const moduleA = {
//     state:{
//         name:'zhangsan'
//     },
//     mutations:{

//     },
//     actions:{

//     },
//     getters:{

//     }

// }

// const store = new Vuex.Store({
//     //
    
//     state:{
//         counter:1000,
//         students:[
//             {id:110,name:'sdad',age:18},
//             {id:111,name:'dfs',age:19},
//             {id:112,name:'fdg',age:15},
//             {id:113,name:'hgh',age:20},
//         ],
//         info:{
//             name:'kobe',
//             age:40,
//             height:198
//         }
//     },
//     mutations:{
//         [INCREMENT](state){
//             state.counter++
//         },
//         decrement(state){
//             state.counter--
//         },
//         incrementCount(state,count){
//             // state.counter += count
//             // 特殊提交
//             // 传回来的count为一个对象
//             state.counter += count.count
//         },
//         incrementStu(state,stu){
//             state.students.push(stu)
//             // 新加一个属性
//             // Vue.set(state.students,'address','losange')
//             // Vue.delete(state.students,'address')
//         },
//         updateInfo(state){
//             state.info.name = 'codewhy'
//         }
//     },
//     actions:{
//         // context上下文
//         aupdateInfo(context,payload){
//             return new Promise((resolve,reject)=>{
//                 setTimeout(()=>{
//                     context.commit('updateInfo')
//                     console.log(payload)
//                 },1000)
//                 resolve('1111')
//             })
            
//         }          
//     },
//     getters:{
//         powerCounter(state){
//             return state.counter * state.counter
//         },
//         more16stu(state){
//             return state.students.filter(it=>{
//                 return it.age>16
//             })
//         },
//         more16stuLength(state,getters){
//             return getters.more16stu.length
//         },
//         // age是传回来的
//         moreAgestu(state){
//             // return function(age){
//             //     return state.students.filter(it=>{
//             //         return it.age>age
//             //     })
//             // }
//             return age=>{
//                 return state.students.filter(it=>{
//                     return it.age>age
//                 })
//             }
//         }
//     },
//     modules:{
//         a:moduleA
//     }
// })

// // 导出store
// export default store