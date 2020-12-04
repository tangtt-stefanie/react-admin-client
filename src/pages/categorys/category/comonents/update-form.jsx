import React, {Component} from "react";
import { Form, Input, Modal, message } from 'antd';
import { reqUpdateCategory } from '../../../../api/index'

const Item = Form.Item

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formRef = React.createRef();

  updateCategory= async ()=>{
    const { getCategorys, parentId, updateCategoryId, handleCancel } = this.props
    const form = this.formRef.current
    try {
      const values = await form.validateFields()
      let res = await reqUpdateCategory({...values,categoryId:updateCategoryId})
      if(res.status === 0){
          message.success('修改成功')
          handleCancel()
          //更新category
          getCategorys(parentId)
      }else{
          message.error(res.msg)
      }
    } catch (error) {
      console.log('error:',error)
    }
  }

  render() {
    const { visible, handleCancel } = this.props
    return (
        <Modal
          title="修改分类"
          visible={visible}
          onOk={this.updateCategory}
          onCancel={handleCancel}
        >
            <Form
                ref={this.formRef}
            >
                <Item
                    label="分类名称"
                    name="categoryName"
                    rules={[
                        { required: true, message: '请输入分类名称!' },
                        { min: 2, message: '分类名称至少为两个字符!' },
                    ]}
                >
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form> 
        </Modal>
           
    );
  }
}

export default AddForm;