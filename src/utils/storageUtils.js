/*
 * @Author: MR.T
 * @Date: 2020-11-27 09:35:03
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-27 10:05:59
 * @Description: 进行local数据存储管理的工具模块
 * @FilePath: \react-admin-client\src\utils\storageUtils.js
 */
import store from 'store'

const USER_KEY = 'user_key'

export default {
    saveUser(user){//存储user
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}
