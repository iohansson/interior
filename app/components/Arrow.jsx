import React from 'react';
import { hashHistory } from 'react-router';

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);
  }
  navigate() {
    hashHistory.push(this.props.link);
  }
  render() {
    const points = this.props.type === 'down' ? '1,62.7 15,76.7 29,62.7 25.2,58.9 15,69.1 4.8,58.9' : '29,29 15,15 1,29 4.8,32.8 15,22.6 25.2,32.8';
    const y = this.props.type === 'down' ? 1 : -20.7;
    return (
      <div
        {...this.props}
        onClick={this.navigate.bind(this)}
      >
        <svg width="30px" height="92px" viewBox="0 0 30 92">
          <polygon className="svg-arrow" points={points} />
          <rect x="12" y={y} transform="matrix(-1 2.693618e-010 -2.693618e-010 -1 30 72)" className="svg-arrow" width="6" height="70" />
        </svg>
      </div>
    );
  }
}
