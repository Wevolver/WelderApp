import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ModalFrame from './base/modalFrame'
import TextArea from '../elements/inputs/textArea'
import TextField from '../elements/inputs/textField'
import Button from '../elements/button'


class CreateTextModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  required = value => value ? undefined : 'Required'
  nameIsValid = name => {
    return this.lookForFile(this.props.tree, this.props.modalPath, name + '.wevolver') ? "Filename already exists in this folder": undefined
  }

  lookForFile= (tree, path, name) => {
    if(!tree || !name){
      return true
    }
    let searchPath = tree.root.find(folder => folder['name'] === path.split('/')[0])
    if(!!!searchPath){
      path.split('/').slice(1).forEach(folder => {
        searchPath = tree[searchPath.oid].find( blob => blob['oid'] === folder.oid)
      })
    }
    let fileExists = null

    if(searchPath){
      fileExists = tree[searchPath.oid].find( blob => blob['name'] === name)
    } else {
      fileExists = tree["root"].find( blob => blob['name'] === name)
    }
    return !!fileExists;
  }


  onSubmit = (data) => {
    const {
      formState,
      modalPath,
      tree,
      createText
    } = this.props
    createText(modalPath)
    this.setState({loading: true})
  }

  render() {
    const {
      handleSubmit,
      onDismiss,
      saveFile,
      defaultMessage,
      formState,
      modalPath,
      tree
    } = this.props
    return (
      <ModalFrame title={"Add Text"} onDismiss={onDismiss}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
         <div>
           <Field
            name={'newFileName'}
            component={TextField}
            type="text"
            label="Filename: "
            validate={[
              this.required,
              this.nameIsValid,
            ]}
           />
          </div>

          <div className="modal-buttons">
            <Button
              disabled={formState && formState.values && (!formState.values.newFileName || this.lookForFile(tree, modalPath, formState.values.newFileName + '.wevolver'))}
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

CreateTextModal = reduxForm({
  form: 'createTextFiles'
})(CreateTextModal)

CreateTextModal = connect(
  (state, ownProps) => ({
    initialValues: {
      newFileName: "",
    }
  }),
)(CreateTextModal)

export default CreateTextModal
