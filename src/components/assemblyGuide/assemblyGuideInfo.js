import React, { Component } from 'react'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import ClockIcon from '../icons/clock'
import LinkIcon from '../icons/link'
import DifficultyIcon from '../icons/difficulty'
import QuillEditorComp from '../editor/quill'
import get from 'lodash/get'


class AssemblyGuideInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }

  render() {
    const {guide, isAuthenticated, project, auth} = this.props
    let canCommit = project && project.members && project !== "nothing" && isAuthenticated
    let isAdmin = false
    if(canCommit) {
      canCommit = false
      project.members.forEach(member => {
        if(auth.legacy_id && member.id && (member.id === auth.legacy_id)) canCommit = true
        const oid = get(member.id, '$oid')
        if(oid && oid === auth.user_id) canCommit = true
        if(oid && oid === auth._id) canCommit = true
        if(canCommit && member.permission === 1) isAdmin = true
      })
    }
    return (
      <div>
          {
            guide &&
            <div>
            <div class="under-guide-title" style={{ marginTop: 21, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {guide.info && guide.info.difficulty &&
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <DifficultyIcon width={18} height={18}/>
                  <p style={{margin: '0 0 0 5px'}}>Difficulty: </p>
                  <p style={{margin: '0 28px 0 5px'}}>{guide.info.difficulty.label} </p>
                </div>
              }
              {guide.info && guide.info.time &&
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <ClockIcon width={16} height={18}/>
                  <p style={{margin: '0 0 0 5px'}}>Hours Required: </p>
                  <p style={{margin: '0 0 0 5px'}}>{guide.info.time} </p>
                </div>
              }
            </div>
            {canCommit &&
            <Button
              label="Edit Guide Info"
              typeClass="action hidden-in-small"
              onClick={() => this.props.onEditGuideInfo() }
            />
            }
            </div>

            {guide.info && guide.info.components && Array.isArray(guide.info.components) &&
              <div style={{ marginTop: 21 }}>
                <b>Components</b>
                <table className="info-table">
                <tbody>
                {guide.info.components.map((component, index) => (
                  <tr>
                    <td className="first-column">
                       {component.url && <a target="_blank" href={component.url.indexOf( 'http' ) !== 0 ? "https://" + component.url : component.url}>{component.name} <LinkIcon size={12} fill={'#0277bc'}/></a>}
                       {!component.url && <span>{component.name}</span>}
                    </td>
                    <td className="second-column">
                      <span>{component.quantity && 'x'} {component.quantity}</span>
                    </td>
                  </tr>
                ))
                }
                </tbody>
                </table>
              </div>
            }
            {guide.info && guide.info.tools && Array.isArray(guide.info.tools) &&
              <div style={{ marginTop: 21, marginBottom: 42}}>
                <b>Tools and Fabrication Machines</b>
                <table className="info-table">
                <tbody>
                {guide.info.tools.map((tool, index) => (
                   <tr>
                    <td className="first-column">
                      {tool.url && <a target="_blank" href={tool.url.indexOf( 'http' ) !== 0 ? "https://" + tool.url : tool.url}>{tool.name} <LinkIcon size={12} fill={'#0277bc'}/></a>}
                      {!tool.url && <span>{tool.name}</span>}
                    </td>
                  </tr>
                  ))
                }
                </tbody>
                </table>
              </div>
            }
            </div>
          }
      </div>
    )
  }
}

export default AssemblyGuideInfo
