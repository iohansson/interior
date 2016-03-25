import React from 'react';
import ReactDOM from 'react-dom';
import './css/project-list-view.css';
import './css/project-list-container.css';
import Cover from './Cover.jsx';
import TextPanel from './TextPanel.jsx';
import ListControls from './ListControls.jsx';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';

export default class ProjectListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  enter(callback) {
    TweenMax.fromTo('#cover', 1.5, { width: '0%' }, { width: '53.33%', onComplete: callback });
    TweenMax.fromTo('#panel', 1.5, { width: '98%' }, { width: '46.67%', onComplete: callback });
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
  handleHover(hover) {
  }
  render() {
    const { project, next, prev, linkPrefix } = this.props;
    const controls = <ListControls {...this.props} />
    const even = project.order % 2 === 0;
    return (
      <div className={'project-list-container container ' + (even ? 'project-list-container-even' : '')}>
        <TextPanel
          ref="textPanel"
          text={project.description}
          className="project-list-description-panel"
          showControls={even}
          controls={controls}
          id="panel"
        />
        <Cover
          ref="cover"
          className="project-list-cover"
          imageUrl={project.image}
          title={project.title}
          onMouseEnter={this.handleHover.bind(this, true)}
          onMouseLeave={this.handleHover.bind(this, false)}
          showControls={!even}
          controls={controls}
          id="cover"
        />
      </div>
    );
  }
}
