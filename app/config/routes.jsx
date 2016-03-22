import React from 'react';
import App from '../components/App.jsx';
import Index from '../components/Index.jsx';
import Design from '../components/Design.jsx';
import Projects from '../components/Projects.jsx';
import ProjectsList from '../components/ProjectsList.jsx';
import ProjectListView from '../components/ProjectListView.jsx';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path="design" component={Design}>
        <Route path="projects" component={Projects}>
          <Route path="list" component={ProjectsList}>
            <Route path=":projectId" component={ProjectListView}></Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
);

export default routes;
