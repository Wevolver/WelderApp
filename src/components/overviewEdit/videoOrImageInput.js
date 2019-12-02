import React, { Component } from 'react'
import get from 'lodash/get'
import ReactS3Uploader from 'react-s3-uploader'
import TextField from '../elements/inputs/textField'
import ToggleButtons from '../elements/toggle'
import Button from '../elements/button'
import {exctractYoutubeVideoId} from '../../modules/helpers'
import { API } from '../../constants/api'


class VideoOrImageInput extends Component {
  state = {
    type: 'images',
    youtubeSrc: '',
    uploadProgress: {}
  }

  handleYoutubeAdd = (e) => {
     e.preventDefault()
    if(this.state.youtubeSrc) {
      this.props.onAdd({
        type:'youtube',
        src: `https://www.youtube.com/embed/${exctractYoutubeVideoId(this.state.youtubeSrc)}`
      })
    }
    this.setState({youtubeSrc: ''})
  }

  onUploadProgress = (progress, message, file) => {
    const currentProgress = this.state.uploadProgress[file.name] || 0
    if(currentProgress < progress) {
      this.setState({uploadProgress:Object.assign({}, this.state.uploadProgress, {[file.name]:progress})})
    }
  }
  render() {
    return(
      <div style={{marginTop: 30, marginBottom: 20}}>
        <div style={{    margin: 'auto', marginBottom: 30, width: 400}}>
        {Object.keys(this.state.uploadProgress).map(progressKey =>
          <React.Fragment>
          {this.state.uploadProgress[progressKey] < 100 && <div style={{transformOrigin: 'top left', width: 4, height: 10, transform: `scaleX(${this.state.uploadProgress[progressKey]})`, marginBottom: 12, background: '#008bb1', transition: 'transform 0.6s ease-in-out'}}>
          </div>}
          </React.Fragment>
        )}
        </div>
      <div style={{margin: 'auto', display: 'table'}}>
      <ToggleButtons
        labels={['images', 'youtube']}
        selected={this.state.type || 'images'}
        onSelect={(label) => this.setState({type: label})}
      />
      </div>
      <div style={{margin: 'auto', maxWidth: 400}}>
      {this.state.type === 'youtube' &&
        <div>
          <TextField
            input={{
              value: this.state.youtubeSrc,
              onChange:(event) => this.setState({youtubeSrc: event.target.value})
            }}
            label="YouTube URL"
          />
          <div style={{margin: 'auto'}}>
          <Button
            // disabled={formState && formState.syncErrors}
            typeClass=""
            // loading={auth.updating}
            style={{marginLeft: 'auto'}}
            type="button"
            label="Add To Gallery"
            onClick={(e) => this.handleYoutubeAdd(e)}
          />
          </div>
        </div>
      }
      </div>
      <div style={{margin: 'auto', maxWidth: 400}}>
      {this.state.type === 'images' &&
      <div>
        <ReactS3Uploader
          signingUrl="/project/image"
          signingUrlMethod="GET"
          accept="image/*"
          // preprocess={this.onPreprocess}
          onProgress={this.onUploadProgress}
          contentDisposition="auto"
          autoUpload={true}
          server={API.apiUrlV2}
          scrubFilename={filename => Math.random().toString(36) + filename}
          onFinish={url => {
              // this.setState({loading: false})
              let parsedUrl = new URL(url.signedUrl)
              if(parsedUrl) {
                this.props.onAdd({
                  type:'img',
                  src: parsedUrl.protocol + "//" + parsedUrl.hostname + parsedUrl.pathname
                })
              }
            }
          }
          multiple
          className='picture-input'
          style={{
            height: 0
          }}
          inputRef={input => this.fileInput = input}
        />
        <div>
          <Button
            onClick={(e) => {
               e.preventDefault()
               this.fileInput.click()
            }}
            label="Choose Images"
            type="button"
            style={{margin: 'auto', marginBottom: 30}}
          />
        </div>
      </div>}
      </div>
      </div>
    )
  }
}

export default VideoOrImageInput
