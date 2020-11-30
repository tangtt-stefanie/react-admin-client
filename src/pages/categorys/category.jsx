
/*
 * @Author: MR.T
 * @Date: 2020-11-28 08:39:57
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-30 23:59:25
 * @Description: 商品分类
 * @FilePath: \react-admin-client\src\pages\categorys\category.jsx
 */
import React, {Component} from "react";
import { Card, Table, Button, message, Breadcrumb, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqGetCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddForm from './comonents/add-form'
import UpdateForm from './comonents/update-form'


  
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      showStatus: '0',//Modal框是否显示:0-都不显示,1-显示添加,2-显示修改
      category: {},
      updateCategoryId: ''
    };
  }

  parentId = '0'

  loading = true

  columns = [
    {
      title: '分类名称',
      key: 'name',
      dataIndex: 'name',
      width:800
    },
    {
      title: '操作',
      key: 'operation',
      render:(category)=>(
        <span>
          <LinkButton onClick={()=>{this.showUpdateModal(category)}}>修改分类</LinkButton>
          {category.parentId === '0' ? <LinkButton onClick={()=>{this.getChildCategorys(category)}}>查看子分类</LinkButton> : null}
        </span>
      )
    }
  ];

  //修改分类框显示
  showUpdateModal=(category)=>{
    this.setState({updateCategoryId:category._id})
    this.setState({showStatus:2})
  }

  //添加分类框显示
  showAddModal=()=>{
    this.setState({showStatus:1})
  }

  //隐藏Modal框
  handleCancel=(e)=>{
    this.setState({
      showStatus: 0
    });
  }

  getChildCategorys(category){
    this.setState({category})
    this.getCategorys(category._id)
  }

  async getCategorys(parentId){
    this.loading = true
    this.parentId = parentId

    const result = await reqGetCategorys(parentId)
    this.loading = false
    if(result.status === 0){
      this.setState({categorys:result.data})
    }else{
      message.error('获取分类列表失败')
    }
    
  }

  componentDidMount(){
    this.getCategorys('0')
  }

  render() {
    const { categorys, showStatus, category, updateCategoryId } = this.state
    const title = (
      <Breadcrumb>
        <Breadcrumb.Item onClick={()=>{this.getCategorys('0')}}>
          <span>一级分类</span>	
        </Breadcrumb.Item>
        {this.parentId === '0' ? null : 
        <Breadcrumb.Item>
          <span>{category.name}</span>
        </Breadcrumb.Item>
        }
    </Breadcrumb>
    )

    const extra = (
      <Button type="primary" icon={<PlusOutlined/>} onClick={this.showAddModal}>
          添加
      </Button>
    )
    
    return (
      <Card title={title} extra={extra}>
        <Table dataSource={categorys} columns={this.columns} rowKey={record => record._id} bordered
          pagination={{pageSize:6,showQuickJumper:true,onChange:this.paginationOnchange}} loading={this.loading}
        />;
        <AddForm visible={showStatus === 1} category={category} categorys={categorys} 
          parentId={this.parentId} getCategorys={this.getCategorys.bind(this)} 
          handleCancel={this.handleCancel}
        ></AddForm>
        <UpdateForm visible={showStatus === 2} updateCategoryId={updateCategoryId}
          parentId={this.parentId} getCategorys={this.getCategorys.bind(this)}
          handleCancel={this.handleCancel}
        ></UpdateForm>
      </Card>
    );
  }
}

export default Category;