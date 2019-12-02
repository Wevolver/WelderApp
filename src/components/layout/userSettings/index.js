import React, { Component } from 'react'
import '../layout.css'
import './userSettings.css'

import MainContainer from '../../../components/layout/mainContainer'
import { Field, reduxForm, isDirty, change } from 'redux-form'
import SubNavbar from '../../../components/navbar/subNavbar'
import Button from '../../../components/elements/button'
import Loader from '../../../components/elements/loader'
import TextField from '../../elements/inputs/textField'
import CheckboxField from '../../elements/checkbox'
import TextArea from '../../elements/inputs/textArea'
import Box from '../../../components/box/box'
import RadioField from '../../elements/radio'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { API } from '../../../constants/api'
import CrossIcon from '../../icons/cross'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import GeoSuggest from './geosuggest'
import withProtected from '../../../components/HOCs/withProtected'
import NotFound from '../../../components/layout/notFound'
import get from 'lodash/get'
import ReactS3UploaderInput from '../../elements/reactS3Uploader'

const isUrl = value =>
  value && !value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ? `Must be a valid URL` : undefined

const isInstagram = value =>
  value && !value.match(/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g) ? `Must be a valid Instagram handle` : undefined

const isLinkedin = value =>
  value && !value.match(/(ftp|http|https):\/\/?(?:www\.)?linkedin.com\/(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g) ? `Must be a valid LinkedIn url` : undefined
  
const isFacebook = value =>
  value && !value.match(/facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/g) ? `Must be a valid Facebook URL` : undefined

const isTwitter = value =>
  value && !value.match(/[A-z 0-9 _]+/g) ? `Must be a valid Twitter handle` : undefined

class UserSettings extends Component {

  componentWillMount() {
    const {
      getUserProfile,
      getUser
    } = this.props
    getUser(this.props.match.params.userSlug)
  }


  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if(get(nextProps.user, 'slug') !== get(this.props.user, 'slug') && get(nextProps.user, 'slug') === get(this.props.auth,'slug')) {
      this.props.getUserProfile()
    }
  }

  onSubmit = () => {
    const {
      auth,
      formState,
      editAuthUser
    } = this.props
    editAuthUser(auth.slug, formState.values)
    window.scrollTo(0, 0)
  }
  render() {

    const {
      match,
      auth,
      user,
      profile,
      formState,
      handleSubmit,
    } = this.props


    if(auth.slug !== match.params.userSlug) return <NotFound/>
    return (
      <div>
        <MainContainer style={{maxWidth: 800, margin: '96px auto'}}>
          <div className="row">
            <div className="twelve columns" id="site-content">
              <h1> Account Settings </h1>
              {
              <form className='user-settings-form' onSubmit={handleSubmit(this.onSubmit)}>
                <div>
                  <div className="picture-input-label">Picture</div>
                  <Field component={ReactS3UploaderInput} name="picture"/>
                </div>
                <Field name="bio" placeholder="Share a bit about yourself" component={TextArea} label="Bio" type="text" limit={1000}/>
                <Field name="profession" placeholder=" E.g. Mechanical Engineer" component={TextField} label="Profession" type="text"/>
                <Field name="location" placeholder="Location" component={GeoSuggest} label="Location"/>
                <Field name="website" placeholder="Personal website" component={TextField} label="Personal website" validate={[isUrl]} type="text"/>
                <Field name="twitter" placeholder="Twitter handle (without @)" component={TextField} label="Twitter handle" validate={[isTwitter]} type="text"/>
                <Field name="instagram" placeholder="Instagram handle (without @)" component={TextField} label="Instagram handle"validate={[isInstagram]} type="text"/>
                <Field name="linkedin" placeholder="E.g. linkedin.com/in/your-name" component={TextField} label="LinkedIn page"validate={[isLinkedin]} type="text" limit={120}/>
                <Field name="facebook" placeholder="E.g. facebook.com/your.name" component={TextField} label="Facebook page"validate={[isFacebook]} type="text"/>

                <p className="text-input-label">Notification settings</p>
                <Field
                  name="notify_toggle"
                  component={CheckboxField}
                  type="checkbox"
                  // value={false}
                  label={<div>Notify me when projects I follow are updated.</div>}
                />
                  <div className="modal-buttons">
                    <Button
                      disabled={formState && formState.syncErrors}
                      typeClass="action"
                      loading={auth.updating}
                      type="submit"
                      label="Update"/>
                  </div>
              </form>
              }
            </div>
          </div>
        </MainContainer>
      </div>
    )
  }
}

UserSettings = reduxForm({
  form: 'userSettings',
  enableReinitialize: true
})(UserSettings)


UserSettings = connect(
  (state, ownProps) => ({
    dirty: isDirty('projectSettings'),
    initialValues: {
      picture: ownProps.profile && ownProps.profile.picture ? ownProps.profile.picture : (ownProps.oldProfile) ? ownProps.oldProfile.picture : null,
      bio: ownProps.profile && ownProps.profile.bio && ownProps.profile.bio != ""  ? ownProps.profile.bio : (ownProps.oldProfile) ? ownProps.oldProfile.bio : null,
      website: ownProps.profile ? ownProps.profile.website: null,
      location: ownProps.profile ? ownProps.profile.location : null,
      profession: ownProps.profile ? ownProps.profile.profession: null,
      linkedin: ownProps.profile && ownProps.profile.linkedin && ownProps.profile.linkedin != ""  ? ownProps.profile.linkedin : (ownProps.oldProfile) ? ownProps.oldProfile.linkedin : null,
      twitter: ownProps.profile && ownProps.profile.twitter && ownProps.profile.twitter != "" ? ownProps.profile.twitter : (ownProps.oldProfile) ? ownProps.oldProfile.twitter : null,
      facebook: ownProps.profile && ownProps.profile.facebook && ownProps.profile.facebook != "" ? ownProps.profile.facebook : (ownProps.oldProfile) ? ownProps.oldProfile.facebook : null,
      instagram: ownProps.profile && ownProps.profile.instagram && ownProps.profile.instagram != "" ? ownProps.profile.instagram: (ownProps.oldProfile) ? ownProps.oldProfile.instagram: null,
      notify_toggle: ownProps.profile ? ownProps.profile.notify_toggle : (ownProps.oldProfile) ? ownProps.oldProfile.notify_toggle : null,
      accepts_cookies: ownProps.profile ? ownProps.profile.accepts_cookies: false,
      company_profile: ownProps.profile ? ownProps.profile.company_profile: false
    }
  }),
)(UserSettings)

export default withProtected(UserSettings)
