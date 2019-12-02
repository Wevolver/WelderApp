import React, {Component} from 'react'

class FeaturedOn extends Component {

  render() {
    let featuredOn = [
      {
        url: 'https://www.fastcodesign.com/3064301/the-22-most-innovative-web-platforms-of-2016',
        img: 'https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/fast_company.png',
        alt: ' the Fast Company logo'
      }, {
        url: 'http://www.wired.co.uk/news/archive/2015-10/17/open-source-hardware-makerlab-wired-nextgen',
        img: 'https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/wired.jpg',
        alt: 'Wired logo'
      }, {
        url: 'https://www.youtube.com/watch?v=t56bojFAnUg',
        img: 'https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/tedx.png',
        alt: 'TEDx logo'
      }, {
        url: 'https://www.sxsw.com/interactive/2018/sxsw-interactive-innovation-awards-showcase-gallery/',
        img: 'https://s3.amazonaws.com/www.wevolver.com/images/sxsw-logo-horizontal.png',
        alt: 'SXSW Logo'
      }
    ]
    featuredOn = featuredOn.map(site => (<a href={site.url} key={'featured:' + site.alt} target="_blank">
      <img src={site.img} alt={site.alt}></img>
    </a>));

    return (<section>
      <div style={{textAlign: 'center'}}><h2 className="featured-on-title">Featured On</h2></div>
      <div className="wrapper">
        <section className="featured-on">
          {featuredOn}
        </section>
      </div>
    </section>)
  }
}

export default FeaturedOn
