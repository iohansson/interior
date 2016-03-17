import React from 'react';
import { Link } from 'react-router';
import MenuItem from './MenuItem.jsx';

export default class MenuGroup extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    console.log(this.props.group.name + ' will mount');
  }
  componentWillUnmount() {
    console.log(this.props.group.name + ' will unmount');
  }
  render() {
    const { group, onClick, active, onClose } = this.props;
    const { id, name, children } = group;
    const renderedItems = children.map((item, i) => <MenuItem key={item.id} item={item} />);
    const header = active ?
      <div className="menu-group-header-container">
        <button className="menu-group-close" onClick={onClose}>x</button>
        <span className="menu-group-header">{name}</span>
      </div> :
      <Link
        className="menu-link menu-group-link"
        onClick={onClick.bind(null, id)}
        to={name}
        activeClassName="menu-link-active"
      >
        {name}
      </Link>;
    const body = active ?
      <ul className="menu-list menu-group-list">
        {renderedItems}
      </ul> :
      '';
    const classes = 'menu-list-item menu-group' + (active ? ' menu-group-active' : '');
    return (
      <li className={classes}>
          {header}
          {body}
      </li>
    );
  }
}
