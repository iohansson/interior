import './css/list-controls.css';
import React from 'react';
import Arrow from './Arrow.jsx';

export default class ListControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { next, prev, linkPrefix } = this.props;
    const prevLink = <Arrow
      className={'control-arrow control-arrow-prev' + (prev === null ? ' control-arrow-inactive' : '')}
      type="up"
      link={ linkPrefix + prev }
      onNavigate={this.props.onNavigate}
      linkTo={prev}
      active={prev !== null} />;
    const nextLink = <Arrow
      className={'control-arrow control-arrow-next' + (next === null ? ' control-arrow-inactive' : '')}
      type="down"
      link={ linkPrefix + next }
      onNavigate={this.props.onNavigate}
      linkTo={next}
      active={next !== null } />;
    return (
      <div className="list-controls-container">
        {prevLink}
        {nextLink}
      </div>
    );
  }
}
