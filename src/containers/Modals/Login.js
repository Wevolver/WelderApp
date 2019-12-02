
import { connect } from 'react-redux'

import LoginModal from '../../components/modals/login'

import {
  login,
  resetPassword,
  unsetCommentBuffer,
  setModalId } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.login,
    isRunning: state.wevolverApp.auth.isRunning,
    follow: state.wevolverApp.project.followBuffer,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  login: () => dispatch(login()),
  resetPassword: () => dispatch(resetPassword()),
  switchModal: (index) => dispatch(setModalId(index)),
  unsetCommentBuffer: () => dispatch(unsetCommentBuffer()),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginModal)
