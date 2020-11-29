/*
 * @Author: MR.T
 * @Date: 2020-11-27 10:29:39
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-29 12:38:16
 * @Description:左侧导航栏
 * @FilePath: \react-admin-client\src\components\left-nav\index.jsx
 */

import React, { Component } from 'react';
import './index.less'
import Logo from '../../assets/imgs/logo512.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../admin_config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuNodes:[]
        }
    }

    //获取侧边栏MenuNodes
    getMenuNodes(menuList){
        const path = this.props.location.pathname
        let defaultOpenKeys = []
        const menuNodes = menuList.map((menu)=>{
            if(!menu.children){
                return (
                    <Menu.Item key={menu.key} icon={menu.icon}>
                        <Link to={menu.path}>
                            <span>{menu.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                //查找subMenu子路由的路径与当前路径相同的子menu，则其父menu.key即是需要打开的subMenu的key
                const cMenu = menu.children.find((cMenu)=> cMenu.key === path)
                if(cMenu){
                    defaultOpenKeys.push(menu.key)
                }

                return (
                    <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                        {this.getMenuNodes(menu.children)}
                    </SubMenu>
                )
            }
        })

        return (
            <Menu
                selectedKeys={[path]}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                theme="dark"
            >
                { menuNodes }
            </Menu>
        )
        
    }


    render(){
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={Logo} alt="Logo"/>
                    <h1>后台管理</h1>
                </Link>
                { this.getMenuNodes(menuList) }
            </div>
        )
    }
}

// withRouter向组件传递三个属性:history,location,match
export default withRouter(LeftNav)