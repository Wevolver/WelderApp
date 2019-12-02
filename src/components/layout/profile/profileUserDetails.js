import React, { Component } from 'react'
import '../layout.css'
import './profile.css'
import Loader from '../../../components/elements/loader'
import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import get from 'lodash/get'

class ProfileUserDetails extends Component {

  componentWillMount() {
    const {
      userSlug
    } = this.props

    this.props.getUserProfile(userSlug)
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      match,
    } = nextProps

    const nextUser = nextProps.match.params.userSlug
    const currentUser = this.props.match.params.userSlug || ""

    if(nextUser !== currentUser) {
      this.props.getUserProfile()
    }
  }

  render() {
    const {user, auth, profile} = this.props
    const isOwnProfile = user && user.pk === auth.pk
    let bio = profile ? (profile.bio ? profile.bio : get(user, 'profile.bio')) : ''
    let hasBio = bio !== ''

    if(user && (bio === '' || !bio)){
      if(isOwnProfile){
        bio = <div style={{color: '#757575'}}>Write a bio
                <Link to={"/user-settings/" + auth.slug }>
                  <span> here</span>
                </Link>
              </div>
      } else {
        bio = <div style={{color: '#757575'}}>
                {user.name} hasn't written a bio yet
              </div>
      }
    }

    return(
      <div className="four columns">
        <h3 className="about-header" style={{paddingBottom: '1rem', borderBottom: '1px solid #bdbdbd'}}> About
            {isOwnProfile && hasBio &&
            <Link to={"/user-settings/" + auth.slug }>
              <button className="button-main">
                <span style={{marginBottom: 3, display: 'block'}}> Edit</span>
              </button>
            </Link>
            }
         </h3>
        <div className="about-section">
          {user && bio}
          {profile && profile.website && <a target="_blank" rel="noopener noreferrer" className="personal-website" href={profile && profile.website.startsWith('http') ? profile.website : "http://" + profile.website}>{profile && profile.website}</a>}
          {user &&
          <div className="social-icons">
          {profile && profile.instagram && <SocialIcon url={`https://www.instagram.com/${profile.instagram}`}></SocialIcon>}
          {profile && profile.facebook && <SocialIcon url={profile.facebook.startsWith('http') ? profile.facebook : "https://" + profile.facebook}></SocialIcon>}
          {profile && profile.linkedin && <SocialIcon url={profile.linkedin.startsWith('http') ? profile.linkedin : "https://" + profile.linkedin}></SocialIcon>}
          {profile && profile.twitter && <SocialIcon url={`https://www.twitter.com/${profile.twitter}`}></SocialIcon>}
          </div>
          }

          {!user && <Loader />}
        </div>
      </div>
    )
  }
}

export default ProfileUserDetails
