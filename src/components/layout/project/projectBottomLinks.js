import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ProjectBottomLinks = () => (
  <div className='project-links'>
    <Link to={"/"}>
      <div>Home</div>
    </Link>
    <Link to={"/projects"}>
      <div>Projects</div>
    </Link>
    <Link to={"/about"}>
      <div>About</div>
    </Link>
    <a style={{color: "#424242"}} href="https://www.wevolver.com?ref=welder" target="_blank">
      <span style={{color: "#424242", fontWeight: 600}} >
          Powered by <span style={{textDecoration: "underline"}}>Wevolver</span>
      </span>
    </a>
  </div>
);

export default ProjectBottomLinks