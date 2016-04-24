import React from 'react';
import App from '../components/App.jsx';
import Index from '../components/Index.jsx';
import Design from '../components/Design.jsx';
import Projects from '../components/Projects.jsx';
import ProjectListContainer from '../components/ProjectListContainer.jsx';
import ProjectGalleryContainer from '../components/ProjectGalleryContainer.jsx';
import About from '../components/About.jsx';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path="design" component={Design}>
        <IndexRedirect to="projects" />
        <Route path="projects" component={Projects}>
          <Route path="list(/:projectId)" component={ProjectListContainer} onEnter={ProjectListContainer.resolve} />
          <IndexRedirect to="list" />
          <Route path="gallery" component={ProjectGalleryContainer} />
        </Route>
        <Route path="about(/:pageId)" component={About} onEnter={About.resolve} />
      </Route>
    </Route>
  </Router>
);

export default routes;
