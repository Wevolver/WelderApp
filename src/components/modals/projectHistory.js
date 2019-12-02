import React, { Component } from 'react'
import ModalFrame from './base/modalFrame'
import CommitTable from '../history/commitTable'
import Button from '../elements/button'
import ChevronLeftIcon from '../icons/chevron-left'
import ChevronRightIcon from '../icons/chevron-right'

class ProjectHistoryModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  componentWillMount = () => {
    const {
      getProjectHistory
    } = this.props

    getProjectHistory(this.state.page)
  }

  getNextPage = () => {
    const {
      getProjectHistory
    } = this.props

    const nextPage = this.state.page + 1
    this.setState({ page: nextPage})
    getProjectHistory(nextPage)
  }

  getPreviousPage = () => {
    const {
      getProjectHistory
    } = this.props

    const nextPage = this.state.page - 1
    this.setState({ page: nextPage})
    getProjectHistory(nextPage)
  }

  onGoToCommit = () => {
    console.log('onGotToCommit')
    const {
      invalidateTree,
      closeModal
    } = this.props
    closeModal()
  }
  render() {
    const {
      onDismiss,
      commitHistory,
      selectedProject,
      location,
      fetchingHistory
    } = this.props
    const selectedId = location.branch === 'master' && commitHistory && this.state.page === 0 ? commitHistory[0].commit_id : location.branch
    const commitHistoryM1 = commitHistory ? commitHistory.slice(0, 6) : null
    return (
      <ModalFrame wide title="Project History" onDismiss={onDismiss}>
        <CommitTable
          commits={commitHistoryM1}
          selectedId={selectedId}
          selectedProject={selectedProject}
          onCommitSelect={this.onGoToCommit}
          getNextPage={this.getNextPage}
          getPreviousPage={this.getPreviousPage}
          location={location}
          loading={fetchingHistory}
        />
        {commitHistoryM1 && 
          <div style={{margin: 'auto', width: 108}}>
            <div style={{display: 'flex', margin: 'auto'}}>
              <Button 
                disabled={this.state.page < 1 || fetchingHistory}
                loading={false}
                square
                icon={<ChevronLeftIcon stroke={this.state.page < 1 || fetchingHistory ? "#ddd" : "#424242"}/>}
                onClick={this.getPreviousPage}
              />
              <Button 
                disabled={true}
                loading={false}
                icon={this.state.page + 1}
              />
              <Button 
                disabled={commitHistory.length < 7 || fetchingHistory}
                loading={false}
                square
                label={<ChevronRightIcon stroke={commitHistory.length < 7 || fetchingHistory ? "#ddd" : "#424242"}/>}
                onClick={this.getNextPage}
              />
            </div>
          </div>
        }
      </ModalFrame>
    )
  }
}


export default ProjectHistoryModal