import React from 'react';
import { Link } from 'react-router';
import Menu from './Menu.jsx';
import uuid from 'node-uuid';

export default class App extends React.Component {
  constructor() {
    super();

    this.groups = [
      {
        id: uuid.v4(),
        children: [],
        name: 'Contacts'
      },
      {
        id: uuid.v4(),
        children: [
          {
            id: uuid.v4(),
            name: 'Projects'
          },
          {
            id: uuid.v4(),
            name: 'About'
          }
        ],
        name: 'Design'
      },
      {
        id: uuid.v4(),
        children: [],
        name: 'Architecture'
      }
    ];
  }
  render() {
    return (
      <div className="container">
        <Menu groups={this.groups} />
        {this.props.children}
      </div>
    );
  }
}
