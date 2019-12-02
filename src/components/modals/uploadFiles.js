import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ModalFrame from './base/modalFrame'
import TextArea from '../elements/inputs/textArea'
import TextField from '../elements/inputs/textField'
import Button from '../elements/button'
import Dropzone from 'react-dropzone'

const renderDropzoneInput = (field) => {
  const files = field.input.value || []
  const onChange = (filesToUpload, e) => {
    let results = filesToUpload
    files.forEach(file => {
      results = results.filter(result => result.name !== file.name)
    })
    field.input.onChange([...files, ...results])
  }

  const removeFile = (fileToDelete) => {
    const result = files.filter(file => file.name !== fileToDelete.name)
    field.input.onChange(result)
  }
  return (
    <div>
      <Dropzone
        name={field.name}
        className="dropzone"
        activeClassName="dropzone-active"
        onDrop={onChange}
      >
        <div>Drag files here to add them, or <u>choose your files</u>.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <div className="files-container">
          { files.map((file, i) =>
            <div className="file-item" key={i}>
              <span>{file.name}</span>
              <a onClick={() => removeFile(file)} className="file-remove">✕</a>
            </div>) }
        </div>
      )}
      <div style={{marginBottom: 24}} />
    </div>
  )
}


class UploadFilesModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  onSubmit = (data) => {
    const {
      uploadFiles,
      formState,
      defaultMessage,
      modalPath,
      editFileToggle
    } = this.props
    if(!formState.values.message) this.props.change('message', defaultMessage)
    uploadFiles(modalPath)
    if(editFileToggle) editFileToggle()
    this.setState({loading: true})
  }

  render() {
    const {
      handleSubmit,
      onDismiss,
      saveFile,
      defaultMessage,
      formState
    } = this.props
    return (
      <ModalFrame title={saveFile ? "Save File" : "Add Files"} onDismiss={onDismiss}>
        {!saveFile && !this.state.newFolder &&
          <Button
            loading={false}
            type="button"
            style={{margin: 0, marginBottom: 12}}
            onClick={(event) => {event.preventDefault(); this.setState({newFolder: true})}}
            label="Create New Folder"/>
        }
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {this.state.newFolder &&
            <div>
              <div className="modal-section-title">Folder Name</div>
              <Field
                name={'newFolderName'}
                component={TextField}
                type="text"
              />
            </div>
          }
          {!saveFile &&
            <div>
              <div className="modal-section-title">Files</div>
              <Field
                name={'files'}
                component={renderDropzoneInput}
              />
            </div>
          }
          <div className="modal-section-title">Revision Message</div>
          <Field name="message" component={TextArea} type="text" placeholder={defaultMessage}/>
          <div className="modal-buttons">
            <Button
              disabled={formState && formState.values.files.length < 1}
              loading={this.state.loading}
              type="submit"
              typeClass="action"
              label="Save"
            />
          </div>
        </form>
      </ModalFrame>
    )
  }
}

UploadFilesModal = reduxForm({
  form: 'uploadFiles'
})(UploadFilesModal)

UploadFilesModal = connect(
  (state, ownProps) => ({
    initialValues: {
      files: ownProps.editedFile || [],
    }
  }),
)(UploadFilesModal)

export default UploadFilesModal
