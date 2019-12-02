import React from 'react'
import './loader.css'

const DocumentLoader = ({type}) => (
  <div className="document-loader" style={{marginTop: 8}}>
    <div className="document-loader-gray-square" style={{paddingBottom: 16, height: '1.2rem'}} />
    <div className="document-loader-gray-square" style={{paddingBottom: 16, height: '1.2rem'}} />
    <div className="document-loader-gray-square" style={{paddingBottom: 16, height: '1.2rem'}} />
    <div className="document-loader-gray-square" style={{paddingBottom: 16, height: '1.2rem'}} />
    <div className="document-loader-gray-square" style={{paddingBottom: 16, height: '1.2rem'}} />
    <div className="document-loader-gray-square" style={{paddingBottom: 16, height: '1.2rem'}} />
  </div>
)

export default DocumentLoader
