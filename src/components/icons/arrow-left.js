import React from 'react'

const ArrowLeft = ({style, fill, stroke,  width, height}) => (
  <svg version="1.1" width={width || 20} height={height || 20} viewBox="0 0 20 20">
    <path
      d="M19.354 10.146l-6-6c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.146 5.146h-16.293c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h16.293l-5.146 5.146c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l6-6c0.195-0.195 0.195-0.512 0-0.707z"
      fill={fill}
      stroke={stroke}
    >
    </path>
  </svg>
)

export default ArrowLeft;
