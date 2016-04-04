import React from 'react';
import { hashHistory } from 'react-router';
import './css/control-catcher.css';
import _ from 'lodash';

export default class ControlCatcher extends React.Component {
  constructor(props) {
    super(props);
  }
  navigate(nextId) {
    if (typeof this.props.onNavigate === 'function') {
      this.props.onNavigate(nextId);
    }
    hashHistory.push(this.props.linkPrefix + nextId);
  }
  componentWillMount() {
    this.navigate = _.debounce(this.navigate, 100);
  }
  handleWheel(e) {
    e.persist();
    const { linkPrefix, next, prev } = this.props;
    const nextId = (e.deltaY < 0) ? prev : next;
    if (nextId) {
      this.navigate(nextId);
    }
  }
  handleTouchStart(e) {}
  handleTouchEnd(e) {}
  render() {
    return (<div className="control-catcher" onWheel={this.handleWheel.bind(this)} onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}></div>);
  }
}
