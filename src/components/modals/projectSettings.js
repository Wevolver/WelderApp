 import React, { Component } from 'react';
import { Field, reduxForm, isDirty } from 'redux-form'
import { connect } from 'react-redux'

import ModalFrame from './base/modalFrame'
import ProjectSettingsForm from './forms/projectSettingsForm'
import ProjectMembersForm from './forms/projectMembersForm'

class ProjectSettingsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      attemptingDelete: false,
      selectedTab: 0
    }
  }

  componentWillMount() {
    const {
      getUser,
      project,
      getMembers

    } = this.props
    // getMembers(project)
    // getUser()
  }


  onSubmit = (data) => {
    const {
      onDismiss,
      editProject
    } = this.props
    editProject(data)
    this.setState({loading: true})
  }

  onDeleteAttempt = (event) => {
    event.preventDefault()
    this.setState({
      attemptingDelete: true
    })
  }

  onEditMembers = (payload) => {
    // console.log(payload)
    this.onSubmit({members: payload})
  }

  render() {

    const {
      handleSubmit,
      editProject,
      onDismiss,
      formState,
      loading,
      dirty,
      project,
      onSearchMembers,
      memberSearchResults,
      getMembers,
      members,
      authUser,
      getUserWithPk,
      users,
    } = this.props


    const {
      attemptingDelete,
      selectedTab
    } = this.state

    const tabs = [
      {title: "General", id: 0, selected: selectedTab === 0},
      {title: "Members", id: 1, selected: selectedTab === 1}
    ]
    return (
      <ModalFrame title="Project Settings" onDismiss={onDismiss} tabs={tabs} onTabSelect={(id) => {
          this.setState({selectedTab: id})
        }}>
      {selectedTab === 0 &&
        <ProjectSettingsForm {...this.props} />
      }
      {selectedTab === 1 &&
        <div>
          <ProjectMembersForm
            loading={loading}
            project={project}
            members={members}
            getUserWithPk={getUserWithPk}
            users={users}
            onEditMembers={this.onEditMembers}
            onSearchMembers={onSearchMembers}
            memberSearchResults={memberSearchResults}
            authUser={authUser}
          />
        </div>
      }
      </ModalFrame>
    );
  }
}

export default ProjectSettingsModal
