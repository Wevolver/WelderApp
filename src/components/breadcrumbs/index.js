import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './breadcrumbs.css';

class Breadcrumbs extends Component {

  render() {

    const {
      projectName,
      location
    } = this.props

    let crumbJoin = ""
    const breadCrumbs = location.folders.map((crumb, index) => {
      crumbJoin += `/${crumb}`
      const link = `/${location.userSlug}/${location.projectSlug}/${location.branch}/tree${crumbJoin}`
      return (<Link to={link}>
        <span style={{fontWeight: index + 1 === location.folders.length ? 600 : 400}}>{crumb}</span>
        <span className="crumb-separator">/</span>
      </Link>)
    })
    return (
      <div className="crumbs">
        <Link to={`/${location.userSlug}/${location.projectSlug}/${location.branch}/tree`}>
          <span style={{fontWeight: location.folders.length === 0 ? 600 : 400}}>{projectName}</span><span className="crumb-separator">{breadCrumbs.length > 0 && '/'}</span>
        </Link>
        {breadCrumbs}
      </div>
    );
  }
}

export default Breadcrumbs;
