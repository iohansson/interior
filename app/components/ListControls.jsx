import './css/list-controls.css';
import React from 'react';
import Arrow from './Arrow.jsx';

export default class ListControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { next, prev, linkPrefix } = this.props;
    const prevLink = (prev !== null) ? <Arrow className="control-arrow control-arrow-prev" type="up" link={ linkPrefix + prev } onNavigate={this.props.onNavigate} linkTo={prev} /> : null;
    const nextLink = (next !== null) ? <Arrow className="control-arrow control-arrow-next" type="down" link={ linkPrefix + next } onNavigate={this.props.onNavigate} linkTo={next} /> : null;
    return (
      <div className="list-controls-container">
        {prevLink}
        {nextLink}
      </div>
    );
  }
}
