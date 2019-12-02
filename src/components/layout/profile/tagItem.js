import FollowTagButton from '../../../containers/FollowTagButton'
import Tag from '../../../containers/Tags/Tag'
import React, { Component } from 'react';
import './profile.css';


import { Link } from 'react-router-dom'

class TagItem extends Component {
  render() {
    let tag = this.props.tag
    let tagId = this.props.tagId
    let tagCount = this.props.tagCount
    return (
      <div className="tag-item-container">
        <div className="testing" style={{width: 'calc(100% - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Link to={`/projects?tags=${tagId}`}>
            <div className="small-tag">{tagId}</div>
          </Link>
          <FollowTagButton addRemoved={this.props.addRemoved} span={""} noCount={true} tag={tag} tagId={tagId}/>
        </div>
      </div>
    );
  }
}

export default TagItem;
