import React from 'react';
import './css/project-list-view.css';
import Image from './Image.jsx';

export default class ProjectListView extends React.Component {
  componentWillMount() {
    console.log('project ' + this.props.params.projectId + ' will mount');
  }
  render() {
    return (
      <div className="project-container container">
        <aside className="project-list-description-panel">
          <p className="project-list-description">
            Open plan spaces address the large mature garden, a double height
            space floods the core of the building with natural light and the
            new first floor balconies take advantage of the grounds and the
            fields beyond.
          </p>
        </aside>
        <h1 className="project-list-title">
          Now that we know who you are
        </h1>
        <Image className="project-list-image" src={require('../images/sample_interior.jpg')} />
      </div>
    );
  }
}
