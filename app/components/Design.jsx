import React from 'react';

export default class Design extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
