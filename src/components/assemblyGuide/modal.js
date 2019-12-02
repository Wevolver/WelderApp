import ModalFrame from '../modals/base/modalFrame'
import { Field, reduxForm, change as changeFieldValue } from 'redux-form'
import { connect } from 'react-redux'
import React, {Component} from 'react'
import { toast } from '../../modules/toast'
import LinkIcon from '../icons/link'
import TextArea from '../elements/inputs/textArea'
import TextField from '../elements/inputs/textField'
import Button from '../elements/button'
import ReactS3UploaderInput from '../elements/reactS3Uploader'
import AssemblyGuideBulletPoints from './assemblyGuideBulletPoints'
import CrossIcon from '../icons/cross'
import ToggleButtons from '../elements/toggle'
import {exctractYoutubeVideoId} from '../../modules/helpers'

const renderDropzoneInput = (field) => {
 return null
}

class EditAssemblyGuideModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guide: props.guide,
      editingStepIndex: props.editingStepIndex,
      clickedDelete: false,
      toggle: 'images',
      initialStep: Object.assign({}, props.guide.steps[props.editingStepIndex],
        {bulletPoints: props.guide.steps[props.editingStepIndex] ? [...props.guide.steps[props.editingStepIndex].bulletPoints] : []}
      )
    }
  }

  isClean= () => {
    const step =  this.state.guide.steps[this.state.editingStepIndex]
    if(!step.stepName && step.images.length < 1 && !step.video && step.bulletPoints.length === 1 && !step.bulletPoints[0].html ) {
      return true
    }
    return false
  }

  isDirty = () => {
    const newStep =  JSON.stringify(this.state.guide.steps[this.state.editingStepIndex])
    const oldStep =  JSON.stringify(this.state.initialStep)
    if(newStep === oldStep) {
      return false
    }
    return true
  }

  handleRemoveUnsavedStep = () => {
    const {
      guide,
      editingStepIndex
    } = this.state
    const newGuide = Object.assign({},guide)
    newGuide.steps = [
      ...newGuide.steps.slice(0, editingStepIndex),
      ...newGuide.steps.slice(editingStepIndex + 1, newGuide.steps.length - 1)
    ]
    this.setState({guide: newGuide})
    this.props.addEditingGuide(newGuide, -1)
  }

  onDismiss = () => {
    if(this.isClean()) {
      this.handleRemoveUnsavedStep()
      return this.props.onDismiss()
    } else if (!this.isDirty()) {
      return this.props.onDismiss()
    } else if(window.confirm("Are you sure you want to exit the modal? Data you have entered may not be saved.")) {
      const newGuide = Object.assign({}, this.state.guide)
      newGuide.steps[this.state.editingStepIndex] = this.state.initialStep
      this.props.addEditingGuide(newGuide, -1)
      return this.props.onDismiss()
    } else {
      return console.log('Dont Dismiss')
    }
  }

  onStepChange = (newValue, key, arrayIndex=null) => {
    let newGuide = this.state.guide
    if(arrayIndex !== null) {
      newGuide.steps[this.state.editingStepIndex][key][arrayIndex] = newValue
    } else {
      newGuide.steps[this.state.editingStepIndex][key] = newValue
    }
    this.setState({newGuide})
  }

  onSubmit = () => {
    const {
      listOfFiles,
      folders
    } = this.props;
    let fileName = this.props.fileName

    let nameWithPath = folders.join('/') + (folders.length > 1 ? '/' : '') + this.props.fileName

    let counter = 0
    for (var i = 0; i < listOfFiles.length; i++) {
      if(listOfFiles[i].split("/").length === folders.length + 1){
        if(listOfFiles[i].indexOf('.assembly') > 0){
          counter += 1
        }
      }
    }

    if(counter && listOfFiles.indexOf(nameWithPath) < 0){
      fileName = this.props.fileName.slice(0, -9) + ` ${counter}` + this.props.fileName.slice(-9, this.props.fileName.length)
      while(listOfFiles.indexOf(fileName) > -1){
        counter += 1
        fileName = this.props.fileName.slice(0, -9) + ` ${counter}` + this.props.fileName.slice(-9, this.props.fileName.length)
      }
    }
    nameWithPath = folders.join('/') + (folders.length > 1 ? '/' : '') + fileName
    let assemblyGuide = new File([new Blob([JSON.stringify(this.state.guide)], {type: 'text'})], fileName)

    this.props.uploadGuide(assemblyGuide, this.props.modalPath)
  }

  deleteStep = () => {
    const {
      guide,
      editingStepIndex,
    } = this.state
    const newGuide = guide
    newGuide.steps = [
      ...newGuide.steps.slice(0, editingStepIndex),
      ...newGuide.steps.slice(editingStepIndex + 1, newGuide.steps.length),
    ]
    let assemblyGuide = new File([new Blob([JSON.stringify(newGuide)], {type: 'text'})], this.props.fileName)
    this.props.uploadGuide(assemblyGuide, "/")
  }
  onImageChange = (index, value) => {
    let newGuide = this.state.guide
    let images = newGuide.steps[this.state.editingStepIndex].images.filter(Boolean)

    if(index > images.length - 1) {
      images.push(value)
    } else {
      images[index] = value
    }
    newGuide.steps[this.state.editingStepIndex].images = images.filter(Boolean)
    this.setState({guide: newGuide})
  }

  renderImageInput = (index, width) => {
    if (!this.state.guide.steps) return null
    if (!this.state.guide.steps[this.state.editingStepIndex].images) return null

    const image = this.state.guide.steps[this.state.editingStepIndex].images[index]
    return(
      <div style={{position: 'relative'}}>
      {image && <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: 'white',
          width: 22,
          border: '1px solid #bdbdbd',
          cursor: 'pointer',
          height: 22,
        }}
        onClick={() => this.onImageChange(index, null)}
      >
        <CrossIcon />
      </div>}
      <ReactS3UploaderInput
        width={width}
        height={width * 0.625}
        noSizeText={width < 300}
        input={{
          value: image || {},
          onChange: (evt) => this.onImageChange(index, evt),
        }}
      />
      </div>
    )
  }

  handleBulletChange = (str, index) => {
    const {
      guide,
      editingStepIndex
    } = this.state
    const newGuide = guide
    const oldBullet = newGuide.steps[editingStepIndex].bulletPoints[index]
    newGuide.steps[editingStepIndex].bulletPoints[index] = Object.assign({}, oldBullet, {html: str})
    this.setState({guide: newGuide})
  }

  handleAddBullet = (index) => {
    const {
      guide,
      editingStepIndex
    } = this.state
    const newGuide = Object.assign({}, guide)
    const oldBulletPoints = newGuide.steps[editingStepIndex].bulletPoints || []
    if(oldBulletPoints.length > 7) return
    newGuide.steps[editingStepIndex].bulletPoints = [
      ...oldBulletPoints.slice(0 , index),
      {html: '', indent: 0},
      ...oldBulletPoints.slice(index , oldBulletPoints.length)
    ]
    this.setState({guide: newGuide})
  }

  handleDeleteBullet = (index) => {
    const {
      guide,
      editingStepIndex
    } = this.state
    const newGuide = Object.assign({}, guide)
    const oldBulletPoints = newGuide.steps[editingStepIndex].bulletPoints
    newGuide.steps[editingStepIndex].bulletPoints = [
      ...oldBulletPoints.slice(0 , index),
      ...oldBulletPoints.slice(index + 1, oldBulletPoints.length)
    ]
    this.setState({guide: newGuide})
  }

  handleOnIndent = (indentDelta, index) => {
    const {
      guide,
      editingStepIndex
    } = this.state
    const newGuide = Object.assign({}, guide)
    const oldIndent = newGuide.steps[editingStepIndex].bulletPoints[index].indent || 0
    const newIndent = oldIndent + indentDelta
    if (newIndent < 0 || newIndent > 2) return null
    newGuide.steps[editingStepIndex].bulletPoints[index].indent = newIndent
    this.setState({guide: newGuide})
  }
  onVideoUrl = (url) => {
    this.setState({youtube: url})
    const youtubeId = exctractYoutubeVideoId(url)
    if(youtubeId || url === '') this.onStepChange(url, 'video')
  }
  componentDidMount = () => {
    if(!this.state.guide.steps[this.state.editingStepIndex]){
      const newGuide = Object.assign({}, this.state.guide)
      newGuide.steps[this.state.editingStepIndex] = {
        stepName: '',
        images: [],
        video: '',
        bulletPoints: []
      }
      this.setState({
        guide: newGuide
      })
    }
  }
  render() {
    const {
      onDismiss,
      modalPath,
      handleSubmit
    } = this.props
    const {
      guide,
      editingStepIndex
    } = this.state
    const step = guide.steps[editingStepIndex] || null
    if(!step) return null
    return (
      <ModalFrame wide width={794} title={`Edit Step ${editingStepIndex + 1} ${step.stepName}`} onDismiss={this.onDismiss}>
      <div
        style={{
          maxWidth: 730,
        }}
      >
        <div
          style={{
            maxWidth: 330
          }}
        >
          <TextField
            label="Step Name"
            placeholder="what is this step about?"
            input={{
              value: step.stepName,
              onChange: (evt) => this.onStepChange(evt.target.value, 'stepName')
            }}
          />
        </div>
        <div
          style={{
            marginBottom: 20,
          }}
        >
        <ToggleButtons
          labels={['images', 'video']}
          selected={step.toggle || 'images'}
          onSelect={(label) => this.onStepChange(label, 'toggle')}
        />
        </div>
        <div
          className="bullets-and-images-wrapper"
        >
        {step.toggle === 'video' &&
          <div
           className="step-images-container"
           style={{
            marginTop: -4,
           }}
          >
            <div style={{position: 'relative', marginBottom: 20}}>
              <div className="video-placeholder">Video Preview</div>
              {step.video && <iframe
                width="330"
                height="206"
                style={{position: 'absolute', top: 0, left: 0}}
                src={`https://www.youtube.com/embed/${exctractYoutubeVideoId(step.video)}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>}
            </div>
            <TextField
              label="YouTube Video Url"
              placeholder="video url"
              input={{
                value: this.state.youtube || step.video,
                onChange: (evt) => this.onVideoUrl(evt.target.value)
              }}
            />
          </div>
        }

        {step.toggle !== 'video' &&
          <div
           className="step-images-container"
          >
          {this.renderImageInput(0, 330)}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {this.renderImageInput(0, 106)}
            {this.renderImageInput(1, 106)}
            {this.renderImageInput(2, 106)}
          </div>
          </div>
        }


        <AssemblyGuideBulletPoints
          bulletPoints={step.bulletPoints}
          onChange={this.handleBulletChange}
          onAddBullet={this.handleAddBullet}
          onDeleteBullet={this.handleDeleteBullet}
          onIndent={this.handleOnIndent}
        />
        </div>
        </div>

        {!this.state.clickedDelete && <div>
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <Button
              loading={false}
              label="delete"
              typeClass="default"
              onClick={() => this.setState({clickedDelete: true})}
            />
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Button
                loading={false}
                label="save"
                type="submit"
                typeClass="action"
                onClick={this.getNextPage}
              />
            </form>
          </div>
        </div>}

        {this.state.clickedDelete &&
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button
              loading={false}
              label="cancel"
              typeClass="default"
              onClick={() => this.setState({clickedDelete: false})}
            />
            <b>Are you sure you want to delete this step?</b>
            <Button
              loading={false}
              label={`Yes, delete step ${editingStepIndex + 1}`}
              type="submit"
              typeClass="default"
              onClick={this.deleteStep}
            />
          </div>
        }

      </ModalFrame>
    );
  }
}

EditAssemblyGuideModal.defaultProps = {
  guide: {
    steps:[{
      stepName: '',
      images: [],
      bulletPoints: [],
      video: [],
    }]
  }
}

EditAssemblyGuideModal = reduxForm({
  form: 'uploadFiles'
})(EditAssemblyGuideModal)

EditAssemblyGuideModal = connect(
  (state, ownProps) => ({
    initialValues: {
      files: [new File([new Blob([JSON.stringify(ownProps.guide)], {type: 'text'})], ownProps.fileName)]
    }
  }),
)(EditAssemblyGuideModal)

export default EditAssemblyGuideModal
