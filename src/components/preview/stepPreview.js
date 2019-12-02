import React, { Component } from 'react'
import Loader from '../elements/loader'
import Scene from './three'

class StepPreview extends Component {

  constructor(props) {
    super(props)
    this.state = {
      blobUrl: null
    }
  }
  componentDidMount = () => {
    this.stepToStlUrl()
  }

  stepToStlUrl = () => {
    fetch(this.props.src)
    .then(res => {
      console.log(res)
      return res.blob()
    })
    .then(blob => {
      let fd = new FormData();
      // let file = new File([blob], "blob")
      fd.append('file', blob);
      console.log(fd)
      return fetch('https://smelter.wevolver.com/smelt/step', {
        method: 'POST',
        body: fd,
        headers: {
          'Accept': 'application/json,  text/plain, */*',
        },
      })
    })
    .then(res => {
      return res.json()
    })
    .then(json => {
      const blob = new Blob([json], {type : 'text'});
      this.setState({ blobUrl: URL.createObjectURL(blob)})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        {this.state.blobUrl &&
        <div>
          <Scene
            type="stp"
            src={this.state.blobUrl}
          />
        </div>}
      </div>
    );
  }
}

export default StepPreview;
