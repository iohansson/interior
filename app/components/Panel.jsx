import React from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const controls = this.props.showControls ? this.props.controls : '';
    return (
      <div
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
        {controls}
      </div>
    );
  }
}
