import { connect } from 'react-redux'

import Login from '../../components/layout/login'

import {
  login,
  resetPassword,
  setModalId } from '../../actions/index'

const mapStateToProps = state => {
  return {
    formState: state.form.login,
    isRunning: state.wevolverApp.auth.isRunning,
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
  login: () => dispatch(login()),
  resetPassword: () => dispatch(resetPassword()),
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
