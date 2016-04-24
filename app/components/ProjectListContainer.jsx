import React from 'react';
import ProjectListView from './ProjectListView.jsx';
import ListControls from './ListControls.jsx';
import ProjectStore from '../project/store';
import ReactTransitionGroup from 'react-addons-transition-group';
import { hashHistory } from 'react-router';

export default class ProjectListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      next: null,
      prev: null
    };
  }
  update(props, wait) {
    const { projectId } = props.params;
    const project = projectId ? ProjectStore.findById(projectId) : ProjectStore.first();
    const { next, prev } = ProjectStore.findNeighbours(projectId || project.id);
    const newState = {
      project,
      next,
      prev
    };
    if (wait) {
      this.nextState = newState;
      this.setState({
        project: null
      });
    } else {
      this.setState(newState);
    }
  }
  componentDidMount() {
    this.update(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.update(nextProps, true);
  }
  projectDidLeave() {
    this.setState(this.nextState);
  }
  render() {
    const { project } = this.state;
    const projectView = project ? <ProjectListView {...this.state} key={project.id} onDidLeave={this.projectDidLeave.bind(this)} /> : null;
    const controls = <ListControls {...this.state} linkPrefix="/design/projects/list/" />;
    return (
      <div className="container">
        {controls}
        <ReactTransitionGroup>
          { projectView }
        </ReactTransitionGroup>
      </div>
    );
  }
  static resolve(nextState, replace, callback) {
    const { projectId } = nextState.params;
    if (!projectId) {
      replace('/design/projects/list/' + ProjectStore.first().id);
    }
    const project = ProjectStore.findById(projectId);
    callback();
  }
}
