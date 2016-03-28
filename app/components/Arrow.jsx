import React from 'react';
import { hashHistory } from 'react-router';

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);
  }
  setHoverTimeline() {
    const {type} = this.props;
    const down = type === 'down';
    const movepx = down ? 16 : -16;
    const h = 70,
      largeh = h + Math.abs(movepx);
    const yi = down ? 0 : 20.7;
    const tl = new TimelineMax();
    tl.to('#polygon'+type, 0.25, { y: movepx }, 0);
    tl.to('#rect'+type, 0.25, { attr: {
      height: largeh,
      y: (down ? yi : yi + movepx)
    } }, 0);
    tl.to('#rect'+type, 0.25, { attr: {
      height: h,
      y: yi + movepx
    } });
    tl.pause();

    this.timeline = tl;
  }
  componentDidMount() {
    this.setHoverTimeline();
  }
  navigate() {
    hashHistory.push(this.props.link);
  }
  shouldComponentUpdate() {
    return false;
  }
  handleHover(hover) {
    if (hover) {
      this.timeline.play();
    } else {
      this.timeline.reverse();
    }
  }
  render() {
    const points = this.props.type === 'down' ? '1,62.7 15,76.7 29,62.7 25.2,58.9 15,69.1 4.8,58.9' : '29,29 15,15 1,29 4.8,32.8 15,22.6 25.2,32.8';
    const y = this.props.type === 'down' ? 0 : 20.7;
    return (
      <div
        {...this.props}
        onClick={this.navigate.bind(this)}
        onMouseEnter={this.handleHover.bind(this, true)}
        onMouseLeave={this.handleHover.bind(this, false)}
      >
        <svg width="30px" height="92px" viewBox="0 0 30 92" id={'arrow'+this.props.type}>
          <polygon className="svg-arrow" points={points} id={'polygon'+this.props.type} />
          <rect x="12" y={y} className="svg-arrow" width="6" height="70" id={'rect'+this.props.type} />
        </svg>
      </div>
    );
  }
}
