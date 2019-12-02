import React, { Component } from 'react'
import moment from 'moment'
import BookmarkButton from '../../../containers/BookmarkButton'
import ResultTile from '../../searchPage/resultTile'
import Loader from '../../../components/elements/loader'


class RelatedProjects extends Component {

  componentDidMount = () => {
    const {
      project,
      getRelatedProjects,
      related
    } = this.props
    const relatedTags = project.tags.length > 0 ? project.tags.map(element => element.name) : []

    if(!related) {
      getRelatedProjects(relatedTags, project.name)
    }
  }

  render () {
    const {
      related,
      project
    } = this.props
    return(
    <div style={{zIndex: 2}}>
      {related && related.length > 0 && <div className='related-projects'>
        <h3> Similar Projects </h3>
        <div className="related-results">
          {(related && typeof related === 'object') && related.map((result, index) =>
            result.name != project.name ?
            <ResultTile
              key={ result ? result.name + index : index}
              result={result}
              disableLazyLoading
            />
            :
            null
          )}
          </div>
        </div>}
          {!related && <Loader/>}
      </div>
    )
  }
}

export default RelatedProjects
