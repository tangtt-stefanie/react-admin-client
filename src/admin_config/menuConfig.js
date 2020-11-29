/*
 * @Author: MR.T
 * @Date: 2020-11-28 15:08:26
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-29 20:28:06
 * @Description: menuList
 * @FilePath: \react-admin-client\src\admin_config\menuConfig.js
 */
import React from 'react';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined
  } from '@ant-design/icons';

 const menuLIst = [
    {
        title:'首页',
        key:'/home',
        path:'/home',
        icon:<AppstoreOutlined/>  
    },{
        title:'商品',
        key:'categorys',
        path:'',
        icon:<MenuUnfoldOutlined/>,
        children:[
            {
                title:'品类管理',
                key:'/categorys/category',
                path:'/categorys/category',
                icon:<MenuFoldOutlined/>  
            },{
                title:'商品管理',
                key:'/categorys/product',
                path:'/categorys/product',
                icon:<PieChartOutlined/>  
            },
        ]
    },{
        title:'用户管理',
        key:'/user',
        path:'/user',
        icon:<DesktopOutlined/>  
    },{
        title:'角色管理',
        key:'/role',
        path:'/role',
        icon:<ContainerOutlined/>  
    },{
        title:'图形图表',
        key:'charts',
        path:'',
        icon:<MenuUnfoldOutlined/>,
        children:[
            {
                title:'柱状图',
                key:'/charts/bar',
                path:'/charts/bar',
                icon:<MenuFoldOutlined/>  
            },{
                title:'折线图',
                key:'/charts/line',
                path:'/charts/line',
                icon:<PieChartOutlined/>  
            },{
                title:'饼状图',
                key:'/charts/pie',
                path:'/charts/pie',
                icon:<PieChartOutlined/>  
            }
        ]
    }
 ]

 export default menuLIst