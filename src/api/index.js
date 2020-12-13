/*
 * @Author: MR.T
 * @Date: 2020-11-26 10:51:52
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-11 10:38:16
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

//获取商品
// /manage/product/list也是获取商品,不过是只有pageNum, pageSize两个参数
 export const reqGetProducts = ({pageNum, pageSize, productName, productDesc}) => ajax('/manage/product/search',{pageNum, pageSize, productName, productDesc})

// 根据分类ID获取分类详细信息
export const reqCategoryInfo = (categoryId) => ajax('/manage/category/info', {categoryId})

// 更新商品在售/下架状态
export const reqUpdateStatus = ({productId,status}) => ajax('/manage/product/updateStatus', {productId,status}, 'POST')

//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')

//添加/修改商品
export const reqUpdateOrAddProduct = (product) => ajax(`/manage/product/${product._id?'update':'add'}`, product, 'POST')

//获取角色列表
export const reqGetRoles = () => ajax('/manage/role/list')

//添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', roleName, 'POST')

//更新角色(设置角色权限)
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')
