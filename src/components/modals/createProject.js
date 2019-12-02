import TextField from '../elements/inputs/textField'
import TextArea from '../elements/inputs/textArea'
import { Field, reduxForm } from 'redux-form'
import RadioField from '../elements/radio'
import CheckBox from '../elements/checkbox'
import React, { Component } from 'react'
import Button from '../elements/button'
import ModalFrame from './base/modalFrame'
import { API } from '../../constants/api'
import CheckboxField from '../elements/checkbox'

import ReactS3UploaderInput from '../elements/reactS3Uploader'

const required = value => value ? undefined : 'Required'
const REGEX = /^[-+\w\s]+$/
const nameIsValid = name => {
  return REGEX.exec(name) ?  undefined : "Titles may contain alphanumeric characters, '-', or '+''"
}

class CreateProjectModal extends Component {

  onSubmit = (data) => {
    const {
      createProject
    } = this.props
    createProject(data)
  }

  render() {
   const {
      handleSubmit,
      onDismiss,
      formState,
      plan,
      actions,
      creating
    } = this.props
    return (
      <ModalFrame title="Create a New Project" onDismiss={onDismiss}>
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

          <Field component={TextField} name="university" label="University" hidden={formState && !formState.values.version3} type="text"/>
          <Field name="name" validate={[
            required,
            nameIsValid,
          ]}
          component={TextField} label="Title *" type="text"/>
          <Field name="description" label="Description" component={TextArea} type="text" limit={90} rows={2}/>

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

          <div className="modal-buttons">
            <Button
              disabled={formState && formState.syncErrors}
              loading={creating}
              typeClass="action"
              type="submit"
              label="Create"/>
          </div>
        </form>
      </ModalFrame>
    )
  }
}


export default reduxForm({
  form: 'createProject',
  initialValues: {
    picture: { "source": null, "path": "" },
    privacy: '0',
    university: '',
    version3: false
  }
})(CreateProjectModal)
