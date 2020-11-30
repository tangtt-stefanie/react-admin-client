/*
 * @Author: MR.T
 * @Date: 2020-11-26 10:51:52
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-30 09:52:43
 * @Description: 包含应用中所有请求函数的模块
 * @FilePath: \react-admin-client\src\api\index.js
 */

 import ajax from './ajax'

 /**
  * @description: no description
  * @param {*} Params
  * @return {*} Promise
  */

//登录
 export const reqLogin = (loginParams) => ajax('/login', loginParams, 'POST')
 
//添加用户
 export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//获取商品分类
 export const reqGetCategorys = (parentId) => ajax('/manage/category/list', {parentId})

//添加商品分类
 export const reqAddCategory = ({categoryName,parentId}) => ajax('/manage/category/add', {categoryName,parentId}, 'POST')

 //更新商品分类
 export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/manage/category/update', {categoryId,categoryName}, 'POST')
