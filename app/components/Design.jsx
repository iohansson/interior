import React from 'react';

export default class Design extends React.Component {
  render() {
    return (
      <div className="container design">
        {this.props.children}
      </div>
    );
  }
}
