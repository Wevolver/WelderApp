import React from 'react'

const ChevronRightIcon = ({ style, fill, stroke, width, height }) => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={style} width={width || 20} height={height || 20} viewBox="0 0 20 20">
  <path stroke={stroke} fill={fill || "#000000"} d="M5 20c-0.128 0-0.256-0.049-0.354-0.146-0.195-0.195-0.195-0.512 0-0.707l8.646-8.646-8.646-8.646c-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0l9 9c0.195 0.195 0.195 0.512 0 0.707l-9 9c-0.098 0.098-0.226 0.146-0.354 0.146z"></path>
  </svg>
)

export default ChevronRightIcon