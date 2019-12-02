import React, {Component} from 'react'
import Button from '../elements/button'
import CrossIcon from '../icons/cross'
import IconBar from './iconBar'
import { API } from '../../constants/api'
import showdown from 'showdown'
import ReactMde, {ReactMdeTypes, ReactMdeCommands} from 'react-mde'
import { Prompt } from 'react-router'

import './editor.css'

const commands = [
  [ReactMdeCommands.headerCommand, ReactMdeCommands.boldCommand,  ReactMdeCommands.italicCommand,  ReactMdeCommands.strikethroughCommand],
  [ReactMdeCommands.linkCommand, ReactMdeCommands.quoteCommand,  ReactMdeCommands.codeCommand,  ReactMdeCommands.imageCommand],
  [ReactMdeCommands.orderedListCommand, ReactMdeCommands.unorderedListCommand],
]

const VIDEO_REGEX = /@youtube\(.+\)/g;
const VIDEO_ID_REGEX = /(?=@youtube\()(.+)(?!=\)[^\b])/g
const IMAGE_REGEX = /!\[[^\]]+\]\([^)]+\)/g;

class Editor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dirty: false,
      mdeState: null,
      markdown: null,
    }
    this.converter = new showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      openLinksInNewWindow: true,
      strikethrough: true
    })
  }

  replaceImage = (htmlString) => {
    const IMG_REGEX = /!\[.*\]\((.+)\)/g
    return htmlString.replace(IMG_REGEX, `<img src="$1" />`)
  }

  replaceVideo = (htmlString) => {
    const matchArr = htmlString.match(/(?=@youtube\()(.+)(?!=\)[^\b])/g);
    if (!matchArr) return htmlString
    let videoId = 0
    return htmlString.replace(/@youtube\((.+)\)/g,
    function (match, capture) {
      return '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 12px;-webkit-overflow-scrolling: touch;">' +
        '<iframe ' +
          'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" ' +
          'src="https://www.youtube.com/embed/' + matchArr[videoId++].match(/\((.*)\)/).pop() + '?modestbranding=1&showinfo=0" ' +
          'frameborder=0 ' +
          'allow-full-screen>' +
        '</iframe>' +
      '</div>'
    });
  }

  componentDidMount = () => {
    this.setState({mdeState: {markdown: this.props.intialValue}})
  }


  UNSAFE_componentWillReceiveProps = (nextProps) => {

    if(nextProps.intialValue !== this.props.intialValue) {
      this.setState({mdeState: {markdown: nextProps.intialValue}})
    }
  }

  generateMarkdownPreview = (markdown) => {
    if(this.state.markdown !== markdown) {
      if (this.props.onChange) {
          this.props.onChange(
            markdown
          );
        }
        const hasChanged = markdown !== this.props.intialValue
      if(this.state.dirty !== hasChanged) this.setState({dirty: hasChanged})
    }
    return this.replaceVideo(this.converter.makeHtml(this.replaceImagesAndLinks(markdown)))
  }

  blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
      if (type === 'unstyled') {
        return 'paragraph'
      }
  }
  onSave = () => {
    const {
      openModal
    } = this.props
    openModal('saveFile')
  }

  onCancel = () => {
    this.props.editFileToggle()
    this.setState({mdeState: {markdown: this.props.intialValue}})
  }

  trackClick = () => {
    console.log('track')
  }

  replaceImagesAndLinks = (str) => {
    let newStr = str
    const WelderPermissions = localStorage.getItem('WelderPermissions')

    // const rgxImages = /!\[(?:|.+)\]\(([\.\.\/]+|[/])(.+)\)/g
    const rgxImageWithUrl = /!\[(?:|.+)\]\((https?:\/\/(.*))\)/gi
    if(newStr.match(rgxImageWithUrl)) {
      newStr = newStr.replace(rgxImageWithUrl, (m, $1, $2) => {
        if($1) {
          if($1.indexOf('permissions=') < 0) {
            const url = encodeURI(`${$1}&permissions=${WelderPermissions}`)
            return `![](${url})`
          } else {
            const url = encodeURI(`${$1}`.replace(/permissions=[^&)]*/gim, `permissions=${WelderPermissions}`))
            return `![](${url})`
          }
        }
      })
    }

    const Link = /\[(.+)\]\((mailto:.*)\)/gi
    if(newStr.match(Link)) {
      newStr = newStr.replace(Link, (m, $1, $2) => {
        if($1) {
          return `[${$1}](${encodeURI($2)})`
        }
      })
    }
    return newStr.replace(/\n.?\n\n/gm, '\n\n')
  }

  handleValueChange = (mdeState) => {
      this.setState({mdeState});
  }

  render () {
    return (
      <div className="editor">
      {!this.props.editing &&
        <div onClick={this.trackClick} dangerouslySetInnerHTML={{__html: this.generateMarkdownPreview(this.props.intialValue)}} />
      }
      {this.props.editing &&
        <div style={{position: 'relative', top: -3}}>
        <div style={{display: 'flex', paddingBottom: 16, justifyContent: 'flex-end'}}>
        <div key={'cancel'} style={{}}>
          <Button
            disabled={false}
            loading={false}
            square
            icon={<CrossIcon />}
            onClick={this.onCancel}
          />
        </div>
        <div key={'save'} style={{}}>
          <Button
            disabled={!this.state.dirty}
            loading={false}
            typeClass="action"
            onClick={this.onSave}
            label="Save"
          />
        </div>
        </div>
        <ReactMde
          onChange={this.handleValueChange}
          commands={commands}
          editorState={this.state.mdeState}
          generateMarkdownPreview={this.generateMarkdownPreview}
          buttonContentOptions={{
            iconProvider: name => <IconBar name={name} />,
          }}
          layout="tabbed"
        />
        </div>
      }
        <Prompt when={this.state.dirty} message="Are you sure you want to leave? Your changes will not be saved."/>
      </div>
    )
  }
}

export default Editor
