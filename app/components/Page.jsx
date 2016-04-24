import React from 'react';
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';
import WidgetsList from './widgets/WidgetsList.jsx';
import Image from './Image.jsx';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';
import './css/page.css';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._setAppearanceTimeline();
  }
  componentWillAppear(callback) {
    this._setupEnter(callback);
  }
  componentWillEnter(callback) {
    this._setupEnter(callback);
  }
  componentDidAppear() {
    this._didEnter();
  }
  componentDidEnter() {
    this._didEnter();
  }
  componentWillLeave(callback) {
    const tl = this._appearanceTimeline;
    const blocks = Array.prototype.slice.call(document.querySelectorAll(`#title${this.props.page.id} .title-block`), 0);
    TweenMax.staggerTo(blocks, 0.5, { css: { y: '150%' } }, 0.1);
    tl.addCallback(callback, 'endLeave');
    tl.seek('leave');
    tl.tweenTo('endLeave');
  }
  componentDidLeave() {
    this.props.onDidLeave();
  }
  render() {
    const { page, className } = this.props;
    const { title, paragraph, widgets, image, id } = page;
    const titleView = title ?
      <Title
        id={'title'+id}
        className="page-title"
        title={title}
        onBlocksReady={this.onTitleBlocksReady.bind(this)}
      /> : null;
    const paragraphView = paragraph ? <Paragraph id={'paragraph'+page.id} className="page-paragraph" text={paragraph} /> : null;
    const widgetsView = widgets ? <WidgetsList className="page-widgets-list" widgets={widgets} /> : null;
    const imageView = image ? <Image id={'image'+page.id} className="page" imageUrl={image} drawOverlay={true} /> : null;
    return (
      <div id={'page'+id} className={'container page-container ' + (className ? className : '')}>
        {imageView}
        {titleView}
        {paragraphView}
        {widgetsView}
      </div>
    );
  }
  onTitleBlocksReady() {
    if (!this._transitioning && !this._entered) {
      this._enter(this._enterCallback);
    }
  }
  _setupEnter(callback) {
    const tl = this._appearanceTimeline;
    tl.seek('init');
    tl.tweenTo('enter');
    this._enterCallback = callback;
    this._entered = false;
    if (!this.props.page.title) {
      this._enter(callback);
    }
  }
  _enter(callback) {
    this._transitioning = true;
    const tl = this._appearanceTimeline;
    const blocks = Array.prototype.slice.call(document.querySelectorAll(`#title${this.props.page.id} .title-block`), 0);
    blocks.reverse();
    TweenMax.staggerTo(blocks, 0.5, { css: { y: '0%' } }, 0.1);
    tl.addCallback(callback, 'endEnter');
    tl.seek('enter');
    tl.tweenTo('endEnter');
  }
  _didEnter() {
    this._entered = true;
    this._transitioning = false;
  }
  _setAppearanceTimeline() {
    const tl = new TimelineMax();
    const key = this.props.page.id;
    const start = 1;
    const duration = 0.7;
    // labels
    tl.addLabel('init', start);
    tl.addLabel('enter', start + duration);
    tl.addLabel('endEnter', start + duration * 2);
    tl.addLabel('leave', start + duration * 3);
    tl.addLabel('endLeave', start + duration * 4);
    // enter
    tl.set('#image'+key, { css: { opacity: 0 } }, 'init');
    tl.set('#paragraph'+key, { css: { opacity: 0, y: '-25%' } }, 'init');
    tl.to('#image'+key, duration, { css: { opacity: 1 } }, 'enter');
    tl.to('#paragraph'+key, duration, { css: { opacity: 1, y: '-50%' } }, 'enter');

    // leave
    tl.fromTo('#image'+key, duration, { css: { opacity: 1 } }, { css: { opacity: 0 } }, 'leave');
    tl.fromTo('#paragraph'+key, duration, { css: { opacity: 1, y: '-50%' } }, { css: { opacity: 0, y: '-25%' } }, 'leave');

    tl.pause();

    this._appearanceTimeline = tl;
  }
}
