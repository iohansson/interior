import React from 'react';
import Title from './Title.jsx';
import Image from './Image.jsx';
import ListControls from './ListControls.jsx';

export default class Cover extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const controls = this.props.showControls ? <ListControls /> : '';
    const { f1 } = this.props;
    return (
      <div
        ref="container"
        className={this.props.className + '-container'}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={this.props.style}
        data-f1={f1 !== undefined ? f1.cover : ''}
      >
        <Title
          ref="title"
          className={this.props.className}
          title={this.props.title}
        />
        <Image
          ref="image"
          imageUrl={this.props.imageUrl}
          className={this.props.className}
          data-f1={f1 !== undefined ? f1.image : ''}
        />
        {controls}
      </div>
    );
  }
}
