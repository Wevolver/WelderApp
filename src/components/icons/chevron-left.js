import React from 'react'

const ChevronLeftIcon = ({style, fill, stroke,  width, height}) => (
  <svg version="1.1" style={style} xmlns="http://www.w3.org/2000/svg" width={width || 20} height={height || 20} viewBox="0 0 20 20">
  <path stroke={stroke} fill={fill || "#000000"} d="M14 20c0.128 0 0.256-0.049 0.354-0.146 0.195-0.195 0.195-0.512 0-0.707l-8.646-8.646 8.646-8.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-9 9c-0.195 0.195-0.195 0.512 0 0.707l9 9c0.098 0.098 0.226 0.146 0.354 0.146z"></path>
  </svg>
)

export default ChevronLeftIcon