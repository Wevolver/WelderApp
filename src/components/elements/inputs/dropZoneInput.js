import React, { Component } from 'react'
import ReactS3UploaderInput from '../../elements/reactS3Uploader'
import CrossIcon from '../../icons/cross'
import Dropzone from 'react-dropzone'

let renderDropzoneInput = (field, type, title, limit=5 ) => {
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
      {files.length < limit &&
        <Dropzone
          name={field.name}
          accept="image/jpeg,image/png,image/gif"
          className={type === 'slim' ? 'dropzone-slim' :'dropzone'}
          activeClassName="dropzone-active"
          onDrop={onChange}
          maxSize={2097152}
        >
          {!title &&
            <div>Drag files here to add them, or <u>choose your files</u>.</div>
          }
          {title &&
            <div><div>{title}</div><div style={{fontSize: 12, fontWeight: 200}}>JPEG, PNG or GIF • 2MB file limit</div></div>
          }
        </Dropzone>
      }
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <div className="files-container">
          { files.map((file, i) =>
            <div className="file-item" key={i}>
              <img src={file.preview} height={64} width="auto"/>
              <span style={{flexGrow: 1, padding: 4}}>{file.name}</span>
              <a onClick={() => removeFile(file)} className="file-remove"><CrossIcon /></a>
            </div>) }
        </div>
      )}
      <div style={{marginBottom: 24}} />
    </div>
  )
}

export default renderDropzoneInput
