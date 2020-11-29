/*
 * @Author: MR.T
 * @Date: 2020-11-29 16:26:43
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-29 16:42:33
 * @Description: No Description
 * @FilePath: \react-admin-client\src\utils\dateUtils.js
 */

 import moment from 'moment'

 export function getDate(){return moment()}

 export function formatDate(date){
     return moment(date).format('YYYY-MM-DD HH:mm:ss')
 }
