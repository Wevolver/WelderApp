import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Field, reduxForm, isDirty} from 'redux-form'
import ModalFrame from './base/modalFrame'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { toast } from '../../modules/toast';
import LinkIcon from '../icons/link'
import Button from '../elements/button'

class CloneModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    const {onDismiss} = this.props
  }

  render() {
    const {onDismiss, project} = this.props
    project.gitCloneUrl = "https://projects.wevolver.com/" + project.user_slug + '/' + encodeURI(project.name)

    return (<ModalFrame title="Clone" onDismiss={onDismiss}>
      <h3 className="clone-header">Clone to my computer</h3>
      <p>For having a copy on your local computer.</p>
      <p>You can browse the project's complete revision history, and download future changes from the original project by using
        <a href="https://www.welder.app/desktop"> Desktop Client</a>.</p>
      <div className='clone-buttons'>
        <a className='button yellow-button' href={"x-wevolver-client://openRepo/" + project.gitCloneUrl}>CLONE TO DESKTOP</a>
        <CopyToClipboard text={project.gitCloneUrl}>
          <Button
            onClick={() =>  toast("success","Your project\'s clone URL was copied to your clipboard")}
            icon={<LinkIcon fill={'white'}/>}
            square
          />
        </CopyToClipboard>
      </div>
    </ModalFrame>);
  }
}

export default CloneModal
