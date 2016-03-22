import React from 'react';

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.text}
      </p>
    );
  }
}
