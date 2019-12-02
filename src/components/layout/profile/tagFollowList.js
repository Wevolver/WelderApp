import React, { Component } from 'react';
import './profile.css';

import TagItem from '../../../components/layout/profile/tagItem'
import Tag from '../../../components/tags/tag'
import Loader from '../../../components/elements/loader'
import { Link } from 'react-router-dom'
import Button from '../../../components/elements/button'

class TagFollowList extends Component {

  constructor(props) {
    super(props);
    this.state = {unfollowed: [],  page: 1};
 }

  componentWillMount = () => {
    this.props.getFollowedProjects()
  }
  loadNextPage = () => {
    this.setState({page: this.state.page + 2})
  }
  render() {
    let {
      followed,
    } = this.props

    const addRemoved = (tag) => {
      let unfollowed = this.state.unfollowed
      if(unfollowed.indexOf('tag') < 0){
        unfollowed.push(tag)
      }
      this.setState({unfollowed: unfollowed});
    }

    let unfollowedTags = []
    for (let tag of this.state.unfollowed) {
      if(followed.indexOf(tag) < 0){
        unfollowedTags.push(tag)
      }
    }

    let tags = followed ? [...new Set(unfollowedTags.concat(followed))] : unfollowedTags

    const listTags = tags.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }).map((tag) => {
      return (tag && <TagItem key={tag.name} addRemoved={addRemoved} tag={tag} tagId={tag.name}/>);
    }).slice(0, this.state.page * 2);

    const endOfList = listTags.length < this.state.page * 2
    return (
      <div style={{marginTop: '36px'}}>
        {listTags}
        {(!listTags || listTags.length === 0) &&
          <div>
            <p>
            When you follow tags, they will show here.
            <br/>
            To help you get started, here are some popular tags you could follow:
            </p>
            <Tag key="robotic arms" tag={{name: ""}} tagId="robotic arms" tagComponent={<Link to={`/projects?tags=robotic+arms`}> <div className="small-tag">Robotic Arms</div> </Link>}/>
            <Tag key="biomimetics" tag={{name: ""}} tagId="biomimetics" tagComponent={<Link to={`/projects?tags=biomimetics`}> <div className="small-tag">biomimetics</div> </Link>}/>
            <Tag key="human-robot Interaction" tag={{name: ""}} tagId="human-robot interaction" tagComponent={<Link to={`/projects?tags=human-robot+interaction`}> <div className="small-tag">Human-Robot Interaction</div> </Link>}/>
            <Tag key="quadrupeds" tag={{name: ""}} tagId="quadrupeds" tagComponent={<Link to={`/projects?tags=quadrupeds`}> <div className="small-tag">quadrupeds</div> </Link>}/>
          </div>
        }
        {followed && followed.loading && <Loader />}

        {!endOfList && !(followed && followed.loading) && <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
          <Button
            label="More"
            onClick={this.loadNextPage}
          />
        </div>}
      </div>
    );
  }
}

export default TagFollowList;
