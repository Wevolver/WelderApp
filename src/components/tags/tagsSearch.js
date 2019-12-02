import React, { Component } from 'react'
import Select, { components } from 'react-select';
import MaginifierIcon from '../icons/magnifier'
import { Link } from 'react-router-dom'
import Button from '../../components/elements/button'
import { Redirect } from 'react-router'
import TagIcon from '../icons/tag'
import SearchBox from '../../containers/SearchResults/SearchBox'

const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props}>
    {false && <div
        style={{
          width: 20,
          height: 20,
          position: 'absolute',
          left: -19,
          top: 5
        }}
      >
      <MaginifierIcon fill="#757575"/>}
    </div>}
    {children}
  </components.ValueContainer>
);

const Option = (props) => {
  return (
    <div style={{color: '#0277bc', cursor: 'pointer'}} {...props.innerProps}>
      <div style={{
        padding: '8px 12px',
        background: props.isFocused ? '#f7f9fa' : 'white'
      }}>
        {props.label}
      </div>
      {false && <components.Option {...props}/>}
    </div>
  );
};


class TagsSelect extends Component {


  constructor(props) {
    super(props)
    this.state = {
      selectedOption: {},
      searching: false,
      open: false,
      navigate: false
    }
  }

  componentWillMount = () => {
    // this.props.getTagOptions()
  }

  componentWillReceiveProps = () => {
    // this.setState({navigate: false})
  }

  handleChange = (selectedOption, type) => {
    this.setState({selectedOption, open: false, navigate: true})
  }

  handleInputChange = (value) => {
    this.setState({
      searching: value.length > 0
    })
  }
  handleIsSearchin = (isSearching) => {
    this.setState({open: isSearching})
    this.props.onOpen(isSearching)
  }
  handleLinkClick = () => {
    const open = !this.state.open
    this.handleIsSearchin(open)
  }

  handleBlur = () => {
    this.handleIsSearchin(false)
  }

  groupLabel = data => {
    return( <div>
      <span style={{display: 'flex', alignContent: "center"}}><TagIcon fill="#999"/><b style={{textTransform: 'none', marginLeft: '.2rem'}}>{data.label}:</b></span>
    </div> )
  }

  render() {
    const { selectedOption } = this.state;
    const { options } = this.props
    const normalizedOptions = [{ label: 'Tags', options: [] }]

    options.forEach( option => {
      normalizedOptions[0].options.push({
        value: option.name,
        label: option.displayName || option.name,
      })
    })

    if(this.state.navigate &&
      this.state.selectedOption.value) {
      this.setState({navigate: false})
      let searchUrl = `/projects?tags=${this.state.selectedOption.value.replace(/ /g, '+')}`
      return (<Redirect to={searchUrl} push />)
    }

    return (
      <div style={{display: 'flex'}}>
      {!this.state.open && <Button
        iconLeft={<div style={{marginRight: 4, position: 'relative', top: 2}}><MaginifierIcon fill="#FFF" width={14} height={14}/></div>}
        typeClass="subtle white"
        className="search-button"
        label={this.props.iconOnly ? "" : "Search"}
        style={{height: 37}}
        onClick={this.handleLinkClick}
      />}
      <div
        className="search-wrapper"
        style={{
          width: this.state.open ? 300 : 0,
          maxWidth: 320,
          opacity: this.state.open ? 1 : 0,
          height: 32,
          paddingLeft: 12,
          position: 'relative'
        }}
      >
        {this.state.open &&
          <SearchBox
            onBlur={this.handleBlur}
            alwaysStartEmpty
          />
        }
        {false && this.state.open && <Select
          name="form-field-name"
          value={selectedOption}
          components={{ ValueContainer, Option }}
          formatGroupLabel={this.groupLabel}
          controlShouldRenderValue={false}
          noOptionsMessage={() => "We couldn\'t find tags with that term"}
          onInputChange={this.handleInputChange}
          menuIsOpen={this.state.searching}
          autoFocus
          onBlur={this.handleBlur}
          placeholder="Search tags"
          classNamePrefix="tags-select-box"
          className="tags-select-box tags-search"
          onChange={this.handleChange}
          options={normalizedOptions}
        />}
        </div>
      </div>
    );
  }
}

export default TagsSelect
