import TextSizeIcon from '../icons/text-size'
import BoldIcon from '../icons/bold'
import ItalicIcon from '../icons/italic'
import StrikethroughIcon from '../icons/strikethrough'
import Link from '../icons/link'
import QuoteIcon from '../icons/quote'
import CodeIcon from '../icons/code'
import ImageIcon from '../icons/image'
import ULIcon from '../icons/ul'
import OLIcon from '../icons/ol'


import React from 'react'

function selectIcon(name) {
  switch(name) {
    case 'heading':
      return <TextSizeIcon />
    case 'bold':
      return <BoldIcon size={18} />
    case 'italic':
      return <ItalicIcon size={16} />
    case 'strikethrough':
      return <StrikethroughIcon size={16} />
    case 'link':
      return <Link size={16}/>
    case 'quote-right':
      return <QuoteIcon size={16}/>
    case 'code':
      return <CodeIcon size={18}/>
    case 'image':
      return <ImageIcon size={14}/>
    case 'list-ul':
      return <ULIcon size={18}/>
    case 'list-ol':
      return <OLIcon size={16}/>
    case 'tasks':
      return null
    default:
      return null
  }
}

const IconBar = ({name}) => selectIcon(name)

export default IconBar
