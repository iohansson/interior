import React from 'react';
import './css/project-list-container.css';
import Cover from './Cover.jsx';
import TextPanel from './TextPanel.jsx';
import Arrow from './Arrow.jsx';
import TWEEN from '../libs/Tween.js';
import raf from 'raf';

export default class ProjectListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      style: this.getInitStyles()
    };
    this.animating = false;
  }
  getInitStyles() {
    return {
      aside: {
        width: 46.67
      },
      image: {
        width: 53.33
      }
    };
  }
  getEndStyles() {
    return {
      aside: {
        width: 41.67
      },
      image: {
        width: 58.33
      }
    };
  }
  handleHover(hover) {
    const initStyle = hover ? this.getInitStyles() : this.getEndStyles();
    const endStyle = hover ? this.getEndStyles() : this.getInitStyles();
    let tween = new TWEEN.Tween({
      asideWidth: initStyle.aside.width,
      imageWidth: initStyle.image.width
    });
    let component = this;
    let easing = hover ? TWEEN.Easing.Quadratic.Out : TWEEN.Easing.Quadratic.In;
    tween.easing(easing);
    tween.to({
      asideWidth: endStyle.aside.width,
      imageWidth: endStyle.image.width
    }, 250);
    tween.onUpdate(function () {
      component.setState({
        style: {
          aside: {
            width: this.asideWidth
          },
          image: {
            width: this.imageWidth
          }
        }
      });
    });
    tween.onComplete(function () {
      component.animating = false;
    });
    tween.onStop(function () {
      component.animating = false;
    });
    this.animating = true;
    tween.start();

    this.animate();
  }
  animate() {
    if (this.animating) {
      raf(this.animate.bind(this));
    }
    TWEEN.update();
  }
  render() {
    const { project } = this.props;
    return (
      <div className="project-container container">
        <TextPanel
          ref="textPanel"
          text={project.description}
          className="project-list-description-panel"
          style={{width: this.state.style.aside.width + '%'}}
          showControls={project.order % 2 === 0}
        />
        <Cover
          ref="cover"
          className="project-list-cover"
          imageUrl={project.image}
          title={project.title}
          onMouseEnter={this.handleHover.bind(this, true)}
          onMouseLeave={this.handleHover.bind(this, false)}
          style={{width: this.state.style.image.width + '%'}}
          showControls={project.order % 2 === 1}
        />
      </div>
    );
  }
}
