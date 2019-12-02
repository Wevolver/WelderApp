import React, { Component } from 'react'

import TextField from '../../elements/inputs/textField'
import Button from '../../elements/button'
import debounce from 'lodash.debounce';
import UserItemSettings from '../../user/userItemSettings'
import ChevronLeftIcon from '../../../components/icons/chevron-left'
import get from 'lodash/get'

class ProjectMembersForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      adding: false
    }
    this.onSubmit = debounce(this.onSubmit, 200)
  }

  onSearch = (event) => {
    event.persist();
    this.setState({ search: event.target.value})
    this.onSubmit()
  }

  onSubmit = (data) => {
    const {
      onSearchMembers
    } = this.props
    if(this.state.search.length > 1) onSearchMembers(this.state.search)
  }

  onAddMember = (selected) => {
    const {
      onEditMembers
    } = this.props

    const oldMembers = this.props.project.members || []
    const editedMembers = [...oldMembers, {
      id: get(selected, '_id.$oid'),
      permission: 0,
      email: selected.email,
    }]
    this.setState({
      adding: false,
    })
    onEditMembers(editedMembers)
  }

  onEditMember = (edited) => {
    const {
      onEditMembers
    } = this.props
    const oldMembers = this.props.project.members
    const editedMembers = oldMembers.map(oldMember => {
      if(oldMember.id === edited.id) {
        oldMember.permission = edited.permission
        oldMember.deleted = edited.deleted || undefined
      }
      return oldMember
    })
    onEditMembers(editedMembers)
  }

  render() {
    const {
      memberSearchResults,
      project,
      members,
      getUserWithPk,
      users,
      authUser
    } = this.props
    let authUserInList = false
    const memberList = project ? project.members || [] : []
    memberList.forEach(member => {
      if (member.id.$oid === authUser.user_id && member.permission === 1) authUserInList = true
    })
    return (
      <div>
        <div style={{paddingBottom: 12, display: 'flex', justifyContent: this.state.adding ? 'flex-start' :'flex-end'}}>
          <Button
            // style={{background: 'grey'}}
            disabled={!authUserInList}
            style={{margin: 0}}
            typeClass={this.state.adding ? null : 'action'}
            onClick={() => this.setState({adding: !this.state.adding})}
            label={this.state.adding ? 'Cancel' : 'Invite'}
          />
        </div>
        {!this.state.adding && memberList.map(result =>
          <div>
            {result.deleted !== true && <UserItemSettings
              user={result}
              key={result.pk}
              getUserWithPk={getUserWithPk}
              users={users}
              disabled={!authUserInList || result.id === authUser.user_id || (result.id.$oid && result.id.$oid === authUser.user_id)}
              onEditMember={this.onEditMember}
            />}
          </div>
        )}
        {this.state.adding &&
          <div>
            <TextField input={{onChange: this.onSearch}} />

            {memberSearchResults.map(result =>
              <UserItemSettings
                disabled={project.members.map(function(e) { return e.id; }).indexOf(result.pk) > -1}
                user={result}
                onAddMember={this.onAddMember}
                key={result.pk}
              />
            )}
          </div>
        }
      </div>
    )
  }
}

export default ProjectMembersForm
