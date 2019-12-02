import React, { Component } from 'react'
import Select from 'react-select';
import { toast } from '../../../modules/toast'

export default class RenderSelectInput extends Component {
  onChange(event) {
      if (this.props.input.onChange && event != null) {
         if(!this.props.multi){
           this.props.input.onChange(event);
         } else if (event.value) {
           this.props.input.onChange(event.value);
         } else {
            if(event.length > 5){
              toast("error","Projects are limited to 5 tags")
              return false
            }
           this.props.input.onChange(event);
         }
      } else {
        this.props.input.onChange(null);
      }
  }

 render() {
  const { input, options, name, multi, id, ...custom } = this.props;
  return (
   <Select
    {...input}
    {...custom}
    id={id}
    name={name}
    options={options}
    value={this.props.input.value || ''}
    onBlur={() => this.props.input.onBlur(this.props.input.value)}
    onChange={this.onChange.bind(this)}
    isMulti={multi}
    isClearable={false}
    classNamePrefix="tags-select-box"
    className="tags-select-box"
   />
  );
 }
}
