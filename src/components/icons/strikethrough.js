import React from 'react'

const StrikethroughIcon = ({ style, stroke, fill, size }) => (
  <svg version="1.1" width={size} height={size} viewBox="0 0 20 20">
    <path d="M16.5 2h-14c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h6.5v4.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-4.5h6.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5z" fill="#000000"></path>
    <path d="M9.5 18c-0.276 0-0.5-0.224-0.5-0.5v-4c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v4c0 0.276-0.224 0.5-0.5 0.5z" fill="#000000"></path>
    <path d="M18.5 12h-18c-0.276 0-0.5-0.224-0.5-0.5v-2c0-0.276 0.224-0.5 0.5-0.5h18c0.276 0 0.5 0.224 0.5 0.5v2c0 0.276-0.224 0.5-0.5 0.5zM1 11h17v-1h-17v1z" fill="#000000"></path>
  </svg>
)

export default StrikethroughIcon