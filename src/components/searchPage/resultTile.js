import React, { Component } from 'react';
import Image from '../elements/ironImage'
import { Link } from 'react-router-dom'
import moment from 'moment'
import BookmarkButton from '../../containers/BookmarkButton'
import Tag from '../../containers/Tags/Tag'

const tagBlackList = ["careables","robotics", "featured", "staff pick", "wearable", "careables featured"]
function filterTags(tags) {
  if(!tags || !(tags instanceof Array)) return []
  return tags.filter(tag => tag && tagBlackList.indexOf(tag.name) < 0);
}

class ResultTile extends Component {
  render() {
    const {
      result
    } = this.props
    return (
      <div className='search-page-card-container'>
        <div className="search-page-card">
          {result &&
            <div className="search-page-item-container">
              <Link to={`/${result.user_slug}/${result.slug}/master/tree`}>
                <div className="search-page-item-avatar">
                  <Image tileImage noTrackVisibility={this.props.disableLazyLoading} srcLoaded={result.picture.source} />
                </div>
              </Link>

              <div className="search-page-card-content">
                <div>
                <div className="search-page-card-title-bar">
                  <Link to={`/${result.user_slug}/${result.slug}/master/tree`} className="ellipsis search-page-title"><b title={result.name}>{result.name}</b></Link>
                  <div style={{marginTop: 2, flexShrink: 0, display: 'flex', alignItems: 'center'}}>
                    <BookmarkButton isFollowing={result.bookmarked} projectOid={result._id.$oid} count={result.bookmark_count || 0} square/>
                  </div>
                </div>
                {result.description &&
                  <div>
                    {result.description.slice(0, 150)}
                    {(result.description.length < 150) && (result.description.substr(-1) !== "." ? '. ' :  ' ')}
                    {result.description.length > 150 && '... '}
                    <span className="search-page-card-more hidden-in-large"><Link to={`/${result.user_slug}/${result.slug}/master/tree`}>more</Link></span>
                  </div>
                }
                </div>
                <div>
                <div style={{marginTop: 6}}>
                  {
                    result &&
                    filterTags(result.tags).slice(0,5).map(tag =>
                    <Tag
                      key={tag.name}
                      tagId={tag.name}
                      span={tag.followCount}
                      tagComponent={<Link to={`/projects?tags=${tag.name}`}>
                        <div className="small-tag-black">{tag.displayName || tag.name}</div>
                      </Link>}
                      />
                    )
                  }
                </div>
                <div className="version3-about">
                {result.version === "3" &&
                    <span className="ellipsis" title={result.university}>
                      {moment(result.created_at ? result.created_at.$date : Date.now()).format("DD MMM YYYY")} - {result.university}
                    </span>
                }
                </div>
                </div>
              </div>
            </div>
          }
          {!result &&
            <div className="search-page-item-container">
              <div className="search-page-item-avatar">
                <Image srcLoaded={''} />
              </div>
              <div className="search-page-textline-placeholder" />
              <div className="search-page-textline-placeholder" />
              <div className="search-page-textline-placeholder last" />

            </div>
          }

        </div>
      </div>
    );
  }
}

export default ResultTile;
