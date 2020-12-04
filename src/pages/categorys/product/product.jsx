/*
 * @Author: MR.T
 * @Date: 2020-11-28 08:43:34
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-02 15:54:51
 * @Description: 商品
 * @FilePath: \react-admin-client\src\pages\categorys\product\product.jsx
 */
import React, {Component} from "react";
import ProducHome from './home'
import ProducDetail from './detail'
import ProducAddUpdate from './add-update'
import { Switch, Route, Redirect } from 'react-router-dom'
import './product.less'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route path="/categorys/product/home" component={ProducHome}></Route>
        <Route path="/categorys/product/detail" component={ProducDetail}></Route>
        <Route path="/categorys/product/addUpdate" component={ProducAddUpdate}></Route>
        <Redirect to='/categorys/product/home'></Redirect>{/* 匹配不到跳转到/home */}
      </Switch>
    );
  }
}

export default Product;