import './css/list-controls.css';
import React from 'react';
import Arrow from './Arrow.jsx';

export default class ListControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="list-controls-container">
        <Arrow className="control-arrow control-arrow-next" type="down" />
        <Arrow className="control-arrow control-arrow-prev" type="up" />
      </div>
    );
  }
}
