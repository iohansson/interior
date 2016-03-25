import React from 'react';
import ProjectListView from './ProjectListView.jsx';
import ProjectStore from '../project/store';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class ProjectListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      next: null,
      prev: null
    };
  }
  update(props) {
    const { projectId } = props.params;
    const project = projectId ? ProjectStore.findById(projectId) : ProjectStore.first();
    const { next, prev } = ProjectStore.findNeighbours(projectId);

    this.setState({
      project,
      next,
      prev
    });
  }
  componentDidMount() {
    this.update(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }
  render() {
    const { project } = this.state;
    return (
      project ?
      <ReactTransitionGroup>
        <ProjectListView {...this.state} linkPrefix="/design/projects/list/" key={project.id} />
      </ReactTransitionGroup>
      : <div></div>
    );
  }
}
