import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Mailchimp from '../../elements/mailchimp'
import Footer from '../footer/footer'

import './create.css'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render () {
    const email = this.props.auth.email
    return(
      <MainContainer>
        <div className="main-page-title" style={{paddingBottom: 16}}>
          <h1 style={{textAlign: 'center'}} id="site-content">Submit Content</h1>
        </div>
        <div className="wrapper" style={{width: '100%', maxWidth: 420, margin: 'auto'}}>
          <div>
            <h3>We bring the state of the art in engineering to a global community.</h3>
            <p>
              The Wevolver platform and social media feeds reach over 9.1 Million people per month.
            </p>
            <p style={{marginBottom: 0}}>
              If you have innovative technology that you'd like to share on Wevolver, then we'd love to hear from you.
            </p>
          </div>
          <Mailchimp
            action="https://wevolver.us2.list-manage.com/subscribe/post?u=b9b8a21a2438fd4fbe17aa6a9&amp;id=c335613675"
            email={email}
            fields={[
              {
                name: 'NAME',
                placeholder: 'Your Name',
                type: 'text',
                required: true
              },
              {
                name: 'EMAIL',
                placeholder: 'Your Email',
                type: 'email',
                required: true
              },
              {
                name: 'ABOUT',
                placeholder: 'Tell us about your work and why you would like to connect.',
                required: true,
                type: 'text',
                fieldType: 'textarea',
              }
            ]}
          />
        </div>
        <Footer/>
      </MainContainer>
    )
  }
}

export default Create
