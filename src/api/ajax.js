/*
 * @Author: MR.T
 * @Date: 2020-11-26 09:45:56
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-30 09:52:51
 * @Description: 发送异步请求ajax模块,封装axios
 * @FilePath: \react-admin-client\src\api\ajax.js
 */
 import axios from 'axios'
 import { message } from 'antd'
 /**
  * @description: no description
  * @param {*}
  * @return {*返回promise对象}
  */
 
 export default function ajax(url, data={}, method='GET'){
    // const BaseUrl = 'http://localhost:5000'
    const BaseUrl = ''
    url = BaseUrl + url
    return new Promise((resolve)=>{
        let promise
        if(method === 'GET'){
            promise = axios.get(url,{params:data})//url会变为url?+data中的内容
        }else{
            promise = axios.post(url,data)
        }

        promise.then(res => {
            console.log('请求返回的所有内容:',res)//查看请求返回的所有内容
            resolve(res.data)
        }).catch(err => {
            message.error('请求出错了:'+err.message)
        })
    })
 }
