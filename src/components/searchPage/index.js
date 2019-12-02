import React, { Component } from 'react'
import './searchPage.css'
import ResultTile from './resultTile'

class SearchPage extends Component {

  componentWillMount = () => {
    const {
      page,
      pageResults,
      tags,
      isVisible
    } = this.props
    if(isVisible) {
      if(page === 1 && tags !== 'careables featured'){
        this.props.search(page, pageResults.next, tags)
      } else{
        this.props.search(page, pageResults.next, undefined, undefined, tags)
      }
    }
  }
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      page,
      isVisible,
      pageResults,
      tags
    } = nextProps
    if(isVisible && pageResults && pageResults.next && !pageResults.results) {
      if(tags !== 'careables featured'){
        this.props.search(nextProps.page, pageResults.next, tags)
      } else {
        this.props.search(page, pageResults.next, undefined, undefined, tags)
      }
    }
  }
  render() {
    const {
      pageResults,
      tags
    } = this.props
    if(!pageResults) return null
    let tiles = pageResults.results
    if(!tiles || tiles.constructor !== Array) tiles = [null,null,null,null,null,null,null,null,null]
    return (
      <div>
        <div className="search-page-container">
          {tiles && tiles.map((result, index) =>
            <ResultTile
              key={ result ? result.name + index : index}
              tag={tags}
              result={result}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
