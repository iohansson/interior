import React from 'react';
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';
import ListControls from './ListControls.jsx';
import WidgetsList from './widgets/WidgetsList.jsx';
import Image from './Image.jsx';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';
import './css/page.css';
import ControlCatcher from './ControlCatcher.jsx';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  buildWidget(widget) {
    const { type } = widget;
    switch (type) {
      case 'fact':
        return <FactWidget {...widget} />;
    }
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
      /> : '';
    const paragraphView = paragraph ? <Paragraph className="page-paragraph" text={paragraph} /> : '';
    const widgetsView = widgets ? <WidgetsList className="page-widgets-list" widgets={widgets} /> : '';
    const imageView = image ? <Image className="page" imageUrl={image} drawOverlay={true} /> : '';
    const controls = <ListControls {...this.props} onNavigate={this.setupLeave.bind(this)} />;
    const controlCatcher = <ControlCatcher {...this.props} onNavigate={this.setupLeave.bind(this)} />;
    return (
      <div id={'page'+id} className={'container page-container ' + (className ? className : '')}>
        {imageView}
        {titleView}
        {paragraphView}
        {widgetsView}
        {controls}
        {controlCatcher}
      </div>
    );
  }
  setAppearanceTimeline() {
    const tl = new TimelineMax();
    const key = this.props.page.id;
    const start = 1;
    const duration = 1;
    // labels
    tl.addLabel('initNext', start);
    tl.addLabel('enterNext', start + duration);
    tl.addLabel('enterNext2', start + duration * 2);
    tl.addLabel('endEnterNext', start + duration * 3);
    tl.addLabel('leavePrev', start + duration * 4);
    tl.addLabel('endLeavePrev', start + duration * 5);
    tl.addLabel('initPrev', start + duration * 6);
    tl.addLabel('enterPrev', start + duration * 7);
    tl.addLabel('enterPrev2', start + duration * 8);
    tl.addLabel('endEnterPrev', start + duration * 9);
    tl.addLabel('leaveNext', start + duration * 10);
    tl.addLabel('endLeaveNext', start + duration * 11);
    // enter
    tl.set('#page'+key, { css: { y: '100%' } }, 'initNext');
    tl.set('#page'+key, { css: { y: '-100%' } }, 'initPrev');
    tl.fromTo('#page'+key, duration, { css: { y: '100%' } }, { css: { y: '0%' } }, 'enterNext');
    tl.fromTo('#page'+key, duration, { css: { y: '-100%' } }, { css: { y: '0%' } }, 'enterPrev');

    // leave
    tl.fromTo('#page'+key, duration, { css: { y: '0%' } }, { css: { y: '100%' } }, 'leaveNext');
    tl.fromTo('#page'+key, duration, { css: { y: '0%' } }, { css: { y: '-100%' } }, 'leavePrev');

    tl.pause();

    this.appearanceTimeline = tl;
  }
  componentDidMount() {
    this.setAppearanceTimeline();
  }
  enter(callback) {
    this.transitioning = true;
    const tl = this.appearanceTimeline;
    const titleTween = TweenMax.to(`#title${this.props.page.id} .title-block`, 0.5, { css: { y: 0 } });
    tl.add(titleTween, this.isNext() ? 'enterNext2' : 'enterPrev2');
    tl.seek(this.isNext() ? 'enterNext' : 'enterPrev');
    tl.addCallback(callback, this.isNext() ? 'endEnterNext' : 'endEnterPrev');
    tl.tweenTo(this.isNext() ? 'endEnterNext' : 'endEnterPrev');
  }
  didEnter() {
    this.transitioning = false;
    this.entered = true;
  }
  isNext() {
    return (this.props.from === null) || ((this.props.page.id - this.props.from.id) > 0);
  }
  setupEnter(callback) {
    const tl = this.appearanceTimeline;
    //tl.seek(this.isNext() ? 'initNext' : 'initPrev');
    //tl.tweenTo(this.isNext() ? 'enterNext' : 'enterPrev');
    this.entered = false;
    if (this.props.page.title) {
      this.enterCallback = callback;
    } else {
      this.enter(callback);
    }
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
  setupLeave(nextId) {
    const next = (this.props.page.id - nextId) > 0;
    this._leaveStart = next ? 'leaveNext' : 'leavePrev';
    this._leaveEnd = next ? 'endLeaveNext' : 'endLeavePrev';
  }
  componentWillLeave(callback) {
    const tl = this.appearanceTimeline;
    tl.addCallback(callback, this._leaveEnd);
    tl.seek(this._leaveStart);
    tl.tweenTo(this._leaveEnd);
  }
  componentDidLeave() {
    this.props.onDidLeave();
  }
  onTitleBlocksReady() {
    if (!this.entered && !this.transitioning) {
      this.enter(this.enterCallback);
    }
  }
}
