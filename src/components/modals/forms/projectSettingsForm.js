import React, { Component } from 'react';
import ReactS3UploaderInput from '../../elements/reactS3Uploader'
import RenderSelectInput from '../../elements/inputs/reactSelectInput.js'
import TagsSelectBox from '../../../containers/Tags/TagsSelect'
import RFReactSelect from '../../elements/RFReactSelect'
import TextField from '../../elements/inputs/textField'
import { Field, reduxForm, isDirty } from 'redux-form'
import TextArea from '../../elements/inputs/textArea'
import CheckboxField from '../../elements/checkbox'
import RadioField from '../../elements/radio'
import { API } from '../../../constants/api'
import Button from '../../elements/button'
import { connect } from 'react-redux'
import get from 'lodash/get'

const REGEX = /^[-+\w\s]+$/
const nameIsValid = name => {
  return REGEX.exec(name) ?  undefined : "Titles may contain alphanumeric characters, '-', or '+''"
}

class ProjectSettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attemptingDelete: false,
    }
  }

  onSubmit = (data) => {
    const {
      editProject,
      onDismiss
    } = this.props
    editProject(data)
    onDismiss()
  }

  onDeleteAttempt = (event) => {
    event.preventDefault()
    this.setState({
      attemptingDelete: true
    })
  }

  render() {
    const {
      handleSubmit,
      dirty,
      project,
      loading,
      plan,
      formState,
      hiddenTags,
      authUser,
    } = this.props
    const {
      attemptingDelete,
    } = this.state

    const hiddenTagOptions = hiddenTags.map(tag => {
      const option = {value: tag.name, label: tag.name}
      return option
    })

  let oid = get(project.created_user, '$oid')
  if(!oid){
      oid = get(project.created_user_id, '$oid')
  }
   return (
      <div>
        {!attemptingDelete &&
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div>
              <div className="picture-input-label">Picture</div>
              <Field component={ReactS3UploaderInput} name="picture"/>
            </div>

            <Field
            name="version3"
            component={CheckboxField}
            type="checkbox"
            hidden={plan !== 'admin'}
            value="3"
            label="v3"
            />

            <TagsSelectBox />
            {plan === 'admin' &&
              <Field
                multi
                name="hiddenTags"
                className="tags-select-box"
                options={hiddenTagOptions}
                component={RFReactSelect}
              />
            }

            <Field component={TextField} name="university" label="University" hidden={formState && !formState.values.version3} type="text"/>
            <Field name="name" component={TextField} label="Title *" warning={"Changing your project's title will change its URL and its clone URL."}type="text" validate={[ nameIsValid ]} />
            <Field name="description" component={TextArea} rows={2} label="Description" type="text" limit={90}/>
              <div className="text-input-label"> License </div>
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
            <div style={{marginBottom: 20}}>
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
                disabled={!authUser || !authUser.plan || authUser.plan === "free"}
                label="Private"
                subLabel="You choose who can see and modify this project."
              />
            </div>

            <div className="modal-buttons" style={{justifyContent: 'space-between'}}>
               <Button
                loading={false}
                type="button"
                disabled={authUser._id !== oid}
                style={{marginLeft: 0}}
                onClick={this.onDeleteAttempt}
                label="Delete Project"/>

              <Button
                disabled={!dirty}
                loading={loading}
                type="submit"
                typeClass="action"
                label="Save"/>
            </div>
          </form>
        }
        {attemptingDelete &&
          <div>
            Are you sure you want to delete this project?
            This action cannot be undone. This will permanently delete the <b>{project.name}</b> and everything related to it.
            <Button
              style={{marginLeft: 0, marginTop: 12}}
              loading={false}
              type="button"
              onClick={this.props.deleteProject}
              label="I Understand, Delete Project"/>
          </div>
        }
      </div>
    );
  }
}


ProjectSettingsForm =  reduxForm({
  form: 'projectSettings',
})(ProjectSettingsForm)

ProjectSettingsForm = connect(
  (state, ownProps) => ({
    dirty: isDirty('projectSettings'),
    asyncBlurFields: [],
    enableReinitialize : true,
    initialValues: {
      picture: ownProps.project.picture,
      name: ownProps.project.name,
      version3: ownProps.project.version === '3',
      name: ownProps.project.name,
      university: ownProps.project.university,
      license: {"value": ownProps.project.license, "label": ownProps.project.license},
      hiddenTags: ownProps.project.hidden_tags,
      description: ownProps.project.description,
      privacy: String(ownProps.project.privacy),
    }
  }),
)(ProjectSettingsForm)

export default ProjectSettingsForm
