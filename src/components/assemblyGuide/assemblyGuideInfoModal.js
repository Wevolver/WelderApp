import { Field, reduxForm, change as changeFieldValue } from 'redux-form'
import AssemblyGuideBulletPoints from './assemblyGuideBulletPoints'
import ReactS3UploaderInput from '../elements/reactS3Uploader'
import TextField from '../elements/inputs/textField'
import ModalFrame from '../modals/base/modalFrame'
import TextArea from '../elements/inputs/textArea'
import NumericInput from 'react-numeric-input'
import ToggleButtons from '../elements/toggle'
import { toast } from '../../modules/toast'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import LinkIcon from '../icons/link'
import Select from 'react-select'


class EditAssemblyGuideInfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guide: props.guide,
      intialInfo: props.guide.info,
      clickedDelete: false,
    }
  }

  onInfoChange = (newValue, key) => {
    let newGuide = this.state.guide
    if(!newGuide.info){
      newGuide.info = {}
    }
    newGuide.info[key] = newValue
    this.setState({guide: newGuide})
  }

  onInfoArrayChange = (newValue, key, index, valueKey) => {
    let newGuide = this.state.guide
    newGuide.info[key][index][valueKey] = newValue
    this.setState({guide: newGuide})
  }


  isClean= () => {
    const info =  this.state.guide.info
    let toolsNotNull = info.tools ? info.tools.some(function (el) {
        return el !== null;
    }) : false
    let componentsNotNull = info.components ? info.components.some(function (el) {
        return el !== null;
    }) : false
    if(!info || !info.difficulty && !info.time && (!toolsNotNull || info.tools.length < 1) && (!componentsNotNull || info.components.length < 1)) {
      return true
    }
    return false
  }

  isDirty = () => {
    const newInfo =  JSON.stringify(this.state.guide.info)
    const oldInfo =  JSON.stringify(this.state.intialInfo)
    if(newInfo === oldInfo) {
      return false
    }
    return true
  }

  onDismiss = () => {
    if(this.isClean()) {
      return this.props.onDismiss()
    } else if (!this.isDirty()) {
      return this.props.onDismiss()
    } else if(window.confirm("Are you sure you want to exit the modal? Data you have entered may not be saved.")) {
      return this.props.onDismiss()
    } else {
      return console.log('Dont Dismiss')
    }
  }

