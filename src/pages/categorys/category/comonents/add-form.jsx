import React, {Component} from "react";
import { Form, Select, Input, message, Modal } from 'antd';
import { reqAddCategory } from '../../../../api/index'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formRef = React.createRef();
  
  addCategory = async ()=>{
    const { getCategorys, parentId, handleCancel } = this.props
    const form = this.formRef.current
    try {
        const values = await form.validateFields()
        let res = await reqAddCategory(values)
        if(res.status === 0){
            message.success('添加成功')
            handleCancel()
            //更新category
            getCategorys(parentId)
        }else{
            message.error(res.msg)
        }
    } catch (error) {
        console.log(error)
    }
    
  }

  render() {
    const { categorys, parentId, category, visible, handleCancel } = this.props
    return (
        <Modal
          title="添加分类"
          visible={visible}
          onOk={this.addCategory}
          onCancel={handleCancel}
        >
            <Form
                ref={this.formRef}
                initialValues={{ parentId: parentId === '0' ? '0': category._id}}
            >
                <Item
                    label="分类类别"
                    name="parentId"
                    rules={[
                        { required: true, message: '请选择分类类别!' },
                    ]}
                >
                    <Select>
                        {parentId === '0' ? <Option value='0' key='0'>一级分类</Option> : null}
                        {parentId === '0' ? categorys.map((category)=>{
                            return <Option value={category._id} key={category._id}>{category.name}</Option>
                        }) : <Option value={category._id} key={category._id}>{category.name}</Option>}
                    </Select>
                </Item>
                <Item
                    label="分类名称"
                    name="categoryName"
                    rules={[
                        { required: true, message: '请输入分类名称!' },
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