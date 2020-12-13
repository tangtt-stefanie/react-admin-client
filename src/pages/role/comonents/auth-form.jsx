import React, {Component} from "react";
import { Form, Input, message, Modal, Tree } from 'antd';
import { reqUpdateRole } from '../../../api'
import menuList from '../../../admin_config/menuConfig'
import memoryUtils from '../../../utils/memoryUtils'

const Item = Form.Item

class AuthForm extends Component {
  constructor(props) {
    super(props);
    const { role, key } = this.props
    this.state = {
      checkedKeys: role.menus,
      propKey:key
    };
  }

  setAuth = async ()=>{
    const { getRoles, handleCancel, role } = this.props
    const { checkedKeys } = this.state
  
    const username = memoryUtils.user.username;
    role.menus = checkedKeys
    role.auth_name = username
    let result = await reqUpdateRole(role)
    if(result.status === 0){
        message.success('角色权限设置成功')
        handleCancel()
        //更新Roles
        getRoles()
    }else{
        message.error(result.msg)
    }
   
  }

  onCheck=(checkedKeys)=>{
    this.setState({checkedKeys})
  }

  static getDerivedStateFromProps(nextProps,preState){
    if(nextProps.key !== preState.key){
      return {checkedKeys:nextProps.role.menus}
    }
    return null
  }

  render() {
    const { visible, handleCancel, role } = this.props
    const { checkedKeys } = this.state
    return (
        <Modal
          title="设置角色权限"
          visible={visible}
          onOk={this.setAuth}
          onCancel={handleCancel}
        >
            <Form
                initialValues={{roleName:role.name}}
            >
              <Item
                  label="角色名称"
                  name="roleName"
              >
                  <Input disabled></Input>
              </Item>
              <Item
                  label="角色权限"
                  name="roleAuth"
              >
                  <Tree
                      checkable
                      defaultExpandAll
                      treeData={menuList}
                      checkedKeys={checkedKeys}
                      onCheck={this.onCheck}
                  />
              </Item>
            </Form> 
        </Modal>
    );
  }
}

export default AuthForm;