import React, { Component } from 'react'
import { Field, reduxForm, isDirty } from 'redux-form'
import TextArea from '../elements/inputs/textArea'
import TextField from '../elements/inputs/textField'
import { API } from '../../constants/api'
import RadioField from '../elements/radio'
import Button from '../elements/button'
import Dropzone from 'react-dropzone'
import YoutubePreview from '../elements/youtubePreview'
import { Prompt } from 'react-router'
import CrossIcon from '../icons/cross'
import ReactS3UploaderInput from '../elements/reactS3Uploader'
import Select from 'react-select';
import ReactTooltip from 'react-tooltip'


const required = value => value ? undefined : 'Required'
const requiredImage = value => value.source ? undefined : 'Required'
const youtubeUrl = value =>
  value && !/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(value) ?
  'Invalid youtube url' : undefined

const renderDropzoneInput = (field, type, title, limit=5 ) => {
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

const renderDropzoneInputLarge = (field, title, limit) => renderDropzoneInput(field, 'default', title, limit)
const renderDropzoneInputSlim = (field, title) => renderDropzoneInput(field, 'slim', title)

class RenderSelectInput extends Component {
  onChange(event) {
    if (this.props.input.onChange && event != null) {
      if (event.value) {
         this.props.input.onChange(event.value);
       } else {
         this.props.input.onChange(event);
       }
    } else {
      this.props.input.onChange(null);
    }
  }

 render() {
  const { input, options, name, id, ...custom } = this.props;
  return (
   <Select
    {...input}
    {...custom}
    id={id}
    name={name}
    options={options}
    value={this.props.input.value || ''}
    onBlur={() => this.props.input.onBlur(this.props.input.value)}
    onChange={this.onChange.bind(this)}
         isMulti
         isClearable={false}
         classNamePrefix="tags-select-box"
         className="tags-select-box"
   />
  );
 }
}

class Wizard extends Component {

  state = {
    noVideo: false,
  }

  onSubmit = (data) => {
    const {
      createProject
    } = this.props
    createProject(data)
  }

  componentWillMount = () => {
    this.props.getTagOptions()
  }

  render() {
    const {
      handleSubmit,
      formState,
      plan,
      options,
      creating
    } = this.props

    const normalizedOptions = []
    options.forEach( option => {
      normalizedOptions.push({
        value: option.name,
        label: option.name,
      })
    })

    return (
      <div className="wizard-form-container">
        <div>
        <div className="main-page-title" style={{paddingBottom: 8}}><h1 style={{textAlign: 'center'}}>Create Project</h1></div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-section-title">Basics</div>
        <div className="wizard-form-section">
          <div className="wizard-form-left-column">
          </div>
          <div className="wizard-form-right-column">
          <div>
            <div className="picture-input-label"><b>Thumbnail (Required)</b></div>
            <Field component={ReactS3UploaderInput} name="picture" />
          </div>

          <Field
            name="name"
            component={TextField}
            labelStyle={{fontWeight: 600}}
            label="Title"
            type="text"
            validate={required}
            limit={60}
          />

          <Field
            name="description"
            label="Description: Pitch your project in 90 characters or less."
            component={TextField}
            labelStyle={{fontWeight: 600}}
            type="text"
            limit={90}
            validate={[ required ]}
          />

      <ReactTooltip />
          <div className="text-input-label"><b> Tags: Categorize your project to make it easy to find. </b> <span data-tip="Select up to 5 tags. If a tag you need is not availabe, email info@welder.app with a request to add it"> ?</span></div>
          <Field
            name="tags"
            component={RenderSelectInput}
            labelStyle={{fontWeight: 600}}
            options={normalizedOptions}
          />

            <div className="text-input-label"><b>Privacy</b></div>
            <div>
              <Field
                  name="privacy"
                  component={RadioField}
                  type="radio"
                  value="0"
                  label="Public"
                  subLabel="Anyone can see this project. You choose who can modify it."
                />
                <Field
                  name="privacy"
                  component={RadioField}
                  type="radio"
                  value="2"
                  label="Private"
                  subLabel="You choose who can see and modify this project."
                />
            </div>
          </div>
        </div>
        <div className="form-section-title">Project Overview</div>
          <div className="wizard-form-section">

          <div className="wizard-form-left-column"></div>
          <div className="wizard-form-right-column">
            <div>
              {!this.state.noVideo &&
                <div>
                <Field labelStyle={{fontWeight: 600}} name="youtubeVideoUrl" component={TextField} label="Youtube URL: Do you have a project video?" type="text" validate={[youtubeUrl]}/>
                <div style={{fontSize: 14, marginTop: -14, marginBottom: 20, cursor: 'pointer'}} onClick={() => this.setState({noVideo: true})}>
                  No video? <span style={{textDecoration: 'underline'}}> Start your overview with a banner image instead</span>
                </div>
                {(formState && formState.values && !(formState.syncErrors && formState.syncErrors.youtubeVideoUrl) && formState.values.youtubeVideoUrl) &&
                  <div style={{margin: 'auto', marginBottom: 16, width: 420}}>
                    <YoutubePreview url={formState.values.youtubeVideoUrl} />
                  </div>
                }
                </div>
              }
              {this.state.noVideo &&
                <div>
                <div className="text-input-label"><b>Banner Image</b></div>
                <Field
                  name={'files'}
                  component={(field) => renderDropzoneInputLarge(field, "Add the banner image of your project", 1)}
                />
                <div style={{fontSize: 14, marginTop: -14, marginBottom: 20, cursor: 'pointer'}} onClick={() => this.setState({noVideo: false})}>
                  <span style={{textDecoration: 'underline'}}>Switch back to video.</span>
                </div>
              </div>}
            </div>

          <Field name="summary" labelStyle={{fontWeight: 600}} validate={required} label="Summary: How would you explain your project?" component={TextArea} type="text"/>
          <Field
            name={'summaryFiles'}
            component={(field) => renderDropzoneInputSlim(
              field,
              "Add images to Project Summary"
            )}
          />
        <Field name="goal" labelStyle={{fontWeight: 600}} label="Goal: What does this project aim to accomplish?" component={TextArea} type="text"/>
          <Field
            name={'goalFiles'}
            component={(field) => renderDropzoneInputSlim(
              field,
              "Add images to Project Goal"
            )}
          />

        <Field labelStyle={{fontWeight: 600}} name="technicalSpecifications" label="Specifications: Did the project need to meet any requirements?" component={TextArea} type="text"/>
          <Field
            name={'technicalFiles'}
            component={(field) => renderDropzoneInputSlim(
              field,
              "Add images to Technical Specifications"
            )}
          />

          <Field name="roadmap" labelStyle={{fontWeight: 600}} label="Roadmap (optional): What future work is planned?" component={TextArea} type="text"/>
          <Field
            name={'roadmapFiles'}
            component={(field) => renderDropzoneInputSlim(
              field,
              "Add images to Project Roadmap"
            )}
          />

          <Field name="team" labelStyle={{fontWeight: 600}} label="Team: Who worked on this project?" component={TextArea} type="text"/>
          <Field
            name={'teamFiles'}
            component={(field) => renderDropzoneInputSlim(
              field,
              "Add images to Team"
            )}
          />
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 12}}>
          <Button
              disabled={formState && formState.syncErrors}
              loading={this.props.creating}
              typeClass="action"
              type="submit"
              label="Create"/>
          </div>
        </form>
        <Prompt when={formState && formState.anyTouched} message="Are you sure you want to leave?"/>
      </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'Wizard',
  initialValues: {
    picture: { "source": null, "path": "" },
    privacy: '0',
    tags: [],
    version3: true
  }
})(Wizard)
