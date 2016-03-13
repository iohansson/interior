import 'normalize.css';
import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Index from './components/Index.jsx';
import Design from './components/Design.jsx';
import Projects from './components/Projects.jsx';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path="design" component={Design}></Route>
    </Route>
  </Router>,
document.getElementById('app'));
