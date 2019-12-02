import React, { Component } from 'react'
import TagButton from '../elements/tag'
import { arraysEqual } from '../../modules/helpers'
import Tag from '../../containers/Tags/Tag'
import { Link } from 'react-router-dom'
import { API } from '../../constants/api'

import './tags.css'

class Tags extends Component {

  constructor(props) {
   super(props);
   this.state = {};
  }

  componentDidMount = () => {
    const {
      searchTags,
      getTags,
      getCategories
    } = this.props
    this.props.getTags(this.generateQuery(searchTags[0]))
    this.props.getCategories()
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      searchTags,
      location
    } = nextProps
    let params = ""
    if(window.URLSearchParams){
      params = new URLSearchParams(location.search)
    }
    const category = params !== '' ? params.get('category') || '' : ''
    if(category !== ''){
      var searchedCategory = nextProps.categories.find(function(element) {
        return element.name === category ;
      });
    }

    if((!category || category === '') && nextProps.related && !arraysEqual(nextProps.related, this.props.related)){
      let relatedPromsises = nextProps.related.map(tag =>
        this.getSearchTags(tag.name).then(val => {
          return val[0]
        })
      )
      this.getRelatedTags(relatedPromsises)
    }
    if((category || category !== '') && searchedCategory){
      let relatedPromsises = searchedCategory.relatedTags.map(tag =>
        this.getSearchTags(tag).then(val => {
          return val[0]
        })
      )
      this.getRelatedTags(relatedPromsises)
    }
    if(!arraysEqual(searchTags, this.props.searchTags)){
      var relatedSearch = this.generateQuery(searchTags[0])
      this.props.getTags(relatedSearch)
    }
  }

  generateQuery = (tagName) => {
    let new_params = `?tags=${tagName.name ? tagName.name.replace(' ', '+') : tagName.replace(' ', '+')}`
    return new_params
  }

  getRelatedTags = (tags) => {
    Promise.all(tags).then(function(results) {
      this.setState({related: results});
    }.bind(this))
  }

  getSearchTags = (searchTag) => {
    let url = `${API.apiUrlV2}/tags?options=${searchTag.name || searchTag}`
    return fetch(url).then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      return responseJson
    })
  }

  render() {
    const {
      related,
      searchTags,
      location,
      categories,
      loading
    } = this.props

    let params = ""
    if(window.URLSearchParams){
      params = new URLSearchParams(location.search)
    }
    const category = params !== '' ? params.get('category') || '' : ''
    if(category !== ''){
      var searchedCategory = categories.find(function(element) {
        return element.name === category ;
      });
    }
    const mainClass = "Tags"
    return (
      <div className={mainClass}>
        {(category || category !== '') && searchedCategory &&
          <div className={loading ? "Tags-container loading" : "Tags-container"}>
            {(this.state.related && this.state.related.length > 0 && this.state.related[0] ) && this.state.related.map(tag =>{
              if(!tag) return null
              return(
              <div key={tag.name}>
               {
                 <Tag
                   tagId={tag.name}
                   span={tag.followCount}
                   tagComponent={<Link to={`/projects?tags=${tag.name}`}>
                     <div className="button-main Tag">{tag.displayName || tag.name}</div>
                   </Link>}
                 />
               }
              </div>
              )
            })}
          </div>
        }

        {
         (!category || category === '') && searchTags && searchTags.length < 3 &&
         <div className={loading ? "Tags-container loading" : "Tags-container"}>
           {(this.state.related && this.state.related.length > 0 && this.state.related[0]) && this.state.related.map(tag =>{
            if(!tag) return null
              return(
             <div key={tag.name}>
              {searchTags && searchTags.indexOf(tag.name) < 0 &&
                <Tag
                  tagId={tag.name}
                  span={tag.followCount}
                  tagComponent={<Link to={`/projects?tags=${tag.name}`}>
                    <div className="button-main Tag">{tag.displayName || tag.name}</div>
                  </Link>}
                />
              }
             </div>
             )}
           )}
         </div>
        }
      </div>
    );
  }
}

export default Tags;
