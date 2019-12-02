import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CrossIcon from '../../icons/cross'
import Button from '../button'
import './tag.css'


const TagButton = ({tag, query, subtle, careables}) => (
  <Link to={ careables ? `/careables${query}` : `/projects${query}`}>
    {subtle && <Button
      label={tag.displayName || tag.name}
      typeClass="subtle"
    />}
    {!subtle && <div className="button-main Tag">
      {tag.displayName || tag.name}
    </div>}
  </Link>
)

export default TagButton
