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
  enter(callback, delay) {
    const tl = new TimelineMax({onComplete: callback});
    const key = this.props.project.id;
    tl.fromTo('#container'+key, 0, { css: { opacity: 0} }, { css: { opacity: 1}, delay: delay });
    tl.set('#container'+key, { zIndex: 100 });
    tl.fromTo('#cover'+key, 1, { width: '0%' }, { width: '53.33%', delay: delay });
    tl.fromTo('#panel'+key, 1, { width: '100%' }, { width: '46.67%', delay: delay }, 0);
    tl.fromTo('#panel'+key+'paragraph', 1, { opacity: 0 }, { opacity: 1, delay: delay }, 1);
    tl.play();
  }
  componentWillAppear(callback) {
    this.enter(callback, 0);
  }
  componentWillEnter(callback) {
    this.enter(callback, 1);
  }
  componentWillLeave(callback) {
    const tl = new TimelineMax({onComplete: callback});
    const key = this.props.project.id;
    tl.fromTo('#panel'+key, 1, { css: { width: '46.67%' } }, { css: { width: '100%' } });
    tl.fromTo('#cover'+key, 1, { css: { width: '53.33%' } }, { css: { width: '0%' } }, 0);
    tl.fromTo('#panel'+key+'paragraph', 1, { opacity: 1 }, { opacity: 0 }, 0);
    tl.play();
    TweenMax.to('.title-block', 0.7, { y: '150%' });
  }
  handleHover(hover, e) {
    const key = this.props.project.id;
    if (hover || (!hover && e.relatedTarget.className === 'project-list-description-panel')) {
      const styles = {
        title: {
          x: hover ? (this.props.project.order % 2 === 0 ? 100 : -100) : 0,
          color: hover ? '#857cc0' : '#cecece'
        },
        cover: {
          width: hover ? '58.33%' : '51.33%'
        },
        image: {
          x: hover ? -100 : 0
        },
        paragraph: {
          x: hover ? (this.props.project.order % 2 === 0 ? 50 : -50) : 0
        }
      };
      const tl = new TimelineMax();
      tl.to('#cover'+key, 0.5, { width: styles.cover.width });
      tl.to('#title'+key, 0.5, { x: styles.title.x, color: styles.title.color }, 0);
      tl.to('#panel'+key+'paragraph', 0.5, { x: styles.paragraph.x }, 0);
      tl.to('#cover'+key+'image', 0.75, { x: styles.image.x });
      tl.play();
    }
  }
  render() {
    const { project, next, prev, linkPrefix } = this.props;
    const key = project.id;
    const controls = <ListControls
      {...this.props}
    />;
    const even = project.order % 2 === 0;
    return (
      <div id={'container'+key} className={'project-list-container container' + (even ? ' project-list-container-even ' : ' ')}>
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
        />
        <Title
          ref="title"
          className="project-list-title"
          title={project.title}
          id={'title'+key}
        />
        {controls}
      </div>
    );
  }
}
