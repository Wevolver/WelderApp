import Geosuggest from 'react-geosuggest';
import React, { Component } from 'react'

class GeoSuggest extends Component {
  componentWillReceiveProps(nextProps) {
    if(this.props.input.value != nextProps.input.value) {
      this.refs.geosuggest.update(nextProps.input.value)
    }
  }
  render() {
    const {input, label, ...custom} = this.props
    return (
    <div>
  	  <div className="text-input-label">{label}</div>
      <div className="text-input-container">
  	  <Geosuggest
  	    ref="geosuggest"
        types={['(cities)']}
  	    initialValue={ input.value }
  	    onSuggestSelect={ (suggest) => {
          input.onChange(suggest.label)
         }
        }
        onChange={this.onChange}
        onBlur={this.onBlur}
  	    {...custom}

  	  />
      </div>
	   </div>
    )
  }
}

export default GeoSuggest
