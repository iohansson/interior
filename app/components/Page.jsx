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
  show() {
    if (this.props.page.title) {
      TweenMax.to('.title-block', 1, { css: { y: 0 } });
    }
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
      /> : null;
    const paragraphView = paragraph ? <Paragraph className="page-paragraph" text={paragraph} /> : null;
    const widgetsView = widgets ? <WidgetsList className="page-widgets-list" widgets={widgets} /> : null;
    const imageView = image ? <Image className="page" imageUrl={image} drawOverlay={true} /> : null;
    return (
      <div id={'page'+id} className={'container page-container ' + (className ? className : '')}>
        {imageView}
        {titleView}
        {paragraphView}
        {widgetsView}
      </div>
    );
  }
}
