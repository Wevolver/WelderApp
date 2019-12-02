import React, { Component } from 'react';
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Clone from './Clone'
import RestoreRevision from './RestoreRevision'
import ProjectSettings from './ProjectSettings'
import UploadFiles from './UploadFiles'
import ProjectHistory from './ProjectHistory'
import CreateProject from './CreateProject'
import CreateText from './CreateText'
import SaveFile from './SaveFile'
import EditAssemblyStep from './EditAssemblyStep'
import EditAssemblyGuideInfo from './EditAssemblyGuideInfo'
import Modal from '../../components/modals/base/modal'
import Fade from '../../components/modals/base/fade'

import { heapEvent } from '../../modules/heap'
import { setModalId } from '../../actions/index'

class Modals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderModalId: null
    }
  }
  modalsOff = () => {
    const { dispatch } = this.props
    dispatch(setModalId(null))
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.activeId !== this.props.activeId) {
      if(nextProps.activeId === null) {
        setTimeout(() => this.setState({ renderModalId: null }), 120)
      } else {
        this.setState({renderModalId: nextProps.activeId })
      }
    }
  }

  modalSwitch = (param) => {
    heapEvent.track('Open Modal', {modal: param});


    switch(param) {
      case 'login':
        return <Login key="login" onDismiss={this.modalsOff}/>
      case 'register':
        return <Register key="register" onDismiss={this.modalsOff}/>
      case 'projectSettings':
        return <ProjectSettings key="projectSettings"  onDismiss={this.modalsOff}/>
      case 'uploadFiles':
        return <UploadFiles key="uploadFiles" modalPath={this.props.modalPath} onDismiss={this.modalsOff}/>
      case 'projectHistory':
        return <ProjectHistory key="projectHistory" onDismiss={this.modalsOff}/>
      case 'createProject':
        return <CreateProject key="createProject" onDismiss={this.modalsOff}/>
      case 'addText':
        return <CreateText key="addText" modalPath={this.props.modalPath} tree={this.props.tree} onDismiss={this.modalsOff}/>
      case 'saveFile':
        return <SaveFile key="saveFile" onDismiss={this.modalsOff}/>
      case 'clone':
        return <Clone key="clone" onDismiss={this.modalsOff}/>
      case 'restoreRevision':
        return <RestoreRevision key="clone" onDismiss={this.modalsOff}/>
      case 'editAssemblyStep':
        return <EditAssemblyStep key="editAssemblyStep" modalPath={this.props.modalPath} onDismiss={this.modalsOff}/>
      case 'editAssemblyGuideInfo':
        return <EditAssemblyGuideInfo key="EditAssemblyGuideInfo" modalPath={this.props.modalPath} onDismiss={this.modalsOff}/>
      default:
        return <div />;
    }
  }

  render() {
    return (
      <Modal>
        <Fade in={this.props.activeId !== null}>
          {this.modalSwitch(this.state.renderModalId)}
        </Fade>
      </Modal>
    );
  }
}


const mapStateToProps = state => {
  return {
    activeId: state.wevolverApp.modals.activeId,
    modalPath: state.wevolverApp.modals.modalPath,
    tree: state.wevolverApp.modals.tree
  }
}

export default connect(
  mapStateToProps,
)(Modals)
