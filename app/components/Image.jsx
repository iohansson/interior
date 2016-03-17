import React from 'react';

export default class Image extends React.Component {
  componentWillMount() {
    const img = <img {...this.props} />;
    img.onload = this.cover.bind(this);

    this.img = img;
  }
  render() {
    return (
      this.img
    );
  }
  cover() {
    
  }
}
