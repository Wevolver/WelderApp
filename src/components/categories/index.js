import React, { Component } from 'react'
import TagButton from '../elements/tag'
import { arraysEqual } from '../../modules/helpers'
import './tags.css'

class Categories extends Component {
  componentDidMount = () => {
    this.props.getCategories()
  }

  generateQuery = (tagName) => {
    return `?category=${tagName}`
  }

  render() {
    const {
      categories,
      loading
    } = this.props
    if (!categories || categories.length < 1) return null
    return (
      <div>
        <div className="Categories-container" style={{justifyContent: 'center'}}>
          <div className="Categories-title">Categories:</div>
          {categories && categories.length > 0 && categories.map((item) =>
            <TagButton key={item.name} subtle tag={{name: item.name}} query={this.generateQuery(item.name)} />
          )}
        </div>
      </div>
    );
  }
}

export default Categories;
