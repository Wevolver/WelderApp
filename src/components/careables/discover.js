import React, { Component } from 'react'
import '../layout/discover/discover.css'
import MainContainer from '../../components/layout/mainContainer'
import SearchPage from '../../containers/SearchPage'
import TrackVisibility from 'react-on-screen';
import Footer from '../layout/footer/footer'
import Tag from '../../containers/Tags/Tag'
import Tags from '../../containers/Tags'
import TagButton from '../elements/tag'
import { Link } from 'react-router-dom'
import ScrollMenu from "react-horizontal-scrolling-menu";
import ChevronRightIcon from '../icons/chevron-right'
import ChevronLeftIcon from '../icons/chevron-left'


class CareablesDiscover extends Component {


  render () {
    const {
      results,
      location
    } = this.props


    const params = new URLSearchParams(location.search)
    let searchTag = params.get('tags') || ''

    let generateQuery = (tagName) => {
      return `?tags=${tagName}`
    }

    const MenuItem = ({item, index}) => {
      return <div className="menu-item"><TagButton key={item.name} subtle tag={{name: item.name}} careables query={generateQuery(item.name)} /></div>
    };


    let careablesTags = [{"name": "learning/communication"}, {"name": "mobility"},
                        {"name": "outdoor installations"}, {"name": "indoor installations"},
                        {"name": "self care"}, {"name": "therapy"}, {"name": "daily living"},
                        {"name": "careware"}, {"name": "fun/leisure"} ]

    careablesTags = careablesTags.filter(function( obj ) {
      return obj.name !== searchTag;
    });

    let tags = 'careables featured'
    if(searchTag !== ''){
      tags = 'careables'
      tags += `,${searchTag}`
    }

    const menu = careablesTags.map((item, index) => {
      return <MenuItem item={item} key={item.name} index={index} />;
    });

    return(
      <React.Fragment>
      <div style={{marginBottom: '3rem'}} className="careables-header">
          <Link to={'/careables'}>
            <div className="img-wrapper">
            <img style={{cursor: 'pointer'}} src="https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/careables-logo.png"></img>
            </div>
          </Link>
          <div className='careables-header-text'>
            <h3 style={{fontWeight: 400}}>Design for care collection</h3>
            <p>Careables is an open and inclusive approach to healthcare for citizens based on digital fabrication, distributed manufacturing and collaborative making.</p>
            <a href="https://www.careables.org">www.careables.org</a>
          </div>
      </div>
      <MainContainer  style={{padding: 0}}>
      <div className="home-page">
        {searchTag &&
          <div> Tagged with:</div>
        }
      <div className=""><h1 style={{fontSize: 42, fontWeight: 700, textTransform: 'capitalize'}}>{searchTag}</h1></div>
      </div>
      { !searchTag &&
        <ScrollMenu
          data={menu}
          arrowLeft={<ChevronLeftIcon fill={'#007cc3'}/>}
          arrowRight={<ChevronRightIcon fill={'#007cc3'}/>}
          translate={1}
        />
      }

        {results.length > 0 && <div style={{marginTop: '2rem'}}> Latest projects:</div>}
        {Object.keys(results).map((result, index) =>
          <TrackVisibility  offset={1200} partialVisibility key={index}>
            {({ isVisible }) =>
              <SearchPage
              isVisible={isVisible}
              page={index + 1}
              tags={tags}
            />
          }
        </TrackVisibility>
      )}
      {searchTag &&
        <div> Other tags:</div>
      }
      <div className="Tags-container" style={{marginBottom: 48}} >
        { searchTag &&
        <Tag
          tagId={'name'}
          tagComponent={<Link to={`/careables`}>
            <div className="button-main Tag">Careables Featured</div>
          </Link>}
        />
      }
      { searchTag && careablesTags.map((tag, index) =>
        <Tag
          tagId={tag.name}
          span={tag.followCount}
          tagComponent={<Link to={`/careables?tags=${tag.name}`}>
            <div className="button-main Tag">{tag.name}</div>
          </Link>}
        />)
      }
      </div>
      </MainContainer>
      </React.Fragment>
    )
  }
}

export default CareablesDiscover
