import React, {Component} from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Proptypes from 'prop-types'

class RichTextEditor extends Component {
  static propTypes = {
    detail: Proptypes.string
  }
  
  constructor(props) {
    super(props);
    const html = this.props.detail;
    if(html){//如果detail有值
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState
        }
      }
    }else{
      this.state = {
        editorState: EditorState.createEmpty()
      }
    }
  }

  //输入过程实时调用
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  //获取html形式的富文本编辑器内容
  getDetail = ()=>{
      return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const { editorState } = this.state;
    return (
        <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorStyle={{border:'1px solid black',minHeight:200,padding:10}}
            onEditorStateChange={this.onEditorStateChange}
        />
    );
  }
}

export default RichTextEditor;