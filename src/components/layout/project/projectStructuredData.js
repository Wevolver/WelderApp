import React, { Component } from 'react'
import StructuredData from 'react-google-structured-data'
import moment from 'moment'


const ProjectStructuredData = ({ project }) => (
   <StructuredData
      type='TechArticle'
      data={{
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://wevolver.com/${project.user_slug}/${project.slug}/master/tree`,
        },
        "headline": `${project.name}`,
        "image": [
          `${project.picture ? project.picture.source : ''}`,
       ],
      "datePublished": `${moment(project.created_at).format("DD MMM YYYY")}`,
      "dateModified": `${moment(project.created_at).format("DD MMM YYYY")}`,
      "author": {
        "@type": "Person",
        "name": `${project.user_slug}`
      },
       "publisher": {
        "@type": "Organization",
        "name": "Wevolver",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wevolver.com/logo.png"
        }
      },
      "description": `${project.description}`
      }}
  />
);

export default ProjectStructuredData