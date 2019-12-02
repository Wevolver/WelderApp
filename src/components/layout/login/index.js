import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Button from '../../../components/elements/button'
import auth from '../../../modules/auth.js';


class Login extends Component {

  render () {
  return(
    <MainContainer style={{padding: 0, maxWidth: 'none'}}>
      <div className="wrapper" style={{maxWidth: 420, textAlign: 'center'}}>
        <div style={{margin:'auto', display: 'inline-block'}}>
        <Button
          onClick={() => auth.login()}
          typeClass=""
          label="SIGNUP / LOGIN"
          loading={false}
        />
        </div>
      </div>
    </MainContainer>
    )
  }
}

export default Login
