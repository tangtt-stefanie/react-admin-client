/*
 * @Author: MR.T
 * @Date: 2020-12-01 09:04:40
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-10 09:21:23
 * @Description: Product的详情
 * @FilePath: \react-admin-client\src\pages\categorys\product\detail.jsx
 */
import React, {Component} from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategoryInfo } from '../../../api'

const Item = List.Item

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName1: '',
      cName2: ''
    };
  }

  async componentDidMount(){
    // categoryId-分类ID,pCategoryId-父分类ID,_id-产品ID
    const { pCategoryId, categoryId } = this.props.location.state
    if(pCategoryId === '0'){//一级分类下的商品
      const result = await reqCategoryInfo(categoryId)
      this.setState({cName1:result.data.name})
    }else{
      const results = await Promise.all([reqCategoryInfo(pCategoryId),reqCategoryInfo(categoryId)])
      this.setState({cName1:results[0].data.name,cName2:results[1].data.name})
    }
  }

  render() {
    const { cName1, cName2 } = this.state
    const { name, desc, price, detail, imgs} = this.props.location.state
    const title = (
      <span>
        <ArrowLeftOutlined onClick={()=>this.props.history.goBack()} 
        style={{color:'green',marginRight:'15px',fontSize:'20px'}}/>
        <span style={{fontSize:'18px'}}>商品详情</span>
      </span>
    )
    
    return (
      <Card title={title} className='product-detail'>
        <List
        size="large"
        bordered
        >
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>￥{price}</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1}{cName2 ? '-->'+cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map((img)=>{
                  return (<img key={img} className='product-img' src={img.url} alt="img" />)
                })
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;