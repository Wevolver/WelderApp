import React, { Component } from 'react'

function youtube_parser(url){
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    if (!url) return false
    var match = url.match(regExp);
    return (match && match[1].length === 11)? match[1] : false;
}

const YoutubePreview = ({url}) => (
  <iframe 
    width="420" height="236"
    frameBorder={0}
    title="Youtube Preview Create Wizard"
    src={`https://www.youtube.com/embed/${youtube_parser(url)}`}/>
)

export default YoutubePreview
