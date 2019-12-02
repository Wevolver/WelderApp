import React, { Component } from 'react'
import {Helmet} from "react-helmet"

const ProjectMeta = ({ project }) => {
  if (!project) {
    return null
  } else {
    return(
      <Helmet
        title={ project.name || ''}
      >
        <meta name="description" content={ project.description } data-react-helmet="true" />

          <meta itemprop="name" content={ project.name }/>
          <meta itemprop="description" content={ project.description }/>
          <meta itemprop="image" content={ project && project.picture && project.picture.source ? project.picture.source : "" }/>

          <meta name="twitter:card" content={ project.description }/>
          <meta name="twitter:title" content={ project.title }/>
          <meta name="twitter:description" content={ project.description ? project.description.substring(0, 199) : '' }/>
          <meta name="twitter:image:src" content={ project && project.picture && project.picture.source ? project.picture.source : "" }/>

          <meta property="og:title" content={ project.title } />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={"https://www.wevolver.com/" + project.user_slug + "/" + project.slug + "/master/"}/>
          <meta property="og:image" content={project && project.picture && project.picture.source ? project.picture.source : "" }  />
          <meta property="og:description" content={ project.description} />
          <meta property="og:site_name" content="Welder" />
          <meta property="article:published_time" content={ project.created_at} />
          <meta name="robots" content="noindex" data-react-helmet="true" />
      </Helmet>
    )
  }
};

export default ProjectMeta
