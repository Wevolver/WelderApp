import React, { Component } from 'react'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import ChevronLeftIcon from '../icons/chevron-left'
import ChevronRighIcon from '../icons/chevron-right'
import TrashIcon from '../icons/trash'
import CheckmarkIcon from '../icons/checkmark'
import QuillEditor from '../editor/quillEdit'
import loadable from '@loadable/component'

class EditableBulletPoint extends Component {


  addBullet = () => {
    this.props.onAddBullet(this.props.index + 1)
    this.props.onEdit(this.props.index + 1)
  }

  deleteBullet = () => {
    this.props.onDeleteBullet(this.props.index)
    this.props.onEdit(-1)
  }

  render() {
    const {
      bulletPoint,
      index,
      editingIndex
    } = this.props
    const editing = editingIndex === index
    const innerHtml = bulletPoint.html
    const indent = bulletPoint.indent
    return (
      <div onClick={() => this.props.onEdit(index)} style={{marginLeft: 30 * indent}}>
        <div className={!editing ? "bullet-wrapper bullet-wrapper-editor": "bullet-wrapper"}>
          <div className="bullet-icon">●</div>
          {!editing && !innerHtml && <div className="no-bullet-point">Insert bullet point here.</div>}
          {!editing && innerHtml &&
            <div
              dangerouslySetInnerHTML={{__html: innerHtml}}
            />
          }
          {editing &&
            <div style={{width: '100%'}}>
              <QuillEditor
                editing={true}
                toolbarButtons={['bold', 'italic', 'insertLink']}
                texfield
                isProjectEditor={false}
                selecAllOnFocus
                maxCharCount={350}
                model={innerHtml || ''}
                handleModelChange={(str) => this.props.onChange(str, index)}
              />
              <div style={{display: 'flex', marginTop: 5}}>
                <Button
                  loading={false}
                  style={{marginLeft: 0}}
                  label="add"
                  typeClass="default"
                  onMouseDown={this.addBullet}
                />
                <Button
                  square
                  label={<CheckmarkIcon fill="#ffffff"/>}
                  typeClass="default"
                  onMouseDown={() => this.props.onEdit(-1)}
                />
                <Button
                  square
                  icon={<ChevronLeftIcon fill="#ffffff"/>}
                  typeClass="default"
                  onMouseDown={() => this.props.onIndent(-1, index)}
                />
                <Button
                  icon={<ChevronRighIcon fill="#ffffff"/>}
                  square
                  typeClass="default"
                  onMouseDown={() => this.props.onIndent(1, index)}
                />
                <Button
                  icon={<TrashIcon fill="#ffffff"/>}
                  square
                  typeClass="default"
                  onMouseDown={this.deleteBullet}
                />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

EditableBulletPoint.defaultProps = {
  bulletPoint: {
    text: '',
    indent: 0
  }
}

export default EditableBulletPoint
