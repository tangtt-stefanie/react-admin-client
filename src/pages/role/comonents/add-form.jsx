import React, {Component} from "react";
import { Form, Input, message, Modal } from 'antd';
import { reqAddRole } from '../../../api/index'

const Item = Form.Item

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formRef = React.createRef();
  
  addRole = async ()=>{
    const { getRoles, handleCancel } = this.props
    const form = this.formRef.current
    try {
        const values = await form.validateFields()
        let result = await reqAddRole(values)
        if(result.status === 0){
            message.success('添加成功')
            handleCancel()
            //更新Role
            getRoles(result.data)
        }else{
            message.error(result.msg)
        }
    } catch (error) {
        console.log(error)
    }
    
  }

  render() {
    const { visible, handleCancel } = this.props
    return (
        <Modal
          title="设置角色权限"
          visible={visible}
          onOk={this.setAuth}
          onCancel={handleCancel}
        >
            <Form
                ref={this.formRef}
            >
                <Item
                    label="角色名称"
                    name="roleName"
                    rules={[
                        { required: true, message: '请输入角色名称!' },
                    ]}
                >
                    <Input placeholder='请输入角色名称'/>
                </Item>
            </Form> 
        </Modal>
    );
  }
}

export default AddForm;