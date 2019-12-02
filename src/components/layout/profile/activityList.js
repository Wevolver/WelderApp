import React, { Component } from 'react';
import './profile.css';

import ProjectItem from '../../../components/layout/profile/projectItem'
import Loader from '../../../components/elements/loader'
import Button from '../../../components/elements/button'
import ActivityItem from './activityItem'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

class ActivityList extends Component {
  state = {
    loading: false
  }
  componentWillMount = () => {
    const {
      getUsersComments,
      userSlug
    } = this.props
    getUsersComments(0, userSlug)
  }
  componentWillReceiveProps = (nextProps) => {
    if( this.props.activityPages.length !== nextProps.activityPages.length) {
      this.setState({loading: false})
    }
  }

  loadNextPage = () => {
    const {
      activityPages,
      userSlug,
      getUsersComments,
    } = this.props
    getUsersComments(activityPages.length, userSlug)
    this.setState({loading: true})
  }

  render() {
    const {
      activity,
      activityPages,
      user } = this.props
    const lastPage = activityPages ? activityPages.slice(-1) : []
    const lastPageLength = get(activity, lastPage) ? get(activity, lastPage).length : 0

    return (
        <div>
        <h3 style={{paddingBottom: '1rem', borderBottom: '1px solid #bdbdbd'}}> Activity </h3>
        <div className="box-body" style={{padding: 0}}>
        {activity && activityPages.map(page =>
          <React.Fragment key={`activity-${page}`}>
            {activity[page].map((comment, idx) => <ActivityItem comment={comment} key={`activity-${page}-${idx}`} user={user} idx={idx}/>)}
          </React.Fragment>
        )}
        {(activityPages.length < 2 && lastPageLength === 0) &&
          <div>
            <p>{user.name} doesn't have any recent activity.</p>
          </div>
        }
        {lastPageLength > 4 && <div style={{marginTop: 10, display: 'flex', justifyContent: 'center', marginBottom: 32}}>
          <Button
            label="More"
            onClick={this.loadNextPage}
            loading={this.state.loading}
          />
        </div>}
      </div>
      </div>
    );
  }
}

export default ActivityList;
