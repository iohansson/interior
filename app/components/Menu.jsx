import React from 'react';
import MenuGroup from './MenuGroup.jsx';
import { hashHistory } from 'react-router';
import Logo from './Logo.jsx';
import './css/menu.css';

export default class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      activeGroupId: null
    };
  }
  onLocationChange(newLocation) {
    const path = newLocation.pathname.toLowerCase();
    const activeGroups = this.props.groups.filter((group) => {
      return path.indexOf(group.name.toLowerCase()) > -1;
    });
    if (activeGroups.length) {
      this.setState({
        activeGroupId: activeGroups[0].id
      });
    } else {
      this.setState({
        activeGroupId: null
      });
    }
  }
  componentDidMount() {
    hashHistory.listen(this.onLocationChange.bind(this));
  }
  render() {
    const { activeGroupId } = this.state;
    const renderedGroups = this.props.groups.filter((group) => {
      return activeGroupId === null || (group.id === activeGroupId);
    }).map((group, i) => {
      return <MenuGroup
        key={group.id}
        group={group}
        active={activeGroupId !== null}
        onClose={this.closeGroup.bind(this)}
      />;
    });
    return (
      <nav className="menu">
        <ul className="menu-list">
          {renderedGroups}
        </ul>
        <Logo />
      </nav>
    );
  }
  closeGroup() {
    hashHistory.push('/');
  }
}
