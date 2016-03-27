import React from 'react';
import { hashHistory } from 'react-router';

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverEnabled: false
    }
  }
  navigate() {
    hashHistory.push(this.props.link);
  }
  shouldComponentUpdate() {
    return false;
  }
  handleHover(hover) {
    if (hover || this.state.hoverEnabled) {
      const {type} = this.props;
      const down = type === 'down';
      const movepx = down ? 16 : -16;
      const h = 70,
        largeh = h + Math.abs(movepx);
      const yi = down ? 0 : 20.7;
      const tl = new TimelineMax();
      const stages = {
        hover: [
          {
            id: '#polygon'+type,
            duration: 0.25,
            to: {
              y: movepx
            },
            start: 0
          },
          {
            id: '#rect'+type,
            duration: 0.25,
            to: {
              attr: {
                height: largeh,
                y: down ? yi : yi + movepx
              }
            },
            start: 0
          },
          {
            id: '#rect'+type,
            duration: 0.25,
            to: {
              attr: {
                height: h,
                y: yi + movepx
              }
            }
          }
        ],
        idle: [
          {
            id: '#rect'+type,
            duration: 0.25,
            to: {
              attr: {
                height: largeh,
                y: down ? yi : yi + movepx
              }
            }
          },
          {
            id: '#polygon'+type,
            duration: 0.25,
            to: {
              y: 0
            },
            start: 0.25
          },
          {
            id: '#rect'+type,
            duration: 0.25,
            to: {
              attr: {
                height: h,
                y: yi
              }
            },
            start: 0.25
          }
        ]
      };
      const animation = hover ? 'hover' : 'idle';
      stages[animation].forEach((stage) => {
        if (stage.start !== undefined) {
          tl.to(stage.id, stage.duration, stage.to, stage.start);
        } else {
          tl.to(stage.id, stage.duration, stage.to);
        }
      });
      tl.play();

      this.setState({
        hoverEnabled: true
      });
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
