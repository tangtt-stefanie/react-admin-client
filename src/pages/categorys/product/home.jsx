/*
 * @Author: MR.T
 * @Date: 2020-12-01 09:04:17
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-04 16:15:47
 * @Description: Product默认子路由
 * @FilePath: \react-admin-client\src\pages\categorys\product\home.jsx
 */
import React, {Component} from "react";
import { Card, Button, Select, Input, Table, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../../components/link-button'
import { reqGetProducts, reqUpdateStatus } from "../../../api";

const Option = Select.Option

class ProducHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
      pageSize: 2,
      loading: false,
      searchContent:'',
      searchType:'productName'
    };
  }

  pageNum = 1

  columns = [
    {
      title: '商品名称',
      key: 'name',
      dataIndex: 'name',
      width:200
    },{
      title: '商品描述',
      key: 'desc',
      dataIndex: 'desc'
    },{
      title: '价格',
      key: 'price',
      dataIndex: 'price',
      width:100,
      render:price=> '￥' + price//指定了dataIndex时,传入的参数就是该值
    },{
      title: '状态',
      key: 'status',
      width:100,
      render:product => {
        const { _id, status } = product
        const newStatus = status === 1 ? 0 : 1
        return (
        <div style={{textAlign:'center'}}>
          <Button type='primary' 
          onClick={() => this.updateStatus({productId:_id,status:newStatus})}
          >
            {product.status === 1 ? '下架' : '出售'}
          </Button>
          <span>{product.status === 1 ? '在售' : '已下架'}</span>
        </div>
        )
      }
    },{
      title: '操作',
      key: 'operation',
      width:200,
      render:(product)=>(
        <span>
          <LinkButton onClick={()=>{this.props.history.push('/categorys/product/detail',product)}}>详情</LinkButton>
          <LinkButton onClick={()=>{this.props.history.push('/categorys/product/addUpdate',product)}}>修改商品</LinkButton>
        </span>
      )
    }
  ];

  //产品出售/下架
  updateStatus = async ({productId,status}) => {
    this.setState({loading:true})
    const result = await reqUpdateStatus({productId,status})
    if(result.status === 0){
      message.success('更新产品销售态成功')
      this.getProducts(this.pageNum)
    }else{
      message.error('更新产品销售状态失败')
    }
  }

  // 查询产品
  getProducts = async pageNum => {
    this.pageNum = pageNum
    this.setState({loading:true})
    const { pageSize, searchType, searchContent} = this.state
    let params = {pageNum,pageSize}
    params[searchType] = searchContent
    // productName, productDesc
    const result = await reqGetProducts({...params})
    this.setState({loading:false})
    if(result.status === 0){
      const { total, list } = result.data
      this.setState({products:list,total})
    }else{
      message.error('获取分类列表失败')
    }
  }

  componentDidMount(){
    this.getProducts(1)
  }

  render() {
    const { products, pageSize, total, loading, searchType, searchContent } = this.state
    const title = (
      <span>
        <Select value={searchType} style={{width:150}} onChange={(value)=>{this.setState({searchType:value})}}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input value={searchContent} placeholder='关键字' style={{width:150,margin:'0 15px'}} onChange={(e)=>{this.setState({searchContent:e.target.value})}}></Input>
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary" icon={<PlusOutlined/>} onClick={() => this.props.history.push('/categorys/product/addUpdate')}>
          添加商品
      </Button>
    )

    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table dataSource={products} columns={this.columns} rowKey={record => record._id} bordered
          pagination={{pageSize:pageSize,showQuickJumper:true,total:total,onChange:this.getProducts}} 
          loading={loading}
        />;
      </Card>
    );
  }
}

export default ProducHome;