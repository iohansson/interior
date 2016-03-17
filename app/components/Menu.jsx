import React from 'react';
import MenuGroup from './MenuGroup.jsx';
import { hashHistory } from 'react-router';
import './css/menu.css';

export default class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      activeGroupId: null
    };
  }
  render() {
    const { activeGroupId } = this.state;
    console.log(activeGroupId);
    const renderedGroups = this.props.groups.filter((group) => {
      console.log(group.id);
      return activeGroupId === null || (group.id === activeGroupId);
    }).map((group, i) => {
      return <MenuGroup
        key={group.id}
        group={group}
        onClick={this.openGroup.bind(this)}
        active={activeGroupId !== null}
        onClose={this.closeGroup.bind(this)}
      />;
    });
    return (
      <nav className="menu">
        <ul className="menu-list">
          {renderedGroups}
        </ul>
      </nav>
    );
  }
  openGroup(id) {
    this.setState({
      activeGroupId: id
    });
  }
  closeGroup() {
    hashHistory.push('/');
    this.setState({
      activeGroupId: null
    });
  }
}
