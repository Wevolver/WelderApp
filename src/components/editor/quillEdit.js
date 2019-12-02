import React, {Component} from 'react'
import { ImageUpload } from './quillImageUpload';
import ReactQuill, { Quill } from 'react-quill';
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import { Prompt } from 'react-router'

import 'react-quill/dist/quill.snow.css';
import './custom.css'

import cheerio from 'cheerio'
import axios from 'axios'
import { API } from '../../constants/api';

let sliderItems = []
let fHash = null
let imageUpload = {
		method: 'POST',
}

axios.get(`${API.apiUrlV2}/project/image?objectName=s.jpeg&contentType=image%2Fjpeg`)
.then(res => {
  const data = res.data
  fHash = data.fHash
  imageUpload.url = "https://s3-us-west-1.amazonaws.com/wevolver-project-images"
  imageUpload.headers = data.fHash
  QuillEdit.modules['imageUpload'] = imageUpload
  QuillEdit.fieldModules['imageUpload'] = imageUpload

})

Quill.register('modules/imageUpload', ImageUpload)

class QuillEdit extends Component {

  render() {
      let actionButtonStyle = {
        display: 'flex',
        paddingBottom: 16,
        justifyContent: 'flex-end',
        marginTop: -10
      }
      return(
        <div className="editor">
          {
            !this.props.textfield &&
            <div style={actionButtonStyle}>
              <div key={'cancel'}>
                <Button
                  square
                  icon={<CrossIcon />}
                  onClick={this.props.onCancel}
                />
              </div>
              <div key={'save'}>
                <Button
                  disabled={!this.props.isDirty}
                  typeClass="action"
                  onClick={this.props.onSave}
                  label="Save"
                />
              </div>
            </div>
        }

        <div className="text-editor">
          <ReactQuill
            value={this.props.model}
            formats={QuillEdit.formats}
            modules={this.props.textfield ? QuillEdit.fieldModules : QuillEdit.modules}
            onChange={this.props.handleModelChange}>
          </ReactQuill>
        </div>
        <Prompt when={this.props.isDirty} message="Are you sure you want to leave? Your changes will not be saved."/>
      </div>
    )
  }
}

QuillEdit.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'color',
]

QuillEdit.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'header': [1, 2, false] }],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video']
  ],
}

QuillEdit.fieldModules= {
  toolbar: [
    ['bold', 'italic', {'list': 'ordered'}, {'list': 'bullet'}, 'link', 'image', 'video']
  ],
}




export default QuillEdit
