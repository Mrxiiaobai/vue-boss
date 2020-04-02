import axios from 'axios'

// 第一版
// export default function $axios(config,success,failure){
//     // 创建axios实例
//     // const instance = axios.create({
//     //     baseURL:'http://www.baidu.com',
//     //     timeout:5000
//     // })

//     // instance(config).then(res=>{
//     //     console.log(res)
//     //     success(res)
//     // }).catch(err=>{
//     //     console.log(err)
//     //     failure(res)
//     // })
// }

// 第二版
// export default function $axios(config){
//     // 创建axios实例
//     const instance = axios.create({
//         baseURL:'http://www.baidu.com',
//         timeout:5000
//     })

//     instance(config.baseConfig).then(res=>{
//         console.log(res)
//         config.success(res)
//     }).catch(err=>{
//         console.log(err)
//         config.failure(res)
//     })
// }

// 并不是最终版
// export default function $axios(config){
//     return new Promise((resolve,reject)=>{
//         const instance = axios.create({
//             baseURL:'http://www.baidu.com',
//             timeout:5000
//         })
//         instance(config).then(res=>{
//             resolve(res)
//         }).catch(err=>{
//            reject(err)
//         })
//     })
// }

// 最终版
export function $axios(config,baseUrl){
    const instance = axios.create({
        baseURL:baseUrl,
        timeout:5000
    })
    // 拦截请求
    instance.interceptors.request.use(res=>{
        // 如果拦截掉，不返回，请求不会成功
        console.log(res)
        // 拦截是为了加入请求头等信息
        // 发送网络请求，展示一个加载图标，请求完成取消显示
        // 登录必须携带特殊信息
        return res
    },err=>{
        console.log(err)
    })
    // 拦截响应
    instance.interceptors.response.use(res=>{
        console.log(res)
        // 必须返回
        return res.data
    },err=>{
        console.log(err)
        return err
    })
    // 本身返回值就是promise对象
   return instance(config)
}

// 带有拦截器的axios
// axios.interceptors