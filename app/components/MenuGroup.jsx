import React from 'react';
import { Link } from 'react-router';
import MenuItem from './MenuItem.jsx';
import { hashHistory } from 'react-router';

export default class MenuGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      activeItemId: null
    };
  }
  onLocationChange(newLocation) {
    const path = newLocation.pathname.toLowerCase();
    const activeItems = this.props.group.children.filter((item) => {
      return path.indexOf('/'+item.name.toLowerCase()) > -1;
    });
    if (activeItems.length) {
      this.setState({
        activeItemId: activeItems[0].id
      });
    } else {
      this.setState({
        activeItemId: null
      });
    }
  }
  componentDidMount() {
    this.historyUnlisten = hashHistory.listen(this.onLocationChange.bind(this));
  }
  componentWillUnmount() {
    this.historyUnlisten();
  }
  render() {
    const { group, active, onClose } = this.props;
    const { activeItemId } = this.state;
    const { id, name, children } = group;
    const renderedItems = children.map((item, i) => <MenuItem key={item.id} item={item} prefix={name+'/'} active={item.id === activeItemId} />);
    const header = active ?
      <div className="menu-group-header-container">
        <button className="menu-group-close" onClick={onClose}>x</button>
        <span className="menu-group-header">{name}</span>
      </div> :
      <Link
        className="menu-link menu-group-link"
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
