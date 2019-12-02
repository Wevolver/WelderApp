import React, { Component } from 'react'
import get from 'lodash/get'
import EditorCarousel from '../editor/editorCarousel'

const renderSources = ({ overview }) => {
  if(!overview) return null
  const specs = get(overview, 'spec_table') || []
  const sources = get(overview, 'sources') || []
  const gallery = get(overview, 'gallery') || []

  return (
    <div className="ql-editor padding-left overviewV4 serif-font-block">

      <EditorCarousel sliderItems={gallery}/>

      <h3>Summary</h3>
      <div dangerouslySetInnerHTML={{__html: overview.summary}} />

      {!!(get(overview, 'goal') || null)&&
        <h3>Goal</h3>
      }
      <div dangerouslySetInnerHTML={{__html: overview.goal}} />

      {specs.length > 0 &&
        <h3>Specifications</h3>
      }
      <table style={{fontFamily: 'PT sans, sans-serif'}}><tbody>
      {specs.map(source =>
        <tr key={get(source, '_id.$oid')}>
          <td className="first-column">{source.name}</td>
          <td className="second-column">{source.value}</td>
          <td>{source.units}</td>
        </tr>
      )}
      </tbody></table>

    {!!(get(overview, 'roadmap') || null) &&
        <h3>Roadmap</h3>
      }
      <div dangerouslySetInnerHTML={{__html: overview.roadmap}} />

      {!!(get(overview, 'team') || null) &&
        <h3>Team</h3>
      }
      <div dangerouslySetInnerHTML={{__html: overview.team}} />
      <div>
      {sources.length > 0 &&
        <h3>References</h3>
      }
      {sources.map(source =>
        <div className="overviewV4-source" key={get(source, '_id.$oid')}>
          <div><a href={source.link} target="_blank">{source.title}</a></div>
          <p className="summary">{source.summary}</p>
          <div className="authors">{source.authors}</div>
        </div>
      )}</div>
    </div>
  )
}

export default renderSources
