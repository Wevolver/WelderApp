import { toast as toastify, Slide } from 'react-toastify';
import React, { Component } from 'react'

export function toast(type, message, customOptions={}) {
  const options = Object.assign({}, {
    position: toastify.POSITION.TOP_RIGHT,
    transition: Slide,
  }, customOptions)
  
  toastify[type](({ closetoast }) => <div>{message}</div>, options)
}