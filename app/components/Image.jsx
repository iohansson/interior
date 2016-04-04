import React from 'react';
import './css/image.css';
import Preloader from './Preloader.jsx';

export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: 0,
        height: 0,
        top: 0
      }
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  render() {
    const { drawOverlay, className, imageUrl, preload, preloader } = this.props;
    const overlay = drawOverlay ? <div className={'image-overlay' + ' ' + className + '-image-overlay'} /> : '';
    const img = <img
      ref="image"
      src={imageUrl}
      className={'image' + ' ' + className + '-image'}
      onLoad={this.afterLoad.bind(this)}
      style={this.state.style}
      id={this.props.id}
      />;
    const imgWithPreloader = (preload && preloader) ? <Preloader loadList={[imageUrl]} preloader={preloader}>{img}</Preloader> : img;
    return (
      <div
        className={'image-container' + ' ' + className + '-image-container'}
      >
        {imgWithPreloader}
        {overlay}
      </div>
    );
  }
  getNaturalDimensions(el) {
    return ({
      ow: el.naturalWidth,
      oh: el.naturalHeight,
      ratio: el.naturalWidth / el.naturalHeight
    });
  }
  getParentDimensions(el) {
    const parent = el.parentNode;
    return ({
      pw: parent.clientWidth,
      ph: parent.clientHeight,
      pratio: parent.clientWidth / parent.clientHeight
    });
  }
  cover() {
    const el = this.refs.image;
    const { ow, oh, ratio } = this.getNaturalDimensions(el);
    const { pw, ph, pratio} = this.getParentDimensions(el);
    let width, height, top = 0;
    if (ratio > pratio) {
      height = ph;
      width = height * ratio;
    } else {
      width = pw;
      height = width / ratio;
      top = (ph - height) / 2;
    }
    this.setState({
      style: {
        width,
        height,
        top
      }
    });
  }
  afterLoad(e) {
    this.cover();
  }
  handleResize(e) {
    this.cover();
  }
}
