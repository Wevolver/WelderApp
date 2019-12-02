import React, {Component} from 'react'
import UserRegisterForm from '../registerForm'

class Splash extends Component {

  render() {
    const {
      registerUser,
      formState,
      source,
      careables,
      registering } = this.props
    return (<section className="">
      <div className="wrapper" style={{width: '100%', maxWidth: 420}}>
        <h1 style={{marginBottom: 12}}>Sign Up</h1>
        {(source !== 'follow' && !careables) && <ol className="account-features">
          <li>1. Public projects are free forever</li>
          <li>2. A free 60 day trial of our Large plan for private projects </li>
          <li>3. No creditcard required</li>
        </ol>}
        <UserRegisterForm
          source={source}
          registerUser={registerUser}
          formState={formState}
          registering={registering}
        />
      </div>
    </section>)
  }
}

export default Splash
