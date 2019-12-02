import React, { Component } from 'react';
import './button.css';
import Loader from '../../elements/loader'
import ReactGA from 'react-ga';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Button extends Component {

  onClick = (evnt) => {
    const {
      onClick,
      ga
    } = this.props;
    if(onClick) onClick(evnt)
    if(cookies.get('accepts-cookies') && ga){
      ReactGA.event(ga)
    }
  }
  render() {
    const {
      label,
      loading,
      disabled,
      typeClass,
      icon,
      type,
      largeIcon,
      style,
      square,
      iconLeft,
      span,
      className,
      onMouseDown
    } = this.props
    let squareClass = square ? ' square' : ''
    if (largeIcon) squareClass += ' large'
    let coloredIcon = icon || iconLeft || false
    if (React.isValidElement(coloredIcon)  && disabled) coloredIcon = React.cloneElement(coloredIcon, {fill: '#ddd'})
    return (
      <button style={style} className={"button-main " + typeClass + squareClass + ' ' + className} onClick={this.onClick} disabled={disabled || loading} onMouseDown={onMouseDown} type={type || 'submit'}>
        {(iconLeft && coloredIcon) && <div style={{flexShrink: 0, display: 'flex', alignItems: 'center'}}>{coloredIcon}</div>}
        {loading ? <Loader /> : label}
        {(icon && coloredIcon) && coloredIcon}
        {(!loading && span != undefined) && <div className='follow-count' style={{borderLeft: '1px solid #fff', minWidth: '1rem', marginLeft: '.5rem', paddingLeft: '.5rem', height: '30px', marginBottom: '2px'}}>{span}</div>}
      </button>
    );
  }
}

export default Button;
