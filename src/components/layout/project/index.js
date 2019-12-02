import React, { Component } from 'react'
import NavigatingCommit from '../../../components/history/navigatingCommit'
import ProjectPreviewer from '../../../containers/Project/ProjectPreviewer'
import RelatedProjects from '../../../containers/Project/RelatedProjects'
import ProjectFooter from '../../../containers/Project/ProjectFooter'
import MainContainer from '../../../components/layout/mainContainer'
import ProjectTitle from '../../../containers/Project/ProjectTitle'
import ProjectMeta from '../../../containers/Project/ProjectMeta'
import ProjectStructuredData from './projectStructuredData'
import OverviewEdit from '../../../containers/OverviewEdit'
import Loader from '../../../components/elements/loader'
import TreeFixedTrigger from '../../../containers/Tree'
import ProjectBottomLinks from './projectBottomLinks'
import Comments from '../../../containers/Comments'
import 'react-toastify/dist/ReactToastify.css'
import Tag from '../../../containers/Tags/Tag'
import { toast } from '../../../modules/toast'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

import '../layout.css'
import './project.css'

class ProjectComponent extends Component {

  componentDidMount = () => {
    const {
      getProjectDetail,
      invalidateTree,
      getUser,
      project,
      match,
    } = this.props

    this.setLocationState(match.params)
    if(!(match.params.type === 'blob' && project)) {
      getProjectDetail(
        `${match.params.userSlug}/${match.params.projectSlug}`
      )
    }
    getUser(match.params.userSlug)
    invalidateTree()
  }

  setLocationState = (params) => {
    const {
      setCurrentLocationParams,
    } = this.props
    const folders = params.folderPath ? params.folderPath.split('/') : []
    let fileExtension = {type: null, editable: false}

    if(!params.type) {
      return this.props.redirect(`/${params.userSlug}/${params.projectSlug}/master/tree`)
    } else if(['master'].indexOf(params.branch) < 0 && ['blob', 'tree'].indexOf(params.type) < 0) {
      // redirect to v1 project if url doesn't match above conditions.
      const v1url = `https://v1.wevolver.com${window.location.pathname}`
      return window.location.replace(v1url)
    } else if (params.type === 'master' || params.branch === 'blob' || params.branch === 'tree') {
      return this.props.redirect(`/${params.userSlug}/${params.projectSlug}/${params.type}/${params.branch}/${params.folderPath}`)
    } else if (params.type === 'blob') {
      folders.pop()
      if(!params.folderPath) return this.props.redirect(`/${params.userSlug}/${params.projectSlug}/master/tree`)
      fileExtension.type = params.folderPath.split('.').pop().toLowerCase();
      switch(fileExtension.type){
        case 'md':
        case 'wevolver':
          fileExtension.editable = true
          break
        default:
          break
      }
    }

    setCurrentLocationParams({
      ...params,
      folders,
      fileExtension
    })
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      match,
    } = this.props

    if(nextProps.match &&
      (nextProps.match.params.folderPath !== match.params.folderPath ||
       nextProps.match.params.type !== match.params.type ||
        match.params.branch !== nextProps.match.params.branch)) {
      this.setLocationState(nextProps.match.params)
    }
    if(nextProps.match.params.userSlug !== match.params.userSlug || nextProps.match.params.projectSlug !== match.params.projectSlug) {
      this.props.getProjectDetail(
        `${nextProps.match.params.userSlug}/${nextProps.match.params.projectSlug}`
      )
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return true
  }

  render() {
    const {
      auth,
      user,
      project,
      openModal,
      location,
      match,
      getCommitDetails,
    } = this.props

    const onMaster = location.branch === 'master'
    let canCommit = project && project.members && project !== "nothing" && auth.isAuthenticated
    let isAdmin = false
    if(canCommit) {
      canCommit = false
      project.members.forEach(member => {
        if(auth.legacy_id && member.id && (member.id === auth.legacy_id)) canCommit = true
        const oid = get(member.id, '$oid')
        if(oid && oid === auth.user_id) canCommit = true
        if(oid && oid === auth._id) canCommit = true
        if(canCommit && member.permission === 1) isAdmin = true
      })
    }
    if(!project) {
      return(<div className="project-loader" style={{marginTop: 120}}><Loader /></div>)
    }
    return (
      <div style={{flex: 1}} className="flex-column">
        <ProjectMeta/>
        <ProjectTitle canCommit={canCommit && isAdmin} />
        <NavigatingCommit
          project={project}
          getCommitDetails={getCommitDetails}
          location={location}
        />
        <MainContainer>
          <div className="row" style={{minHeight: '100vh', top: -1}}>
            <TreeFixedTrigger canCommit={(canCommit && onMaster)} />
            {!match.params.folderPath && <OverviewEdit canCommit={canCommit} project={project}/>}
            {match.params.folderPath && <ProjectPreviewer canCommit={canCommit} match={this.props.match} />}
          </div>
        </MainContainer>
        <Comments />
        <ProjectFooter canCommit={canCommit}/>
        <RelatedProjects />
        <ProjectBottomLinks />
        <ProjectStructuredData project={project}/>
        <ReactTooltip border={true} type="light" effect="solid" place="bottom"  />
      </div>
    )
  }
}

export default ProjectComponent
