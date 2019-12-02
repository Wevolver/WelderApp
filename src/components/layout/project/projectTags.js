import React, { Component } from 'react'
import Tag from '../../../containers/Tags/Tag'
import { Link } from 'react-router-dom'

const tagBlackList = ["robotics", "featured", "staff pick", "wearable", "careables featured"]
function filterTags(tags) {
  if(!tags || !(tags instanceof Array)) return []
  return tags.filter(tag => tag && tagBlackList.indexOf(tag.name) < 0);
}

const ProjectTags = ({ tags }) => (
   <React.Fragment>
      {filterTags(tags).map(tag =>
        <Tag
          tagId={tag.name}
          key={tag.name}
          span={tag.followCount}
          tagComponent={<Link to={`/projects?tags=${tag.name}`}>
            <div className="small-tag">{tag.displayName || tag.name}</div>
          </Link>}
        />
      )}
    </React.Fragment>
);

export default ProjectTags
