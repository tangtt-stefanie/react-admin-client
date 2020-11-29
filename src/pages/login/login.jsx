/*
 * @Author: MR.T
 * @Date: 2020-11-18 12:40:39
 * @LastEditors: MR.T
 * @LastEditTime: 2020-11-28 08:46:54
 * @Description: 登录s
 * @FilePath: \react-admin-client\src\pages\login\login.jsx
 */
import React, { Component } from "react";
import './login.less'
import logo from '../../assets/imgs/logo512.png'
import { Form, Input, Button, Checkbox, message  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api/index.js'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

const Item = Form.Item

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 20 },
};

// 登录的路由组件
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    formRef = React.createRef();
    
    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFinish = async values => {
        // console.log('onFinish:', this.formRef);
        // console.log('Success:', values);
        let res = await reqLogin({...values})
        if(res.status === 0){
            message.success('登录成功')

            //保存user
            const user = res.data
            memoryUtils.user = user
            storageUtils.saveUser(user)

            // 跳转到管理页面
            this.props.history.replace('/')//replace是直接替换路径,这样就无法回退,push是添加一个路径,还可以回退
        }else{
            message.error(res.msg)
        }
       
        
    };

    onFinishFailed = errorInfo => {
        // console.log('onFinishFailed:', this.formRef);
        // console.log('Failed:', errorInfo);
    };

    render(){

        const user = memoryUtils.user
        //如果内存中没有存储user,则表示未登录
        if(user&&user._id){
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理项目</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <div>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            ref={this.formRef}
                        >
                            <Item
                                label="用户名"
                                name="username"
                                rules={[
                                    { required: true, message: '请输入用户名!' },
                                ]}
                            >
                                <Input 
                                    prefix={<UserOutlined />}
                                />
                            </Item>

                            <Item
                                label="密码"
                                name="password"
                                rules={[
                                    {
                                        validator(rule, value) {
                                            if(!value){
                                                return Promise.reject('请输入密码!')
                                            }else if(value.length<4){
                                                return Promise.reject('密码长度不能小于4位!')
                                            }else if(value.length>12){
                                                return Promise.reject('密码长度不能大于12位!')
                                            }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                                                return Promise.reject('密码必须由英文或者数字组成!')
                                            }else{
                                                return Promise.resolve()
                                            }
                                        },
                                    }
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />}/>
                            </Item>

                            <Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox>记住密码</Checkbox>
                            </Item>

                            <Item {...tailLayout}>
                                <Button className="login-submit-btn" type="primary" htmlType="submit">
                                    登录
                                </Button>

                                <Button className="login-reset-btn" htmlType="button" onClick={this.onReset}>
                                    重置
                                </Button>
                            </Item>
                        </Form>
                    </div>
                </section>
            </div>);
    }
}

export default Login;
