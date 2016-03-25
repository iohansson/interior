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
  enter(callback) {
    TweenMax.fromTo('#cover', 1.5, { width: '0%' }, { width: '53.33%', onComplete: callback });
    TweenMax.fromTo('#panel', 1.5, { width: '100%' }, { width: '46.67%', onComplete: callback });
  }
  componentWillAppear(callback) {
    this.enter(callback);
  }
  componentWillEnter(callback) {
    this.enter(callback);
  }
  componentWillLeave(callback) {
    const tl = new TimelineMax({onComplete: callback});
    const textPanel = ReactDOM.findDOMNode(this.refs.textPanel);
    const cover = ReactDOM.findDOMNode(this.refs.cover);
    tl.to(textPanel, 1, { width: '100%' });
    tl.to(cover, 1, { width: 0 }, "-=1");
    tl.play();
  }
  componentDidLeave() {
  }
  handleHover(hover, e) {
    if (hover || (!hover && e.relatedTarget.className === 'project-list-description-panel')) {
      const styles = {
        title: {
          x: hover ? 100 : 0,
          color: hover ? '#857cc0' : '#cecece'
        },
        cover: {
          width: hover ? '58.33%' : '51.33%'
        },
        image: {
          x: hover ? -100 : 0
        }
      };
      const tl = new TimelineMax();
      tl.to('#cover', 0.5, { width: styles.cover.width });
      tl.to('#title', 0.5, { x: styles.title.x, color: styles.title.color }, 0);
      tl.to('#projectCoverImage', 0.75, { x: styles.image.x });
      tl.play();
    }
  }
  render() {
    const { project, next, prev, linkPrefix } = this.props;
    const controls = <ListControls
      {...this.props}
    />;
    const even = project.order % 2 === 0;
    return (
      <div className={'project-list-container container ' + (even ? 'project-list-container-even' : '')}>
        <TextPanel
          ref="textPanel"
          text={project.description}
          className="project-list-description-panel"
          id="panel"
        />
        <Cover
          ref="cover"
          className="project-list-cover"
          imageUrl={project.image}
          onMouseEnter={this.handleHover.bind(this, true)}
          onMouseLeave={this.handleHover.bind(this, false)}
          id="cover"
        />
        <Title
          ref="title"
          className="project-list-title"
          title={project.title}
          id="title"
        />
        {controls}
      </div>
    );
  }
}
