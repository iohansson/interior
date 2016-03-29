import React from 'react';
import { Link } from 'react-router';

export default class MenuItem extends React.Component {
  render() {
    const { item, prefix, active } = this.props;
    const { name } = item;
    return (
      <li className={'menu-list-item menu-item' + (active ? ' menu-item-active' : '') }>
        <Link className="menu-link menu-item-link" to={prefix+name}>{name}</Link>
      </li>
    );
  }
}
