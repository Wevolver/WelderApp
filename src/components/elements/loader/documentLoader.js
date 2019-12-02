import React from 'react'
import './loader.css'

const DocumentLoader = ({type}) => (
  <div className="document-loader">
  <div className="document-loader-gray-square" />
    {type==='text' && <div className="document-loader-gray-square" style={{paddingBottom: 16}} />}
    {type==='text' && <div className="document-loader-gray-square" style={{paddingBottom: 16, width: '70%'}}/>}
  </div>
)

export default DocumentLoader
