import React, { Component } from 'react';
import loadable from '@loadable/component'
const QuillEdit = loadable(() => import('../../editor/quillEdit'))

export default class QuillField extends Component {
  componentDidMount() {
    if(this.props.autofocus)this._input.focus();
  }

  render() {
    const {
      input,
      label,
      labelStyle,
      meta
    } = this.props;
    return (
      <div>
        {label &&
          <div className="text-input-label" style={labelStyle}>
            {label}
            <span className="text-input-error">
             {(meta && meta.touched) && meta.error && <div>- {meta.error}</div>}
            </span>
          </div>
        }
        <QuillEdit
          textfield
          toolbarButtons={[
            'bold', 'italic', {'list': 'ordered'}, {'list': 'bullet'},
            'link', 'image'
          ]}
          model={input.value}
          onBlur={event => {
              input.onBlur(event);
            }
          }
          onFocus={event => {
              input.onFocus(event);
            }
          }
          handleModelChange={(model) => input.onChange(model)}
        />
      </div>
    );
  }
}
