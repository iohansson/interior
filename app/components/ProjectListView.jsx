import React from 'react';
import './css/project-list-view.css';
import ProjectListContainer from './ProjectListContainer.jsx';

const project = {
  title: 'Now that we know who you are',
  description: 'Open plan spaces address the large mature garden, a double height' +
  'space floods the core of the building with natural light and the' +
  'new first floor balconies take advantage of the grounds and the' +
  'fields beyond.',
  image: require('../images/sample_interior.jpg'),
  order: 1
};

export default class ProjectListView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ProjectListContainer project={project} />
    );
  }
}