onSubmit = () => {
    const {
      listOfFiles,
      folders
    } = this.props;
    let fileName = this.props.fileName
    let nameWithPath = folders.join('/') + (folders.length > 1 ? '/' : '') + this.props.fileName
    let assemblyGuide = new File([new Blob([JSON.stringify(this.state.guide)], {type: 'text'})], fileName)
    this.props.uploadGuide(assemblyGuide, this.props.modalPath)
  }

  componentDidMount = () => {
    console.log(this.state.guide.info);
    if(!this.state.guide.info){
        let newGuide = this.state.guide
        newGuide.info = {}
        this.setState({guide: newGuide})
    }
    console.log(this.state.guide);
  }

  render() {

    const options = [
      { value: 'Beginner', label: 'Beginner' },
      { value: 'Intermediate', label: 'Intermediate' },
      { value: 'Advanced', label: 'Advanced' },
      { value: 'Expert', label: 'Expert' }
    ]

    const {
      onDismiss,
      modalPath,
      handleSubmit
    } = this.props

    const {
      guide,
    } = this.state
    console.log(guide);

    return (
      <ModalFrame wide width={794} title={`Edit Assembly Guide Info`} onDismiss={this.onDismiss}>
        <div style={{ maxWidth: 730 }} >
          <p className="text-input-label"><b>Difficulty</b></p>
          <Select
            value={guide.info && guide.info.difficulty ? guide.info.difficulty : ""}
            onChange={(value) => this.onInfoChange(value, 'difficulty')}
            options={options}
            classNamePrefix="tags-select-box"
            className="tags-select-box"
          />

          <p className="text-input-label"><b>Hours Required</b></p>
          <NumericInput
            step={0.1}
            precision={1}
            onChange={(value => this.onInfoChange(value, 'time'))}
            value={guide.info && guide.info.time ? guide.info.time : ""}
            className={'text-input'}
            noStyle
          />

        <p className="text-input-label"><b>Components</b></p>
          {guide.info && guide.info.components && guide.info.components.map((row, index) =>
            <div className="specs-row">
              <div className="specs-cell guide-info-cell">
                <TextField
                  label={index < 1 ? 'Name' : null}
                  limit={50}
                  input={{
                    value: row.name || "",
                    onChange: (value) => this.onInfoArrayChange(value.target.value, 'components', index, 'name')
                  }}
                />
              </div>
              <div className="specs-cell guide-info-cell">
                <TextField
                  label={index < 1 ? 'Link' : null}
                  limit={50}
                  input={{
                    value: row.url || "",
                    onChange: (value) => this.onInfoArrayChange(value.target.value, 'components', index, 'url')
                  }}
                />
              </div>
              <div className="specs-cell guide-info-cell">
                <TextField
                  label={index < 1 ? 'Quantity' : null}
                  limit={50}
                  input={{
                    value: row.quantity || "",
                    onChange: (value) => this.onInfoArrayChange(value.target.value, 'components', index, 'quantity')
                  }}
                />
              </div>
            </div>

          )}

          <Button
            typeClass="add"
            style={{margin: 'auto', marginTop: 10}}
            type="button"
            label="Add Component"
            onClick={(e) => {
              e.preventDefault()
              let newGuide = guide
              if(!newGuide.info.components){
                newGuide.info.components = []
              }
              newGuide.info.components.push({})
              this.setState({guide: newGuide})
            }}
          />

        <p className="text-input-label"><b>Tools and Fabrication Machines</b></p>
        {guide.info && guide.info.tools && guide.info.tools.map((row, index) =>
          <div className="specs-row">
            <div className="specs-cell guide-info-cell">
              <TextField
                label={index < 1 ? 'Name' : null}
                limit={50}
                input={{
                  value: row.name || "",
                  onChange: (value) => this.onInfoArrayChange(value.target.value, 'tools', index, 'name' )
                }}
              />
            </div>
            <div className="specs-cell guide-info-cell">
              <TextField
                label={index < 1 ? 'Link' : null}
                limit={50}
                input={{
                  value: row.url || "",
                  onChange: (value) => this.onInfoArrayChange(value.target.value, 'tools', index, 'url')
                }}
              />
            </div>
          </div>
        )}

        <Button
          typeClass="add"
          style={{margin: 'auto', marginTop: 10}}
          type="button"
          label="Add Tool/Fabrication Machine"
          onClick={(e) => {
            e.preventDefault()
            let newGuide = guide
            if(!newGuide.info.tools){
              newGuide.info.tools = []
            }
            newGuide.info.tools.push({})
            this.setState({guide: newGuide})
          }}
        />

        </div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              loading={false}
              label="save"
              type="submit"
              typeClass="action"
            />
          </div>
        </form>
      </ModalFrame>
    );
  }
}

EditAssemblyGuideInfoModal.defaultProps = {
  guide: {
    info:{
      difficulty: '',
      time: '',
      components: [],
      tools: [],
    }
  }
}

EditAssemblyGuideInfoModal = reduxForm({
  form: 'uploadFiles'
})(EditAssemblyGuideInfoModal)

EditAssemblyGuideInfoModal = connect(
  (state, ownProps) => ({
    initialValues: {
      files: [new File([new Blob([JSON.stringify(ownProps.guide)], {type: 'text'})], ownProps.fileName)]
    }
  }),
)(EditAssemblyGuideInfoModal)

export default EditAssemblyGuideInfoModal
