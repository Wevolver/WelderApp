import React, { Component } from 'react'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import AssemblyGuideStep from './assemblyGuideStep'
import './assemblyGuide.css'
import SortContainer from './sortContainer'
import AssemblyGuideInfo from './assemblyGuideInfo'


class AssemblyGuide extends Component {

  constructor(props) {
    super(props)
    this.state = {
      steps: null,
    }
  }

  onEditGuideInfo = () => {
    const {
      openEditGuideModal,
    } = this.props
    openEditGuideModal()
  }

  onEdit = (step) => {
    const {
      openEditStepModal,
      addEditingGuide,
      initialValue,
      guide
    } = this.props

    const initialValueIfEmpty = {
      steps: [{
        images: [],
        bulletPoints: [],
        stepName: '',
      }]
    }
    const initialValueClone = Object.assign({}, guide || initialValue)
    addEditingGuide(this.props.guide, step === null ? this.props.guide.steps.length : step)
    openEditStepModal()
  }

  moveSteps = (steps) => {
    const newGuide = Object.assign({}, this.props.guide, {...steps})
    this.props.addEditingGuide(newGuide, -1)
  }

  componentDidMount = () => {
    this.props.addEditingGuide(this.props.initialValue, -1)
  }

  componentWillUnmount () {
  this.props.removeEditingGuide()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.initialValue !== this.props.initialValue) {
      this.props.addEditingGuide(this.props.initialValue, -1)
    }
  }

  render() {
    const {
      initialValue,
      uploadGuide,
      fileName,
      isAuthenticated,
      project,
      canCommit,
      auth,
      guide
    } = this.props
    console.log(canCommit);
    return (
      <div>
        <h3 style={{margin: 0, marginBottom: 10}}>Assembly Guide</h3>
        <AssemblyGuideInfo project={project} auth={auth} isAuthenticated={isAuthenticated} guide={guide} onEditGuideInfo={() => this.onEditGuideInfo()}/>
        <SortContainer
          moveSteps={this.moveSteps}
          save={(file, name, stepChange) => uploadGuide(file, name, stepChange)}
          guide={guide}
          fileName={fileName}
          onAddStep={() => this.onEdit(null)}
          steps={guide ? guide.steps : []}
          editable={canCommit}
        />
      {guide && guide.steps && guide.steps.map((step, index) =>
        <AssemblyGuideStep
          step={step}
          index={index}
          key={index}
          onEdit={this.onEdit}
          editable={canCommit}
        />
      )}
      </div>
    )
  }
}

export default AssemblyGuide
