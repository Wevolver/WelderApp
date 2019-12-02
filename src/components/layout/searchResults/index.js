import React, { Component } from 'react'
import SearchBox from '../../../containers/SearchResults/SearchBox'
import { Link } from 'react-router-dom'
import Loader from '../../elements/loader'
import Footer from '../footer/footer'

class SearchResults extends Component {

  componentDidMount = () => {
    const {
      onSiteSearchChange,
      match
    } = this.props
    const query = match.params.query || ''
    if(query) this.props.onSiteSearchChange(decodeURIComponent(query))
  }

  componentDidUpdate = (prevProps) => {
    const {
      onSiteSearchChange,
      match
    } = this.props
    const query = match.params.query || ''
    if(query && query !== prevProps.match.params.query) {
      this.props.onSiteSearchChange(decodeURIComponent(query))
    }
  }

  render () {
    const {
      siteSearchResults,
      match,
      siteSearchQueryLoading,
      siteSearchQueryNoResults
    } = this.props
    const query = match.params.query || ''
    let noResults = false
    if(query && siteSearchResults.length === 0) noResults = true
    return(
      <div>
        <div  style={{height: 20}}/>

        <div
          style={{
            maxWidth: 600,
            paddingLeft: 12,
            paddingRight: 12,
            margin: '32px auto'
          }}
        >
          <SearchBox query={decodeURIComponent(query)}/>
        </div>
        <div  style={{height: 20}}/>
        <div style={{
          maxWidth: 720,
          margin: 'auto',
          minHeight: '80vh',
          paddingBottom: 30,
          paddingLeft: 12,
          paddingRight: 12,
        }}>
        {siteSearchResults.map(result =>
          <div key={result.title}
            style={{
              display: 'flex',
              marginBottom: 32,
            }}
          >
            <div style={{
              height: 60,
              width: 100,
              backgroundColor: '#f7f9fa', 
              backgroundImage:  `url('${result.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flexShrink: 0,
            }} />
            <div
              style={{
                marginLeft: 24
              }}
            >
              <div><a href={result.link}><span dangerouslySetInnerHTML={{__html: result.html_title}} /></a></div>
              <div dangerouslySetInnerHTML={{__html: result.html_snippet.replace(/<br>/gm, '')}} />
            </div>
          </div>
        )}
        {siteSearchQueryNoResults &&
          <div>
            <div style={{marginBottom: 12}}>No results found for <b>{query}</b>.</div>
            <div style={{marginBottom: 6}}>Suggestions:</div>
            <ul style={{marginTop: 0}}>
              <li>Make sure that all words are spelled correctly.</li>
              <li>Try different keywords.</li>
              <li>Try more general keywords.</li>
            </ul>
          </div>
        }
        {siteSearchQueryLoading && 
          <div><Loader /></div>
        }
        </div>
        <Footer />
      </div>
    )
  }
}

export default SearchResults
