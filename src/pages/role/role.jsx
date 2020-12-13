/*
 * @Author: MR.T
 * @Date: 2020-11-28 08:44:18
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-11 13:38:01
 * @Description: 角色
 * @FilePath: \react-admin-client\src\pages\role\role.jsx
 */
import React, {Component} from "react";
import { Card, Button, Table, message } from 'antd'
import { reqGetRoles } from '../../api'
import AddForm from './comonents/add-form'
import AuthForm from './comonents/auth-form'
import { formatDate } from '../../utils/dateUtils'

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles:[],
      selectedRole:{},
      loading:false,
      isAdd:false,
      isAuth:false
    };
  }

  columns = [
    {
      title: '角色名称',
      key: 'name',
      dataIndex: 'name',
    },{
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      render(create_time){
        return create_time ? formatDate(create_time) : null
      }
    },{
      title: '授权时间',
      key: 'auth_time',
      dataIndex: 'auth_time',
      render(auth_time){
        return auth_time ? formatDate(auth_time) : null
      }
    },{
      title: '授权人',
      key: 'auth_name',
      dataIndex: 'auth_name'
    }
  ];

  onRow = selectedRole => {
    return {
      onClick: event => {
        this.setState({selectedRole})
      }
    };
  }

  //获取角色列表
  getRoles = async (role)=>{
    if(role){
      this.setState((state)=>({roles:[...state.roles,role]}))
    }else{
      const result = await reqGetRoles()
      if(result.status === 0){
        this.setState({roles:result.data})
      }else{
        message.error('获取角色列表失败')
      }
    }
    
  }

  addRole = ()=>{
    this.setState({isAdd:true})
  }

  setAuth = ()=>{
    this.setState({isAuth:true})
  }

  handleCancelAdd = ()=>{
    this.setState({isAdd:false})
  }

  handleCancelAuth = ()=>{
    this.setState({isAuth:false})
  }

  componentDidMount(){
    this.getRoles()
  }

  render() {
    const { roles, selectedRole, loading, isAdd, isAuth } = this.state
    const title = (
      <span>
        <Button type='primary' style={{marginRight:'10px'}} onClick={this.addRole}>创建角色</Button>
        <Button type='primary' disabled={!selectedRole._id} onClick={this.setAuth}>设置角色权限</Button>
      </span>
    )
    return (
      <Card
      title={title}
      >
        <Table dataSource={roles} columns={this.columns} rowKey='_id' bordered
          rowSelection={{type:'radio',selectedRowKeys:[selectedRole._id]}} onRow={this.onRow}
          pagination={{pageSize:6,showQuickJumper:true}} loading={loading}
        />;
        <AddForm getRoles={this.getRoles} visible={isAdd} handleCancel={this.handleCancelAdd}></AddForm>
        <AuthForm getRoles={this.getRoles} visible={isAuth} handleCancel={this.handleCancelAuth} role={selectedRole} key={selectedRole._id}></AuthForm>
      </Card>
    );
  }
}

export default Role;