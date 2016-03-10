import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Index from './components/Index.jsx';
import Projects from './components/Projects.jsx';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path="projects" component={Projects}></Route>
    </Route>
  </Router>,
document.getElementById('app'));
