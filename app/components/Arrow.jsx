import React from 'react';
import { Link } from 'react-router';
import TWEEN from '../libs/Tween.js';
import raf from 'raf';

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      style: this.getStages()[0]
    };
    this.animating = false;
  }
  getStages() {
    const dir = this.props.type === 'down' ? 1 : -1;
    return [
      {
        roof: {
          translateY: 0
        },
        rect: {
          height: 70,
          translateY: 0
        }
      },
      {
        roof: {
          translateY: 10 * dir
        },
        rect: {
          height: 80,
          translateY: this.props.type === 'down' ? 0 : -10
        }
      },
      {
        roof: {
          translateY: 10 * dir
        },
        rect: {
          height: 70,
          translateY: 10 * dir
        }
      },
    ];
  }
  handleHover(hover) {
    let stages = this.getStages();
    if (!hover) {
      stages.reverse();
    }
    let tweens = [];
    let easing = hover ? TWEEN.Easing.Quadratic.Out : TWEEN.Easing.Quadratic.In;
    for (let i = 0, x = stages.length - 1; i < x; i++) {
      let stageFrom = stages[i];
      let stageTo = stages[i+1];
      let tween = new TWEEN.Tween({
        roofTranslate: stageFrom.roof.translateY,
        rectHeight: stageFrom.rect.height,
        rectTranslate: stageFrom.rect.translateY
      });
      tween.easing(easing);
      if (tweens.length) {
        tweens[tweens.length - 1].chain(tween);
      }
      tween.to({
        roofTranslate: stageTo.roof.translateY,
        rectHeight: stageTo.rect.height,
        rectTranslate: stageTo.rect.translateY
      }, 250);
      let component = this;
      tween.onUpdate(function () {
        component.setState({
          style: {
            roof: {
              translateY: this.roofTranslate
            },
            rect: {
              height: this.rectHeight,
              translateY: this.rectTranslate
            }
          }
        });
      });
      tweens.push(tween);
    }
    this.animating = true;
    tweens[0].start();
    this.animate();
  }
  animate() {
    if (this.animating) {
      raf(this.animate.bind(this));
    }
    TWEEN.update();
  }
  render() {
    const points = this.props.type === 'down' ? '1,62.7 15,76.7 29,62.7 25.2,58.9 15,69.1 4.8,58.9' : '29,29 15,15 1,29 4.8,32.8 15,22.6 25.2,32.8';
    const y = this.props.type === 'down' ? 1 : 20.7;
    return (
      <div
        {...this.props}
        onMouseEnter={this.handleHover.bind(this, true)}
        onMouseLeave={this.handleHover.bind(this, false)}
      >
        <svg width="30px" height="92px" viewBox="0 0 30 92">
          <polygon className="svg-arrow" points={points}
            transform={'translate(0 '+this.state.style.roof.translateY+')'} />
          <rect x="12" y={y} transform="matrix(-1 2.693618e-010 -2.693618e-010 -1 30 72)" className="svg-arrow" width="6"
            height={this.state.style.rect.height}
            transform={'translate(0 '+this.state.style.rect.translateY+')'} />
        </svg>
      </div>
    );
  }
}
