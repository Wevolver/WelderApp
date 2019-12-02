import React, { Component } from 'react';
import Image from '../elements/ironImage'
import { Link } from 'react-router-dom'
import moment from 'moment'
import BookmarkButton from '../../containers/BookmarkButton'

class SearchHomeTile extends Component {
  render() {
    const {
      result,
      index
    } = this.props
    return (
      <div>
        <div className="home-search-page-card">
          {result &&
            <div className="search-page-item-container home">
              <a href={`https://wevolver.com/${result.user_slug}/${result.slug}/master/tree`}>
                <div className="search-page-item-avatar home">
                  <Image srcLoaded={result.picture.source} noTrackVisibility/>
                </div>
              </a>

              <div className="search-page-card-content" style={{paddingLeft: 0, paddingRight: 0}}>
                <div>
                <div className="search-page-card-title-bar">

                  <Link
                    to={`${result.user_slug}/${result.slug}/master/tree`}
                    className="ellipsis search-page-title"
                  >
                    <b title={result.name}>
                      {result.name}
                    </b>
                  </Link>

                  <div
                    style={{
                      marginTop: 2,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {false &&
                      <BookmarkButton
                        isFollowing={result.bookmarked}
                        projectOid={result._id.$oid}
                        count={result.bookmark_count || 0}
                        square
                      />
                    }
                  </div>
                </div>
                </div>
                <div className="search-page-card-date">
                  <span className="ellipsis" title={result.university}>
                    {moment(result.created_at ? result.created_at.$date : Date.now()).format("DD MMM YYYY")} - {result.university}
                  </span>
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
              <div className="search-page-textline-placeholder last" />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchHomeTile;
