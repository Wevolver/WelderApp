import React, { Component } from 'react'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import QuillEditor from '../editor/quill'
import {exctractYoutubeVideoId} from '../../modules/helpers'


class AssemblyGuideStep extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selecteImageIndex: 0,
      hover: false,
    }
  }

  render() {
    const {
      index,
      step,
      editable
    } = this.props

    return (
      <div
        style={{
          position: 'relative',
          borderTop: '1px solid #bdbdbd',
          paddingBottom: 42
        }}
        onMouseEnter={()=>this.setState({hover: true})}
        onMouseLeave={()=>this.setState({hover: false})}
      >
        <h3>
          Step {index + 1} <span style={{fontWeight: 400}}>{step.stepName}</span>
        </h3>
        <div
          style={{
            display: 'flex'
          }}
        >
        {step.toggle !== 'video' &&
          <div
            style={{
              width: 330,
              flexShrink: 0,
            }}
          >
            {step.images && step.images[this.state.selecteImageIndex] && <div
              style={{
                backgroundImage: `url(${step.images[this.state.selecteImageIndex].source})`,
                width: 330,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 330 * 0.625,
              }}
            />}
            {!step.images[0] && <div
              className="no-media-placeholder"
            ><div>{index + 1}</div></div>}
            {step.images.length > 1 &&
              <div
                style={{
                  display: 'flex',
                  marginTop: 8,
                }}
              >
                {[0,1,2].map((index) =>
                  <div
                    style={{
                      backgroundImage: `url(${step.images[index] ? step.images[index].source : null})`,
                      width: step.images[index] ? 106 : 0,
                      marginRight: (index < 2 && step.images[index]) ? 6 : 0,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: 106 * 0.625,
                    }}
                    onMouseEnter={() => {if(step.images[index])this.setState({ selecteImageIndex: index })}}
                  />
                )}
              </div>
            }
          </div>
        }
        {step.toggle === 'video' &&
          <div style={{position: 'relative', width: 330, flexShrink: 0, minHeight: 206}}>
            <div className="no-media-placeholder">{index + 1}</div>
            {step.video && <iframe
              width="330"
              height="206"
              style={{position: 'absolute', top: 0, left: 0}}
              src={`https://www.youtube.com/embed/${exctractYoutubeVideoId(step.video)}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>}
          </div>
        }
        <div>
          {step.bulletPoints && step.bulletPoints.map((point, index) =>
            <div key={index} className="bullets-and-images-wrapper" style={{marginLeft: 30 * (point.indent + 1)}}>
            <div className="bullet-wrapper">
            {point.html && <div className="bullet-icon">●</div>}
            {point.html &&
              <QuillEditor
                editing={false}
                value={point.html || ''}
                onChange={(str) => null}
              />
            }
            </div>
            </div>
          )}
        </div>
        </div>
        {this.state.hover &&
            <div
            style={{
              position: 'absolute',
              top: 30,
              right: 0,
            }}
          >
            {editable && <Button
              label="Edit"
              typeClass="default"
              onClick={() => this.props.onEdit(index) }
            />}
          </div>
        }
      </div>
    )
  }
}

export default AssemblyGuideStep
