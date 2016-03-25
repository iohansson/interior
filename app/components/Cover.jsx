import React from 'react';
import Image from './Image.jsx';
import ListControls from './ListControls.jsx';

export default class Cover extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const controls = this.props.showControls ? this.props.controls : '';
    return (
      <div
        ref="container"
        className={this.props.className + '-container'}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={this.props.style}
        id="cover"
      >
        <Image
          ref="imageContainer"
          imageUrl={this.props.imageUrl}
          className={this.props.className}
          id="projectCoverImage"
        />
        {controls}
      </div>
    );
  }
}
