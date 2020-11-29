/*
 * @Author: MR.T
 * @Date: 2020-11-14 20:34:53
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-27 09:17:58
 * @Description: No Description
 * @FilePath: \react-admin-client\src\App.js
 */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';



// 根组件
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <BrowserRouter>
      {/* Switch：只精确匹配其中一个 */}
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter> 
    );
  }
}

export default App;
