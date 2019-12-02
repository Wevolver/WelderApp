import React from "react"
import jsonp from "jsonp"
import PropTypes from 'prop-types';
import Button from '../../elements/button'

class Mailchimp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      EMAIL: props.email
    };
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.email !== this.props.email) {
      this.setState({EMAIL: nextProps.email})
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { fields, action } = this.props;
    const values = fields.map(field => {
      return `${field.name}=${encodeURIComponent(this.state[field.name])}`;
    }).join("&");
    const path = `${action}&${values}`;
    const url = path.replace('/post?', '/post-json?');
    const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    const email = this.state['EMAIL'];
    (!regex.test(email)) ? this.setState({ status: "empty" }) : this.sendData(url);
  };

  sendData(url) {
    this.setState({ status: "sending" });
    jsonp(url, { param: "c" }, (err, data) => {
      if (data.msg.includes("already subscribed")) {
        this.setState({ status: 'duplicate' });
      } else if (err) {
        this.setState({ status: 'error' });
      } else if (data.result !== 'success') {
        this.setState({ status: 'error' });
      } else {
        this.setState({ status: 'success' });
        this.props.fields.forEach(input => {
          this.setState({[input.name]: ''})
        })
      };
    });
  }


  render() {
    const { messages, fields, styles, className } = this.props;
    const { status } = this.state;
    const style={
      marginTop: 12
    }
    let isFormValid = true
    if(Array.isArray(fields)) {
      fields.forEach(input => {
        if (!this.state[input.name]) isFormValid = false
      })
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className={className}>
        <span className="text-input-error">

          {navigator.doNotTrack == 1 && <p style={styles.duplicateMsg}>Your browser has <b>Do Not Track</b> settings turned on. With this enabled we will not be able to receive your email address.</p> }

          {status === "duplicate" && <p style={styles.duplicateMsg}>{messages.duplicate}</p>}
          {status === "empty" && <p style={styles.errorMsg}>{messages.empty}</p>}
          {status === "error" && <p style={styles.errorMsg}>{messages.error}</p>}
        </span>
        {fields.map(input =>
          <React.Fragment>
          {input.fieldType !== 'textarea' &&
            <input key={input.name}
              style={style}
              onChange={({ target }) => this.setState({ [input.name]: target.value })}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              disabled={navigator.doNotTrack == 1}
              className="text-input"
              value={this.state[input.name]} />
          }
          {input.fieldType === 'textarea' &&
            <textarea key={input.name}
              style={style}
              onChange={({ target }) => this.setState({ [input.name]: target.value })}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              rows={5}
              disabled={navigator.doNotTrack == 1}
              className="text-input"
              value={this.state[input.name]} />
          }
          </React.Fragment>
        )}
        <div style={{
          marginTop: 12,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <Button
          typeClass="action"
          type="submit action"
          label={status === "success" ? "Thank you!" : "Submit"}
          loading={status === "sending"}
          disabled={status === "success" || isFormValid === false}
          ga={{
            category: 'Engagement',
            action: 'Email Submit',
            label: 'Start Project'
          }}
        />
        </div>
      </form>
    );
  }
}

Mailchimp.defaultProps = {
  messages: {
    sending: "Sending...",
    success: "Thank you for subscribing!",
    error: "An unexpected internal error has occurred.",
    empty: "You must write an e-mail.",
    duplicate: "Too many subscribe attempts for this email address",
    button: 'Subscribe!'
  },
  styles: {
    sendingMsg: {
      color: '#0652DD'
    },
    successMsg: {
      color: '#009432'
    },
    duplicateMsg: {
      color: '#EE5A24'
    },
    errorMsg: {
      color: '#ED4C67'
    }
  }
}

Mailchimp.propTypes = {
  action: PropTypes.string,
  messages: PropTypes.object,
  fields: PropTypes.array,
  styles: PropTypes.object,
  className: PropTypes.string
};

export default Mailchimp;
