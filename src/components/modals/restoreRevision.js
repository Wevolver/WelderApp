import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Field, reduxForm, isDirty} from 'redux-form'
import ModalFrame from './base/modalFrame'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { toast } from '../../modules/toast';
import moment from 'moment'
import Button from '../elements/button'


class RestoreRevisionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    const {onDismiss, location} = this.props
  }

  render() {
    const {onDismiss, project, location, revertCommit} = this.props
    const commitDetails = project[`history/${location.branch}`]

    return (<ModalFrame title="Restore This Revision" onDismiss={onDismiss}>
      <div className="restore-modal">
        <p>The state of your project will be restored to the revision from:</p>
        <b>{moment.unix(commitDetails[0].commit_time).format("MMMM Do YYYY [at] h:mm a")}</b>
        <p>All other revisions will be saved.</p>
      </div>
      <div className="modal-buttons">
        <Button
          typeClass="action"
          type="submit"
          onClick={() => revertCommit(location.branch)}
          label="Restore"/>
      </div>
    </ModalFrame>);
  }
}

export default RestoreRevisionModal
