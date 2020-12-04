/*
 * @Author: MR.T
 * @Date: 2020-12-01 09:04:59
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-04 19:49:22
 * @Description: Product添加和更新的子路由
 * @FilePath: \react-admin-client\src\pages\categorys\product\add-update.jsx
 */
import React, {Component} from "react";
import { Button, Card, Form, Input, Cascader } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqGetCategorys } from '../../../api'

const Item = Form.Item
const TextArea = Input.TextArea;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};

class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options:[]//商品分类一级列表
    };
  }

  //form表单ref
  formRef = React.createRef();



  //提交表单
  submit = async () =>{
    //进行表单验证，通过了发送请求
    const form = this.formRef.current
    try {
      const values = await form.validateFields()
      console.log('values:',values)
    } catch (error) {
      console.log('error:',error)
    }
    
  }

  //重置表单
  onReset = () => {
    this.formRef.current.resetFields();
  };

  //商品分类列表被选中触发
  onChange = (value, selectedOptions) => {
    console.log('onChange----------',value, selectedOptions);
  };

  

  //获取子分类
  getCategorys = async (parentId)=>{
    const result = await reqGetCategorys(parentId)
    if(result.status === 0){
      if(parentId === '0'){
        // 如果是一类分解,则初始化商品分类的分级列表
        this.initOptions(result.data)
      }else{
        // 如果不是一类分解,则返回分类列表
        return result.data
      }
    }
  }

  //初始化商品分类一级列表
  initOptions = async(categorys)=>{
    const options = categorys.map((category)=>{
      return {
        value: category._id,
        label: category.name,
        isLeaf: false,
      }
    })

    //如果是修改商品,且该商品是二级分类的商品，则提前把二级分类渲染出来
    let product = this.props.location.state
    if(product && product.pCategoryId !== '0'){
      const targetOption = options.find((option)=>{
        return option.value === product.pCategoryId
      })
      const categorys = await this.getCategorys(targetOption.value)
      targetOption.children = categorys.map((category)=>{
        return {
          label: category.name,
          value: category._id,
          isLeaf:true
        }
      })
    }

    this.setState({options})
  }
  
  //加载二级商品分类列表
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    const categorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false;
    if(categorys && categorys.length !== 0){
      targetOption.children = categorys.map((category)=>{
        return {
          label: category.name,
          value: category._id,
          isLeaf:true
        }
      })
    }else{
      targetOption.isLeaf = true
    }
    
    this.setState({options:[...this.state.options]})
  };

  componentDidMount(){
    this.getCategorys('0')
  }

  render() {
    const { options } = this.state

    // 设置商品分类初始值
    let product = this.props.location.state  
    let isUpdate = !!product
    product = product ? product : {}
    let categoryIds = []
    if(isUpdate){
      const { pCategoryId, categoryId } = product
      if( pCategoryId === '0'){
        categoryIds.push(categoryId)
      }else{
        categoryIds.splice(0,0,pCategoryId,categoryId)
      }
    }

    const title = (
      <span>
        <ArrowLeftOutlined onClick={()=>this.props.history.goBack()} 
        style={{color:'green',marginRight:'15px',fontSize:'20px'}}/>
        <span style={{fontSize:'18px'}}>{isUpdate ? '修改' : '添加'}商品</span>
      </span>
    )
    debugger
 
    return (
      <Card title={title} className='product-detail'>
        <Form
          {...layout}
          name="basic"
          initialValues={{ 
            name: product.name, 
            desc: product.desc, 
            price: product.price,
            categoryIds: categoryIds
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          ref={this.formRef}
        >
          <Item
              label="商品名称"
              name="name"
              rules={[
                  { required: true, message: '请输入商品名称!' },
              ]}
          >
              <Input placeholder="请输入商品名称"/>
          </Item>
          <Item
              label="商品描述"
              name="desc"
              rules={[
                  { required: true, message: '请输入商品描述!' },
              ]}
          >
              <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item
              label="商品价格"
              name="price"
              rules={[
                { required: true, message: '请输入商品价格!' },
                { transform(value) {
                  if(value){
                    return Number(value);
                  }
                }, type: "number",min:0,message: '价格必须大于0!'}
              ]}
          >
               <Input type="number" placeholder="请输入商品价格" addonAfter="元"/>
          </Item>
          <Item
              label="商品分类"
              name="categoryIds"
              defaultValue={categoryIds}
              rules={[
                  { required: true, message: '必须指定商品分类!' },
              ]}
          >
               <Cascader options={options} loadData={this.loadData} onChange={this.onChange} changeOnSelect />
          </Item>
          <Item
              label="商品图片"
              name=""
              rules={[
                  { required: true, message: '请输入商品价格!' },
              ]}
          >
               <Input type="number" placeholder="请输入商品价格" addonAfter="元"/>
          </Item>
          <Item
              label="商品详情"
              name=""
              rules={[
                  { required: true, message: '请输入商品价格!' },
              ]}
          >
               <Input type="number" placeholder="请输入商品价格" addonAfter="元"/>
          </Item>
          <Item
              name=""
              rules={[
                  { required: true, message: '请输入商品价格!' },
              ]}
          >
               <Button type="primary" onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default ProductAddUpdate;