import { connect } from 'react-redux'

import RegisterModal from '../../components/modals/register'

import {
  setModalId,
  registerUser,
  cancelFollowProject,
  unsetCommentBuffer
 } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.userRegister,
    registering: state.wevolverApp.user.registering,
    auth: state.wevolverApp.auth,
    afterBookmark: state.wevolverApp.project.followBuffer,
    afterFollow: !!state.wevolverApp.auth.tags_followed_buffer,
    commenting: state.wevolverApp.project.commentBuffer,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  switchModal: (index) => dispatch(setModalId(index)),
  registerUser: () => dispatch(registerUser()),
  unsetCommentBuffer: () => dispatch(unsetCommentBuffer()),
  cancelFollowProject: () => dispatch(cancelFollowProject())
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterModal)
