/*
 * @Author: MR.T
 * @Date: 2020-11-18 12:45:16
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-01 09:02:41
 * @Description: No Description
 * @FilePath: \react-admin-client\src\pages\admin\admin.jsx
 */

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../categorys/category/category'
import Product from '../categorys/product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const user = memoryUtils.user
        //如果内存中没有存储user,则表示未登录
        if(!user || !user._id){
            return <Redirect to='/login'></Redirect>
        }
        return (
            <Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav></LeftNav>
            </Sider>
            <Layout>
                <Header>Admin Hello {user.username}</Header>
                <Content style={{margin:'20px',backgroundColor:'#fff'}}>
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/categorys/category' component={Category}></Route>
                        <Route path='/categorys/product' component={Product}></Route>
                        <Route path='/role' component={Role}></Route>
                        <Route path='/user' component={User}></Route>
                        <Route path='/charts/bar' component={Bar}></Route>
                        <Route path='/charts/line' component={Line}></Route>
                        <Route path='/charts/pie' component={Pie}></Route>
                        <Redirect to='/home'></Redirect>{/* 匹配不到跳转到/home */}
                    </Switch>
                    
                </Content>
                <Footer style={{textAlign:'center'}}>管理系统,请尽情使用</Footer>
            </Layout>
            </Layout>
        );
    }
}

export default Admin;