import React from 'react';

export default class Projects extends React.Component {
  render() {
    return (
      <div className="container projects-list">
        {this.props.children}
      </div>
    );
  }
}
