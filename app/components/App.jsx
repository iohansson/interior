import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Interior</h1>
        <ul>
          <li>
            <Link to="/">index</Link>
          </li>
          <li>
            <Link to="projects">projects</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
