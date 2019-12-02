import React, { Component } from 'react'
import './discover.css'
import { Link } from 'react-router-dom'
import MainContainer from '../../../components/layout/mainContainer'
import Footer from '../footer/footer'
import SearchPage from '../../../containers/SearchPage'
import TrackVisibility from 'react-on-screen';
import Categories from '../../../containers/Categories'
import Tags from '../../../containers/Tags'
import FollowTagButton from '../../../containers/FollowTagButton'
import { API } from '../../../constants/api'

class Discover extends Component {

  constructor(props) {
   super(props);
   this.state = {};
 }

  componentDidMount = () => {
    const {
      categories
    } = this.props
    if(categories.length === 0){
      this.props.getCategories()
    }
  }

  getSearchTags = (searchTag) => {
    let url = `${API.apiUrlV2}/tags?options=${searchTag}`
    return fetch(url).then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      return responseJson
    })
  }

  render () {
    const {
      results,
      location,
      categories
    } = this.props
    const params = new URLSearchParams(location.search)
    const category = params.get('category') || ''
    let tags = params.get('tags') || ''
    let searchTags = tags.split(',').filter(n => n)
    let isCategory = false
    let relatedTags = []
    if(category !== '' && categories !== []){
      let selectedCategory = categories.find(function(element) {
        return element.name === category;
      });
      if(selectedCategory){
        searchTags = selectedCategory.searchTags
        relatedTags = selectedCategory.relatedTags
        isCategory = true
      }
      tags = searchTags.join(',')
    }

    if(!isCategory && searchTags[0] && (!this.state.followTag || this.state.followTag.name !== searchTags[0]) ){
      this.getSearchTags(searchTags[0]).then(val => {
        this.setState({followTag: val[0]});
      });
    }

    if(categories.length === 0 ) return null
    return(
      <MainContainer  style={{padding: 0}}>
      <div className="home-page">
      {!searchTags[0] &&
        <div className="main-page-title" style={{paddingBottom: 8}}>
          <h1 style={{textAlign: 'center', position: 'relative', fontWeight: 400, textTransform: 'none'}} id="site-content">
          Projects
          </h1>
          <p
            style={{
              textTransform: 'none',
              fontSize: 20,
              maxWidth: 400,
              margin: '20px auto',
            }}
          >Explore open projects from a global community of hardware engineers.</p>
        </div>
      }

      {searchTags[0] &&
        <div style={{marginBottom: 40, marginTop: 48, paddingLeft: 20}}>
          <div>
            {isCategory ? 'Category' : 'Tagged with'}
          </div>
          <div
          className="discover-search-header"
          style={{
            marginTop: 2,
            display: 'flex',
          }}>
            <h2 style={{ lineHeight: '42px', marginBottom: 0, textTransform: 'capitalize'}}>
              {this.state.followTag && (isCategory ? category : (this.state.followTag.displayName || this.state.followTag.name))}
              {!this.state.followTag && (isCategory ? category : searchTags[0])}
            </h2>
            {!isCategory && this.state.followTag && <div className="discover-follow-button"><FollowTagButton tagCount={this.state.followTag.followCount} tagId={this.state.followTag.displayName ? this.state.followTag.displayName.toLowerCase() :  this.state.followTag.name}/></div>}
          </div>
        {
        searchTags[0] && isCategory &&
        <div>
          <div style={{marginTop: 8}}>
            Tags
          </div>
          <div style={{marginTop: 2}}>
            <Tags searchTags={searchTags} />
          </div>
        </div>
        }
        </div>
      }

      {console.log(searchTags)}
      {(!searchTags || searchTags.length < 1) &&
      <div>
      <div className="faded-line"></div>
      <h3 className="featured-title" style={{ lineHeight: '42px', fontWeight: 400, textTransform: 'capitalize'}}> Featured Collection </h3>
      <div style={{maxWidth: '440px'}}>
        <Link to={`/careables`}>
          <div className="careables-collection">
            <img src="https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/careables-logo.png"></img>
            <h4> Design for care collection</h4>
            <a> View Projects </a>
          </div>
        </Link>
      </div>
      </div>
      }

      <div className="faded-line-reverse"></div>
      <h3 className="featured-title" style={{ lineHeight: '42px', fontWeight: 400, marginBottom: 0, textTransform: 'capitalize'}}> {(searchTags && searchTags[0]) ? "Projects": "Featured Projects"}</h3>


      {Object.keys(results).map((result, index) =>
        <TrackVisibility  offset={800} partialVisibility key={index}>
          {({ isVisible }) =>
            <SearchPage
              isVisible={isVisible}
              page={index + 1}
              tags={tags}
            />
          }
        </TrackVisibility>
      )}
    {
      searchTags[0] && !isCategory &&
      <div style={{paddingLeft: 20}}>
        <div style={{marginTop: 8}}>
          Related tags
        </div>
        <div style={{marginTop: 2}}>
          <Tags searchTags={searchTags} />
        </div>
      </div>
    }
      <Footer/>
      </div>
      </MainContainer>
    )
  }
}

export default Discover
