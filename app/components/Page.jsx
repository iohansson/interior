import React from 'react';
import Title from './Title.jsx';
import ListControls from './ListControls.jsx';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { page, className } = this.props;
    const { title } = page;
    const titleView = title ? <Title className="page-title" title={title} /> : '';
    const controls = <ListControls {...this.props} />;
    return (
      <div className={'container page-container ' + (className ? className : '')}>
        {titleView}
        {controls}
      </div>
    );
  }
}
