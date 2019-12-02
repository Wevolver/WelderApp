import React, { Component } from 'react';
import TextField from './textField'
import SearchIcon from '../../icons/magnifier'
import Button from '../button'
import ArrowRightIcon from '../../icons/arrow-right'
import { Redirect } from 'react-router'
import { heapEvent } from '../../../modules/heap'
import ReactGA from 'react-ga';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


let redirect = false

class SearchBox extends Component {
  state = {
    focused: false,
    hovering: false,
    query: ''
  }

  componentWillMount = () => {
    if(this.props.query) {
      this.setState({
        query: this.props.query
      })
    }
  }
  handleSubmit = () => {
    const {
      onBlur,
    } = this.props
    if(cookies.get('accepts-cookies')){
      ReactGA.event({
        category: 'Engagement',
        action: 'Search'
      });

      heapEvent.track('searched', {query: this.state.query});
    }

    redirect = true
    this.forceUpdate()
  }

  handleOnChange = (evt) => {
    this.setState({
      query: evt.target.value
    })
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.query !== this.props.query && this.props.query) {
      this.setState({query: this.props.query})
    }
  }

  render() {
    const {
      focused,
      hovering,
      query,
    } = this.state

    const {
      onBlur
    } = this.props

    if(redirect) {
      this.forceUpdate()
      redirect = false
      if(onBlur) onBlur()
      return (<Redirect to={`/search/${encodeURIComponent(this.state.query)}`} push />)
    }
    // disable if no query
    // if no focus and no hover, regradless if there is query
    const disabled = !query || (!focused && !hovering)
    return (
      <React.Fragment>
        <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit()}} onMouseEnter={() => this.setState({hovering: true})} onMouseLeave={() => this.setState({hovering: false})}>
        <TextField
          prefix={<SearchIcon fill="#757575" width={16} height={16}/>}
          input={{
            onChange: (evt) => this.handleOnChange(evt),
            onFocus: () => this.setState({focused: true}),
            onBlur: () => {this.setState({focused: false}); if(onBlur) onBlur()},
            autoFocus: true,
            value: this.state.query
          }}
          suffix={
            <Button
              square
              disabled={disabled}
              className={disabled ? '' : 'search-button'}
              label={<ArrowRightIcon fill={disabled ? '#757575' :'#0277bc'} stroke={disabled ? '#757575' :'#0277bc'}/>}
              typeClass="subtle"
              type="submit"
            />
          }
        />
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBox
