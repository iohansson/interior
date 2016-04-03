import React from 'react';
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';
import ListControls from './ListControls.jsx';
import WidgetsList from './widgets/WidgetsList.jsx';
import Image from './Image.jsx';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';

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
    const controls = <ListControls {...this.props} />;
    return (
      <div id={'page'+id} className={'container page-container ' + (className ? className : '')}>
        {imageView}
        {titleView}
        {paragraphView}
        {widgetsView}
        {controls}
      </div>
    );
  }
  setAppearanceTimeline() {
    const tl = new TimelineMax();
    const key = this.props.page.id;
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
    tl.set('#page'+key, { css: { y: '100%' } }, 'init');
    tl.to('#page'+key, duration, { css: { y: '0%' } }, 'enter');

    // leave
    tl.fromTo('#page'+key, duration, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0.8, opacity: 0 } }, 'leave');

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
    tl.add(titleTween, 'enter2');
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
  componentWillLeave(callback) {
    const tl = this.appearanceTimeline;
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
}
