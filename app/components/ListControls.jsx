import './css/list-controls.css';
import React from 'react';
import Arrow from './Arrow.jsx';

export default class ListControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { next, prev, linkPrefix } = this.props;
    return (
      <div className="list-controls-container">
        <Arrow className="control-arrow control-arrow-next" type="down" link={ linkPrefix + next } />
        <Arrow className="control-arrow control-arrow-prev" type="up" link={ linkPrefix + prev } />
      </div>
    );
  }
}
