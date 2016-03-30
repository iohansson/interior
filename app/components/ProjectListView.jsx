import React from 'react';
import ReactDOM from 'react-dom';
import './css/project-list-view.css';
import './css/project-list-container.css';
import Cover from './Cover.jsx';
import TextPanel from './TextPanel.jsx';
import Title from './Title.jsx';
import ListControls from './ListControls.jsx';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';

export default class ProjectListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  setHoverTimeline() {
    const { id, order } = this.props.project;
    const even = order % 2 === 0;
    const titleMove = even ? 100 : -100;
    const tl = new TimelineMax();
    tl.to('#cover'+id, 0.5, { css: { width: '58.33%' } });
    tl.to('#title'+id, 0.5, { css: { x: titleMove, color: '#857cc0' } }, 0);
    tl.to('#panel'+id+'paragraph', 0.5, { css: { x: titleMove / 2 } }, 0);
    tl.to('#cover'+id+'image', 1, { css: { x: even ? 100 : -100 } }, 0);
    tl.pause();

    this.hoverTimeline = tl;
  }
  setAppearanceTimeline() {
    const tl = new TimelineMax();
    const key = this.props.project.id;
    const start = 1;
    const duration = 0.5;
    // labels
    tl.addLabel('init', start);
    tl.addLabel('enter', start + duration);
    tl.addLabel('enter2', start + duration * 2);
    tl.addLabel('endEnter', start + duration * 3);
    tl.addLabel('leave', start + duration * 4);
    tl.addLabel('endLeave', start + duration * 5);
    // enter
    tl.set('#menuUnderlay'+key, { css: { width: '5.3125em' } }, 'init');
    tl.set('#container'+key, { css: { opacity: 1, zIndex: 100 } }, 'init');
    tl.set('#cover'+key, { css: { width: '0%' } }, 'init');
    tl.set('#panel'+key, { css: { width: '100%' } }, 'init');
    tl.set('#panel'+key+'paragraph', { css: { opacity: 0 } }, 'init');
    tl.to('#cover'+key, duration, { css: { width: '53.33%' } }, 'enter');
    tl.to('#panel'+key, duration, { css: { width: '46.67%' } }, 'enter');
    tl.to('#menuUnderlay'+key, duration, { height: '100%' }, 'enter2');
    tl.to('#panel'+key+'paragraph', duration, { css: { opacity: 1 } }, 'enter2');

    // leave
    tl.fromTo('#panel'+key, duration, { css: { width: '46.67%' } }, { css: { width: '100%' } }, 'leave');
    tl.fromTo('#cover'+key, duration, { css: { width: '53.33%' } }, { css: { width: '0%' } }, 'leave');
    tl.to('#menuUnderlay'+key, duration, { css: { width: 0 } }, 'leave');
    tl.fromTo('#panel'+key+'paragraph', duration, { opacity: 1 }, { opacity: 0 }, 'leave');

    tl.pause();

    this.appearanceTimeline = tl;
  }
  componentDidMount() {
    this.setHoverTimeline();
    this.setAppearanceTimeline();
  }
  enter(callback) {
    this.transitioning = true;
    const tl = this.appearanceTimeline;
    const titleTween = TweenMax.to(`#title${this.props.project.id} .title-block`, 1, { css: { y: '0%' } });
    tl.add(titleTween, 'enter');
    tl.seek('enter');
    tl.addCallback(callback, 'endEnter');
    tl.tweenTo('endEnter');
  }
  didEnter() {
    this.transitioning = false;
    this.entered = true;
  }
  setupEnter(callback) {
    const tl = this.appearanceTimeline;
    tl.seek('init');
    tl.tweenTo('enter');
    this.enterCallback = callback;
    this.entered = false;
  }
  componentWillAppear(callback) {
    this.setupEnter(callback);
  }
  componentWillEnter(callback) {
    this.setupEnter(callback);
  }
  componentDidAppear() {
    this.didEnter();
  }
  componentDidEnter() {
    this.didEnter();
  }
  componentWillLeave(callback) {
    const tl = this.appearanceTimeline;
    const titleTween = TweenMax.to(`#title${this.props.project.id} .title-block`, 1, { css: { y: '150%' } });
    tl.add(titleTween, 'leave');
    tl.addCallback(callback, 'endLeave');
    tl.seek('leave');
    tl.tweenTo('endLeave');
  }
  componentDidLeave() {
    this.props.onDidLeave();
  }
  onTitleBlocksReady() {
    if (!this.entered && !this.transitioning) {
      this.enter(this.enterCallback);
    }
  }
  handleHover(hover, e) {
    if (!this.transitioning) {
      if (hover) {
        this.hoverTimeline.play();
      } else if (!hover && e.relatedTarget.className === 'project-list-description-panel') {
        this.hoverTimeline.reverse();
      }
    }
  }
  render() {
    const { project, next, prev, linkPrefix } = this.props;
    const key = project.id;
    const controls = <ListControls
      {...this.props}
    />;
    const even = project.order % 2 === 0;
    const menuUnderlay = <div id={'menuUnderlay'+key} className="menu-underlay"></div>;
    return (
      <div id={'container'+key} className={'project-list-container container' + (even ? ' project-list-container-even ' : ' ')}>
        {menuUnderlay}
        <TextPanel
          ref="textPanel"
          text={project.description}
          className="project-list-description-panel"
          id={'panel'+key}
        />
        <Cover
          ref="cover"
          className="project-list-cover"
          imageUrl={project.image}
          onMouseEnter={this.handleHover.bind(this, true)}
          onMouseLeave={this.handleHover.bind(this, false)}
          id={'cover'+key}
          stickImageTo={even ? 'left' : 'right'}
        />
        <Title
          ref="title"
          className="project-list-title"
          title={project.title}
          id={'title'+key}
          onBlocksReady={this.onTitleBlocksReady.bind(this)}
        />
        {controls}
      </div>
    );
  }
}
