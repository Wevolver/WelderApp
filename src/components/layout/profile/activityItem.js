import React, { Component } from 'react'
import moment from 'moment'
import Linkify from 'react-linkify';
import get from 'lodash/get'
import { Link } from 'react-router-dom'

const ActivityItem = ({comment, user}) => {
  const link = `/${get(comment, 'project_user_slug')}/${get(comment, 'project_slug')}/master/tree`
  return (
  <div className="comment-container">
        <div style={{display: 'flex'}}>
          <Link to={link}>
          {get(comment, 'project_picture.source') &&
            <div
              className="comment-image"
              style={{backgroundImage: `url('${get(comment, 'project_picture.source')}')`, borderRadius: 0}}
            />
          }
          {!get(comment, 'project_picture.source') &&
            <div
              className="comment-image"
              style={{background: "#424242", borderRadius: 0}}
            >
             {get(comment, 'project_name') ? get(comment, 'project_name').slice(0,1) : ''}
            </div>
          }
          </Link>
          <div>
            {get(comment, 'project_name') &&
            <div className="comment-name" style={{marginTop: -5}}>
            <Link to={link}>{get(comment, 'project_name')}</Link>
            <span style={{fontWeight: 400, color: '#757575', marginLeft: 8}}>{moment(get(comment, 'dateCreated.$date')).format("DD MMM")}, {get(user, 'name')} {comment.parentItem ? 'replied' : 'responded'}:</span>
            </div>}

            <div className="comment-text" style={{paddingLeft: 0, paddingTop: 5}}>
              <Linkify  properties={{target: '_blank'}}>{comment.text}</Linkify>
            </div>

            <div className="comment-reply-button" style={{paddingLeft: 0}}>
              <Link to={`${link}?c=${get(comment, '_id.$oid')}`}><div>Reply</div></Link>
            </div>
          </div>
        </div>
  </div>
)}

export default ActivityItem
