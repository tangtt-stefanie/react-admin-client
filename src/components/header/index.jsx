/*
 * @Author: MR.T
 * @Date: 2020-11-27 10:29:39
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-30 09:08:44
 * @Description:左侧导航栏
 * @FilePath: \react-admin-client\src\components\header\index.jsx
 */

import React, { Component } from 'react';
import './index.less'
// import weather from '../../assets/imgs/logo512.png'
import { getDate, formatDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import { withRouter } from 'react-router-dom'
import menuList from '../../admin_config/menuConfig'
import { Modal } from 'antd';
import LinkButton from '../../components/link-button'

 class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentDate:''
        }
    }

    //获取菜单头
    getTitle(){
        const path = this.props.location.pathname
        let title
        menuList.forEach(menu => {
            if(menu.path === path){
                title = menu.title
            }else if(menu.children){
                const cMenu = menu.children.find(cMenu=> cMenu.path === path)
                if(cMenu){
                    title = cMenu.title
                } 
            }
        })
        return title
    }

    //退出
    logout(){
        Modal.confirm({
            content:'确定退出吗',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
        })
    }

    //定时器:获取时间
    componentDidMount(){
        // this.inIntervalOrder = setInterval(()=>{
        //     console.log('formatDate(getDate()):',formatDate(getDate()))
        //     this.setState({
        //         currentDate:formatDate(getDate())
        //     })
        // },1000)
    }

    //组件卸载前清除定时器
    componentWillUnmount(){
        // clearInterval(this.inIntervalOrder)
    }

    render(){
        const username = memoryUtils.user.username;
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logout.bind(this)}><span>退出</span></LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentDate}</span>
                        {/* <span>
                            <img src={weather} alt="weather"/>
                        </span> */}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Header)