import React, { Component } from 'react';
import './profile.css';

import MyProjectItem from '../../../components/layout/profile/myProjectItem'
import Loader from '../../../components/elements/loader'
import Button from '../../../components/elements/button'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

class ProjectFollowList extends Component {

  state = {
    page: 1
  }
  componentWillMount = () => {
    const {
      userSlug
    } = this.props
    this.props.getFollowedProjects(2, userSlug)
  }

  loadNextPage = () => {
    const {
      userSlug
    } = this.props
    const page = this.state.page + 2
    this.setState({page})
    this.props.getFollowedProjects(page * 2, userSlug)
  }

  render() {
    const {
      followed,
      isOwnProfile,
      auth,
      isAuthenticated,
      user
    } = this.props

    const endOfList = followed.results.length < this.state.page * 2

    const listProjects = followed.results.slice(0, this.state.page * 2).map((follow) => {
      return (
        <div key={get(follow, 'project._id.$oid')} className="profile-item-container">
          <MyProjectItem
            auth={auth}
            project={follow.project}
            noFollow={isAuthenticated}
            isOwnProfile={isOwnProfile}
          />
        </div>
      );
    });


    return (
      <div className="profile-projects-container">
        {listProjects}
        {(!followed.loading && (!listProjects || listProjects.length === 0)) &&
          <div>
            <p>
              {user.name} hasn't followed any projects yet.
            </p>
          </div>
        }
        {followed.loading && <Loader />}

        {!endOfList && !(followed.loading && listProjects.length < 1) && <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
          <Button
            label="More"
            onClick={this.loadNextPage}
          />
        </div>}

      </div>
    );
  }
}

export default ProjectFollowList;
