import React, { Component } from 'react';

import Modal from './modal'
import Subnavbar from '../../navbar/subNavbar'
import TextField from '../../elements/inputs/textField'
import Button from '../../elements/button'
import CrossIcon from '../../icons/cross'
import { CSSTransition } from 'react-transition-group'
// import Text from '../elements/inputs/text'
import './modal.css'

const required = value => value ? undefined : 'Required'

class ModalFrame extends Component {

  onClickDismiss = (e, title) => {
    const {
      onDismiss,
      cancelFollowProject,
    } = this.props;

    if(title === "Bookmark this project" && cancelFollowProject){
      cancelFollowProject()
    }

    if(onDismiss) onDismiss()
  }

  onClickModal = (e) => {
    e.stopPropagation()
  }

  render() {
    const {
      title,
      tabs,
      onTabSelect,
      wide,
      width,
      register,
      subtitle
    } = this.props

    let modalType = wide ? "modal-card wide" : "modal-card"
    modalType = register? "modal-card register" : modalType

    return (
        <div key="modal" className="modal-dismiss" onClick={(e) => this.onClickDismiss(e, title)}>
          <div className={modalType} style={{maxWidth: width || null}} onClick={this.onClickModal}>
            <Subnavbar tabs={tabs} onTabSelect={onTabSelect || {}} style={{padding: '0 32px'}}>
              <div>
                <h3 style={{margin: 0}}>{title}</h3>
                {subtitle && <div style={{marginTop: 8, marginRight: 42, textAlign: register ? 'center' : 'left'}}>{subtitle}</div>}
              </div>
              <Button
                // square
                style={{
                  position: 'absolute',
                  top: 28,
                  right: 18,
                }}
                icon={<CrossIcon />}
                onClick={(e) => this.onClickDismiss(e, title)}
                typeClass="subtle"
              />
            </Subnavbar>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
    );
  }
}

export default ModalFrame
