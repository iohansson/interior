import React from 'react';
import './css/projects.css';

export default class Projects extends React.Component {
  render() {
    return (
      <div className="container projects">
        {this.props.children}
      </div>
    );
  }
}
