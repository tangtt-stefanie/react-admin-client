/*
 * @Author: MR.T
 * @Date: 2020-11-26 10:51:52
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-26 18:45:55
 * @Description: 包含应用中所有请求函数的模块
 * @FilePath: \react-admin-client\src\api\index.js
 */

 import ajax from './ajax'

 /**
  * @description: no description
  * @param {*} Params
  * @return {*} Promise
  */
 export const reqLogin = (loginParams) => ajax('/login', loginParams, 'POST')
 
 export const reqAddUser = (user) => ajax('manage/user/add', user, 'POST')
