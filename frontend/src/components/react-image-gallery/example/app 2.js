import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'src/ImageGallery';

// 改以後端的方式匯入圖片（？）
const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showIndex: true,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showGalleryFullscreenButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
      useWindowKeyDown: true,
    };
    this.images = [].concat(this._getStaticImages());
  }

  _getStaticImages() {
    let images = [];
    for (let i = 1; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail:`${PREFIX_URL}${i}t.jpg`
      });
    }

    return images;
  }

  render() {
    return (
      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          additionalClass="app-image-gallery"
          useWindowKeyDown={this.state.useWindowKeyDown}
        />
      </section>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
