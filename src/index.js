/*
 * @Author: MR.T
 * @Date: 2020-11-14 20:34:53
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-27 10:19:47
 * @Description: No Description
 * @FilePath: \react-admin-client\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'antd/dist/antd.css';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

//读取local中保存的user,保存在内存中
const user = storageUtils.getUser()
memoryUtils.user = user


//刚创建时使用了严格模式,引用dom要用ref的形式,不去除StrictMode的话,antd组件中有直接引用dom元素的方式，会频繁报错
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


reportWebVitals();
