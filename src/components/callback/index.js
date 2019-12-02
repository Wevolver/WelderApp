import React from 'react';
import { withRouter } from 'react-router';
import auth from '../../modules/auth'
import Loader from '../elements/loader'
import MainContainer from '../../components/layout/mainContainer'

function Callback(props) {
  auth.handleAuthentication().then(() => {
    const profile = auth.getProfile()
    const auth0User = {
      first_name: profile['https://wevolver.com/first_name'],
      last_name: profile['https://wevolver.com/last_name'],
      legacy_id: profile['https://wevolver.com/pk'],
      email: profile.email,
    }
    const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/'
    props.createAuthUser(auth0User)
    props.getAuthUser(profile)
    props.history.push(redirectUrl)
  });

  return (
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
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
           Verifying user information...
        </h1>
         <Loader />
        </div>
      </div>
    </MainContainer>
  );
}

export default withRouter(Callback);