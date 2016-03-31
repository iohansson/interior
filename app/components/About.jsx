import React from 'react';
import Title from './Title.jsx';
import './css/about.css';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container page-about">
        <Title title={'People ignore design that ignores people'} className="page-title" />
      </div>
    );
  }
}
