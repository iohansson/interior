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
        id={this.props.id}
      >
        {this.props.text}
      </p>
    );
  }
}
