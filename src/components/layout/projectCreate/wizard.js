import React, { Component } from 'react'
import RenderSelectInput from '../../elements/inputs/reactSelectInput.js'
import renderDropzoneInput from '../../elements/inputs/dropZoneInput'
import DocumentLoader from '../../elements/loader/documentLoader'
import ReactS3UploaderInput from '../../elements/reactS3Uploader'
import OverviewEdit from '../../../containers/OverviewEdit'
import YoutubePreview from '../../elements/youtubePreview'
import TextField from '../../elements/inputs/textField'
import { Field, reduxForm, isDirty } from 'redux-form'
import TextArea from '../../elements/inputs/textArea'
import RadioField from '../../elements/radio'
import { API } from '../../../constants/api'
import Button from '../../elements/button'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import Tooltip from '../../icons/tooltip'
import { Prompt } from 'react-router'

const required = value => value ? undefined : 'Required'
const requiredImage = value => value.source ? undefined : 'Required'
const REGEX = /^[-+\w\s]+$/

const nameIsValid = name => {
  return REGEX.exec(name) ?  undefined : "Titles may contain alphanumeric characters, '-', or '+''"
}

const youtubeUrl = value =>
  value && !/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(value) ?
  'Invalid youtube url' : undefined

const renderDropzoneInputLarge = (field, title, limit) => renderDropzoneInput(field, 'default', title, limit)
const renderDropzoneInputSlim = (field, title) => renderDropzoneInput(field, 'slim', title)

class Wizard extends Component {

  state = {
    noVideo: false,
    projectCreated: false,
  }

  onSubmit = (data) => {
    this.setState({projectCreated: true})
    this.props.createProject(data, this.props.location.pathname.includes("careables/create"))
    window.scrollTo(0, 0)
  }

  componentWillMount = () => {
    this.props.getTagOptions()
  }

  render() {
    const {
      handleSubmit,
      formState,
      plan,
      auth,
      options,
      creating,
      location,
      wizardProjectCreated,
      project
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
        <div className="main-page-title" style={{paddingBottom: 8}}>
          <h1 style={{textAlign: 'center', textTransform: 'none'}}>Create Project</h1>
          {wizardProjectCreated && <p style={{marginTop: 0, textTransform: 'none', fontSize: '1rem', fontWeight: 'bold'}}> Step 2/2 </p>}
        </div>

        {!wizardProjectCreated && !creating &&
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="form-section-title">Project Settings</div>
            <div className="wizard-form-section">
              <div className="wizard-form-left-column"></div>
              <div className="wizard-form-right-column">
                <div>
                  <div className="picture-input-label">
                    <b>Thumbnail *</b>
                  </div>
                  <Field validate={[requiredImage]} component={ReactS3UploaderInput} name="picture" />
                </div>
                <Field
                  name="name"
                  component={TextField}
                  labelStyle={{fontWeight: 600}}
                  label="Title *"
                  type="text"
                  validate={[required, nameIsValid]}
                  limit={60}
                />
                <Field
                  name="description"
                  label="Description: Pitch your project in 90 characters or less. *"
                  component={TextField}
                  labelStyle={{fontWeight: 600}}
                  type="text"
                  limit={90}
                  validate={[required]}
                />
               <div className="text-input-label">
                 <ReactTooltip />
                 <b> Tags: Categorize your project to make it easy to find. </b>
                 <span data-tip="Select up to 5 tags. If a tag you need is not availabe, email info@welder.app with a request to add it"> <Tooltip/> </span>
               </div>
                <Field
                  name="tags"
                  component={RenderSelectInput}
                  labelStyle={{fontWeight: 600}}
                  options={normalizedOptions}
                  multi={true}
                />
                <div className="text-input-label">
                  <b> License: Choose what rights you grant others to copy, distribute, or modify your work.</b>
                </div>
                <Field
                  name="license"
                  component={RenderSelectInput}
                  labelStyle={{fontWeight: 600}}
                  options={[{
                    value: "CERN OHL v.1.2",
                    label: "CERN OHL v.1.2",
                  }, {
                    value: "TAPR OHL",
                    label: "TAPR OHL",
                  }]}
                  multi={false}
                />
                <div className="text-input-label">
                  <b>Privacy</b>
                </div>
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
                    disabled={!auth || !auth.plan || auth.plan === "free"}
                    label="Private"
                    subLabel="You choose who can see and modify this project."
                  />
                </div>
              </div>
            </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 12}}>
            <Link to={`/profile/${auth.slug}`} >
              <Button
                disabled={this.props.creating}
                typeClass=""
                label="Cancel"
              />
            </Link>
            <Button
              disabled={formState && formState.syncErrors}
              loading={this.props.creating}
              typeClass="action"
              type="submit"
              label="Create"
            />
            </div>
          </form>
        }
        {
          !creating && wizardProjectCreated && project &&
          <div>
            <div className="form-section-title">Project Overview</div>
            <OverviewEdit canCommit creating startEditing redirectAfter project={project}/>
          </div>
        }

        {
          creating &&
          <div>
           <DocumentLoader type={'text'}/>
           <div style={{paddingTop:'12px', borderTop: '1px solid #bdbdbd', display: 'flex', justifyContent: 'flex-end', marginTop: 12}}>
             <Button loading={this.props.creating} />
           </div>
          </div>
         }
        <Prompt when={formState && formState.anyTouched} message="Are you sure you want to leave?"/>
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
    license: [],
    version3: true
  }
})(Wizard)
