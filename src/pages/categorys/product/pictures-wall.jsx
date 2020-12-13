/*
 * @Author: MR.T
 * @Date: 2020-12-05 09:19:00
 * @LastEditors: MR.T
 * @LastEditTime: 2020-12-10 09:48:13
 * @Description: 图片上传组件
 * @FilePath: \react-admin-client\src\pages\categorys\product\pictures-wall.jsx
 */
import React from 'react';
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../../api'
import { BASE_IMG_URL } from '../../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }

  constructor(props){
    super(props)
    let fileList = []
    const { imgs } = this.props
    if(imgs && imgs.length>0){
      fileList = imgs.map((img,index)=> ({
        uid: -index,
        name: img.name,
        status: 'done',
        url: img.url
      }))
    }
    this.state = {
      previewVisible: false,//表示是否显示大图预览
      previewImage: '',//大图url
      previewTitle: '',
      fileList//所有已上传图片的数组
    };
  }

  getFiles = () => this.state.fileList

  handleCancel = () => this.setState({ previewVisible: false });

  //图片预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {//如果未传图片地址,则通过file.originFileObj属性进行base64转码
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  //file-当前操作的文件,fileList-所有已上传图片的数组
  handleChange = async ({ file, fileList, event }) => {
    console.log('handleChange---',file,fileList.length,fileList)

    if(file.status === 'done'){//上传成功
      const result = file.response
      if(result.status === 0){
        message.success('上传图片成功!')
        const { name, url } = result.data
        file = fileList[fileList.length-1]
        file.name = name
        file.url = url
      }else{
        message.success('上传图片失败!')
      }
    }else if(file.status === 'removed'){//删除图片
      const result = await reqDeleteImg(file.name)
      if(result.status === 0){
        message.success('删除图片成功')
      }else{
        message.error('删除图片失败')
      }
    }

    this.setState({fileList})
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          accept="image/*"    /*只接收图片*/
          listType="picture-card"
          name="image"  /* 请求参数名 */
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}


export default PicturesWall;