import React from 'react';
import { Link } from 'react-router';

export default class MenuItem extends React.Component {
  render() {
    const { name } = this.props.item;
    return (
      <li className="menu-list-item menu-item">
        <Link className="menu-link menu-item-link" to={name}>{name}</Link>
      </li>
    );
  }
}
