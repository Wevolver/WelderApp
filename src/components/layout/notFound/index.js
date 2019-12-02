import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Button from '../../../components/elements/button'
import { Link } from 'react-router-dom'

class NotFound extends Component {
  render () {
  return(
    <MainContainer>
      <div
        style={{
          height: 'calc(100vh - 120px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            width: '100%'
          }}
        >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          404: Not Found
        </h1>
        <Link to="/">
          <Button
            label="Go Back to Home"
            typeClass="action"
            style={{
              margin: 'auto'
            }}
          />
        </Link>
        </div>
      </div>
    </MainContainer>
    )
  }
}

export default NotFound
