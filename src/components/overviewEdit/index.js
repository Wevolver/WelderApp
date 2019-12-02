import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, isDirty, change, FieldArray } from 'redux-form'
import QuillField from '../elements/inputs/quillField'
import TextField from '../elements/inputs/textField'
import OverviewPreviewV4 from './overviewPreviewV4'
import HTML5Backend from 'react-dnd-html5-backend'
import TextArea from '../elements/inputs/textArea'
import { DragDropContext } from 'react-dnd'
import renderSources from './renderSources'
import renderGallery from './renderGallery'
import Button from '../elements/button'
import renderSpecs from './renderSpecs'
import { Prompt } from 'react-router'
import get from 'lodash/get'
import './overviewEdit.css'

const required = value => value ? undefined : 'Required'

class OverviewEdit extends Component {

  state = {
    editing: false,
  }

  onSubmit = () => {
    const {
      editOverview,
      redirectAfter,
      redirect,
      project
    } = this.props
    const projectId = get(project, '_id.$oid')
    this.setState({editing: false})
    window.scrollTo(0, 0)
    editOverview(projectId)
    if(redirectAfter) redirect(`/${project.user_slug}/${project.slug}`)
  }

  render() {
    const {
        project,
        handleSubmit,
        startEditing,
        redirectAfter,
        creating,
        formState,
        canCommit
    } = this.props

    if(startEditing && !this.state.editing){
      this.setState({editing: true})
    }

    const {
      editing
    } = this.state

    if(!get(project, '_id')) return null
    return (
      <div className={creating ? "" : "border-left"} style={{width: '100%', maxWidth: 752, margin: '0 auto'}}>
        {editing && <Prompt when={true} message="Are you sure you want to leave? Your changes will not be saved."/>}
        {!editing &&
          <div>
          <div style={{minHeight: 32, marginTop: 6, marginBottom: 6}}>
          {canCommit && <Button
            onClick={() => this.setState({editing: true})}
            typeClass="action"
            type="submit"
            style={{marginLeft: 'auto'}}
            label="Edit"
          />}
          </div>
          <OverviewPreviewV4 overview={get(project, 'overview')} />
          </div>
        }
        {(editing && canCommit) &&
          <form className='padding-left overview-edit-form' onSubmit={handleSubmit(this.onSubmit)}>

              <p className="text-input-label"><b>Media Gallery</b></p>
              <FieldArray
                name="gallery"
                component={renderGallery}
              />

              <Field name="summary"
                label="Summary: What is the product? *"
                labelStyle={{fontWeight: 600}}
                validate={[required]}
                textfield
                component={QuillField}/>

              <Field
                labelStyle={{fontWeight: 600}}
                textfield
                label="Goal: What does this project aim to accomplish" name="goal" component={QuillField}/>

              <p className="text-input-label"><b>Specifications: what attributes describe the product?</b></p>
              <FieldArray name="spec_table" component={renderSpecs}/>

              <Field
                labelStyle={{fontWeight: 600}}
                textfield
                label="Roadmap: What future work is planned?" name="roadmap" component={QuillField}/>

              <Field
                labelStyle={{fontWeight: 600}}
                textfield
                label="Team: Who worked on this project?" name="team" component={QuillField}/>

              <p className="text-input-label"><b>References: What external sources provide additional information?</b></p>
              <FieldArray name="sources" component={renderSources}/>

              <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px', borderTop: '1px solid #bdbdbd', paddingTop: 12, marginTop: 30, marginLeft: 'auto'}}>
              {!creating &&
                <Button
                  typeClass=""
                  type=""
                  label={'Cancel'}
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({editing: false})
                  }}
                />
              }
                <Button
                  typeClass="action"
                  type="submit"
                  disabled={formState && formState.syncErrors}
                  label={creating ? "Create" : "Save and View"}
                />
              </div>
          </form>
        }
      </div>
    )
  }
}

OverviewEdit = reduxForm({
  form: 'projectOverview',
  enableReinitialize: true,
})(OverviewEdit)

OverviewEdit = connect(
  (state, ownProps) => ({
    initialValues: get(ownProps, 'project.overview') || {}
  }),
)(OverviewEdit)

export default DragDropContext(HTML5Backend)(OverviewEdit)
