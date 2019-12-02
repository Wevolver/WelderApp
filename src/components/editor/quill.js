import React, {Component} from 'react'
import ReactDOM from "react-dom"
import cheerio from 'cheerio'
import ReactGA from 'react-ga';
import EditorCarousel from './editorCarousel'

import loadable from '@loadable/component'
const QuillEdit = loadable(() => import('./quillEdit'))

let sliderItems = []

class QuillEditorComp extends Component {

  constructor(props) {
    super(props)
    // const intialValue = this.props.isProjectEditor ? this.replaceImagePermission(props.intialValue) : props.intialValue
    const initialValue = props.intialValue
    this.state = {
      model: initialValue,
      initialModel: initialValue,
      isDirty: false,
      renderValue: this.doReplacements(props.value || initialValue)
    }
  }

  componentDidMount = () => {
    this.replaceSlider()
  }

  componentDidUpdate = (prevProps) => {
    this.replaceSlider()
  }

   UNSAFE_componentWillReceiveProps = (nextProps) => {
    if(nextProps.intialValue !== this.props.intialValue) {
      this.state = {
        model: nextProps.intialValue,
        initialModel: nextProps.intialValue,
        isDirty: false,
        renderValue: this.doReplacements(nextProps.value || nextProps.intialValue)
      }
    }
  }

  onCancel = () => {
    this.props.editFileToggle()
    this.handleModelChange(this.state.initialModel)
  }

  onSave = () => {
    const {
      openModal
    } = this.props
    openModal('saveFile')
    this.setState({renderValue: this.doReplacements(this.state.model)})
  }

  trackClick = (e) => {
    if(e.target.tagName.toLowerCase() === 'a') {
      var external = RegExp('^((f|ht)tps?:)?//(?!' + window.location.host + ')');
      if(external.test(e.target.href)){
        console.log('Track Outbounds');
        ReactGA.event({
          category: 'Activation',
          action: 'Clicked',
          label: 'Outbound Link'
        });
      }
    }
  }

  doReplacements = (model) => {
    if (!this.props.isProjectEditor) return model
    let newModel = this.replaceImagePermission(model)
    newModel = this.replaceConsecutiveImagesWithSlider(newModel)
    return newModel
  }

  replaceImagePermission = (model) => {
    const $ = cheerio.load(model)
    let links = $('a').attr('target', '_blank')
    let imageDivs = $('img')
    const WelderPermissions = localStorage.getItem('WelderPermissions')
    imageDivs.map(function(idx, el) {
      let newSrc = el.attribs.src
      if(newSrc.indexOf('?') > -1 && WelderPermissions) {
        if(newSrc.indexOf('permissions=') < 0) {
          newSrc = encodeURI(`${newSrc}&permissions=${WelderPermissions}`)
        } else {
          newSrc = `${newSrc}`.replace(/permissions=[^&)]*/gim, `permissions=${WelderPermissions}`)
        }
      }
      return $(this).attr('src', newSrc)
    })
    return $.html()
  }

  replaceConsecutiveImagesWithSlider = (model) => {
    let $ = cheerio.load(model)
    let refLinkNodes = $('p, h1, h2, h3, h4')
    let endOfSetFlag = false
    let nodes = []
    let count = 0
    refLinkNodes = refLinkNodes.filter(function(i, el) {
      const imagesInDiv = $(this).find('img')
      const iframesInDiv = $(this).find('iframe')

      if(imagesInDiv.length > 0 || iframesInDiv.length > 0) {
        const newNodes=[...imagesInDiv.toArray(), ...iframesInDiv.toArray()]

        if(refLinkNodes[i].next
          && ($(refLinkNodes[i].next).find('img').length > 0
          || $(refLinkNodes[i].next).find('iframe').length > 0))
        {
          nodes.push(...newNodes)
        } else if((nodes.length > 0 || newNodes.length > 1) && !endOfSetFlag) {
          nodes.push(...newNodes)
          endOfSetFlag = true
          return true
        } else {
          return false
        }
        return !endOfSetFlag

      } else {
        return false
      }
    })

    if(nodes.length < 1) return $.html()
    nodes.forEach(function(el, i) {
      if(el.attribs && el.name) {
        sliderItems[i] = {
          type: el.name,
          src:  el.attribs.src,
        }
      }
    })

    refLinkNodes.map(function(i, el) {
        return (i === 0 ?  $(this).replaceWith($('<div id="editor-carousel-container" />')) : $(this).replaceWith($().empty()))
    })

    return $.html()
  }

  replaceSlider = () => {
    var carouselDiv = document.getElementById('editor-carousel-container')
    if(carouselDiv) {
      ReactDOM.render(<EditorCarousel sliderItems={sliderItems}/>, carouselDiv)
    }
  }

  handleModelChange = (newModel) => {
    console.log(newModel);
    console.log(this.state.initialModel);
    this.setState({
      model: newModel,
      isDirty: newModel !== this.state.initialModel
    })
    if(this.props.onChange) {
      this.props.onChange(
        newModel
      );
    }
  }

  render() {
    let {editing} = this.props
    return(
        <React.Fragment>
        {
          editing ?
          <QuillEdit
            onSave={this.onSave}
            texfield={this.props.textfield}
            onCancel={this.onCancel}
            isDirty={this.state.isDirty}
            model={this.state.model}
            handleModelChange={this.handleModelChange}
          />
          :
          <div className="ql-editor editor">
            <div onClick={this.trackClick}
            dangerouslySetInnerHTML={{__html: this.state.renderValue}}/>
          </div>
        }
        </React.Fragment>
      )
    }
}

export default QuillEditorComp
