import React, { Component } from 'react'
import Select from 'react-select';
import ReactTooltip from 'react-tooltip'
import Tooltip from '../icons/tooltip'
import { toast } from '../../modules/toast'

class TagsSelect extends Component {

  constructor(props) {
    super(props)
    const tags = props.project.tags || []
    const options = []
    tags.forEach(tag => {
      options.push({
        value: tag.name,
        label: tag.name,
      })
    })
    this.state = {
      selectedOption: options,
    }
  }

  componentWillMount = () => {
    this.props.getTagOptions()
    const tags={}
  }
  handleChange = (selectedOption, type) => {
    if(selectedOption.length > 5 && type.action === 'select-option'){
        toast("error","Projects are limited to 5 tags")
        return false
    }
    this.setState({ selectedOption });
    const {
      addTagToProject,
      removeTagFromProject,
      project
    } = this.props;
    const projectId = project._id.$oid

    if (type) {
      const {
        action,
        option,
        removedValue
      } = type
      if(action === 'select-option') {
        addTagToProject(option.value, projectId)
      } else if(action === 'remove-value') {
        removeTagFromProject(removedValue.value, projectId)
      }
    }
  }
  render() {
    const { selectedOption } = this.state;
    const { options } = this.props
    const normalizedOptions = []
    options.forEach( option => {
      normalizedOptions.push({
        value: option.name,
        label: option.name,
      })
    })
    return (
      <React.Fragment>
      <div className="text-input-label" style={{fontSize: 14, margin: '6px 0'}}>Tags<span data-tip="Select up to 5 tags. If a tag you need is not available, email info@welder.app with a request to add it."> <Tooltip/> </span></div>
      <ReactTooltip />
      <Select
        name="form-field-name"
        value={selectedOption}
        isMulti
        isClearable={false}
        classNamePrefix="tags-select-box"
        className="tags-select-box"
        onChange={this.handleChange}
        options={normalizedOptions}
      />
      </React.Fragment>
    );
  }
}

export default TagsSelect
