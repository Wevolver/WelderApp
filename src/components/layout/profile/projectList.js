import React, { Component } from 'react';
import './profile.css';

import MyProjectItem from '../../../components/layout/profile/myProjectItem'
import Loader from '../../../components/elements/loader'
import Button from '../../../components/elements/button'
import { Link } from 'react-router-dom'

class ProjectList extends Component {

  state = {
    page: 1
  }
  componentWillMount = () => {
    const userSlug = this.props.match.params.userSlug
    this.props.getUserProjects(userSlug, 2)
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      match,
      isAuthenticated } = nextProps

    const nextUser = nextProps.match.params.userSlug
    const currentUser = this.props.match.params.userSlug || ""

    if(nextUser !== currentUser) {
      this.props.getUserProjects(nextUser, 2)
    }
  }

  loadNextPage = () => {
    const page = this.state.page + 2
    this.setState({
      page
    })
    const userSlug = this.props.match.params.userSlug
    this.props.getUserProjects(userSlug, page * 2)
  }

  render() {
    const {
      projects,
      isOwnProfile,
      auth,
      openModal,
      isAuthenticated
    } = this.props
    const endOfList = projects.results.length >= projects.totalCount
    const listProjects = projects.results.slice(0, this.state.page*2).map((project) => {
      return (
        <MyProjectItem
          key={project._id.$oid}
          auth={auth}
          project={project}
          noFollow={isAuthenticated}
          isOwnProfile={isOwnProfile}
        />
      );
    });
    const hasProjects = listProjects.length > 0
    return (
      <div>
        {(hasProjects || (!hasProjects && isOwnProfile)) &&
        <React.Fragment>
        <h3 style={{paddingBottom: '1rem', borderBottom: '1px solid #bdbdbd'}}> My Projects </h3>
          <div className="box-body" style={{paddingLeft: 0, paddingRight: 0}}>
            {isOwnProfile &&
              <div className="hidden-in-small" style={{marginBottom: 24, marginLeft: -4}}>
                <Link to={"/create/"}>
                  <button className="button-main action">
                    <span style={{marginBottom: 3, display: 'block'}}> Create a New Project</span>
                  </button>
                </Link>
              </div>
            }
            {listProjects}
          </div>
        </React.Fragment>
        }
        {projects.loading &&
          <Loader/>
        }
        {(!endOfList && hasProjects) && <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
          <Button
            label="More"
            onClick={this.loadNextPage}
            disabled={projects.loading}
          />
        </div>}
      </div>
    );
  }
}

export default ProjectList;
