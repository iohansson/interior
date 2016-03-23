import React from 'react';
import './css/project-list-container.css';
import Cover from './Cover.jsx';
import TextPanel from './TextPanel.jsx';
import Arrow from './Arrow.jsx';
import ReactF1 from 'react-f1';
import states from './animations/projectListHoverStates';
import animationTransitions from './animations/projectListHoverTransitions';

export default class ProjectListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animationState: 'idle'
    };
  }
  handleHover(hover) {
    this.setState({
      animationState: hover ? 'hover' : 'idle'
    });
  }
  render() {
    const { project } = this.props;
    const animationStates = states(document.documentElement.clientWidth);
    return (
      <ReactF1
        go={this.state.animationState}
        states={animationStates}
        transitions={animationTransitions}
        className="project-container container">
        <TextPanel
          f1="textPanel"
          ref="textPanel"
          text={project.description}
          className="project-list-description-panel"
          showControls={project.order % 2 === 0}
        />
        <Cover
          f1={ { cover: 'cover', image: 'image' } }
          ref="cover"
          className="project-list-cover"
          imageUrl={project.image}
          title={project.title}
          onMouseEnter={this.handleHover.bind(this, true)}
          onMouseLeave={this.handleHover.bind(this, false)}
          showControls={project.order % 2 === 1}
        />
      </ReactF1>
    );
  }
}
