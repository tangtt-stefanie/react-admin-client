/*
 * @Author: MR.T
 * @Date: 2020-11-18 12:40:39
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-18 19:58:41
 * @Description: No Description
 * @FilePath: \react-admin-client\src\pages\login\login.jsx
 */
import React, { Component } from "react";
import style from './index.less'

// 登录的路由组件
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
        <div className="login">
            <header className="login-header"></header>
            <section className="login-content"></section>
        </div>);
    }
}

export default Login;
