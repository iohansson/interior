import React from 'react';
import { Link } from 'react-router';
import GridIcon from './GridIcon.jsx';

export default class MenuItem extends React.Component {
  render() {
    const { item, prefix, active } = this.props;
    const { name } = item;
    const gridIcon = (name.toLowerCase() === 'projects' && active) ? <Link to={prefix+name+'/gallery'}><GridIcon /></Link> : null;
    return (
      <li {...this.props} className={'menu-list-item menu-item' + (active ? ' menu-item-active' : '') }>
        <Link className="menu-link menu-item-link" to={prefix+name} ref="link">{name}</Link>
        { gridIcon }
      </li>
    );
  }
}
