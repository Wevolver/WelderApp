import React, { Component } from 'react';
import { API } from '../../../constants/api'

var ReactS3Uploader = require('react-s3-uploader');


class ReactS3UploaderInput extends Component {

  state = {
    progress: 0,
    blobUrl: null,
    loading: false,
  }

  onPreprocess = (file, next) => {
    var img = new Image();
    img.src = URL.createObjectURL(file);
    const self = this
    self.setState({
      blobUrl: img.src,
      loading: true,
      progress: 0,
    })
    img.onload = function(){
        if(this.width < 800 || this.height < 500) {
          self.setState({ loading: false, blobUrl: null })
          return alert(`Your image is ${this.width}px by ${this.height}px, it must be at least 800px by 500px`);
        }
        return next(file)
    }
  }

  onUploadProgress = (progress) => {
    this.setState({progress: progress || 10})
  }

  render() {
    const {
      input,
      width,
      height,
      noSizeText
    } = this.props
    return (
      <div style={{height: height || 120, width: width || 192, overflow: 'hidden', marginBottom: 12}}>
      {(!this.state.loading && !!input.value.source) && <div
        onClick={() => this.fileInput.click()}
        className="picture-preview"
        style={{
          backgroundImage: `url(${this.state.blobUrl ? this.state.blobUrl : input.value.source})`,
          width: width || 192,
          height: height || 120,
        }}
      />}

      {(!input.value.source || this.state.loading) &&
        <a>
          <div
            style={{
              width: width || 192,
              height: height || 120,
              border: '1px dashed #757575',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 700,
            }}
            onClick={() => this.fileInput.click()}
          >
            <div style={{minWidth: '80%'}}>
              {!this.state.loading && <div>Upload Image</div>}
              <div style={{fontSize: 13, fontWeight: 400 }}>
                {this.state.loading ? `${this.state.progress}%` : noSizeText ? '': 'At least 800x500 pixels'}
              </div>
              {this.state.loading && <div
                style={{
                  height: 8,
                  width: `${this.state.progress}%`,
                  backgroundColor: '#0277bc',
                  transition: 'width 0.2s',
                }}
              />}
            </div>
          </div>
        </a>
      }
      <ReactS3Uploader
        signingUrl="/project/image"
        signingUrlMethod="GET"
        accept="image/*"
        preprocess={this.onPreprocess}
        onProgress={this.onUploadProgress}
        contentDisposition="auto"
        autoUpload={true}
        server={API.apiUrlV2}
        scrubFilename={filename => Math.random().toString(36) + filename}
        onFinish={url => {
            this.setState({loading: false})
            let parsedUrl = new URL(url.signedUrl)
            input.onChange({"source": parsedUrl.protocol + "//" + parsedUrl.hostname + parsedUrl.pathname, "path": ""})
          }
        }
        className='picture-input'
        style={{
          height: 0
        }}
        inputRef={input => this.fileInput = input}
      />
      </div>
    );
  }
}

export default ReactS3UploaderInput
