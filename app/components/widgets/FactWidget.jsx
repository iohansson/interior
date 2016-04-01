import React from 'react';
import './css/fact-widget.css';

export default class FactWidget extends React.Component {
  render() {
    const { number, title, description, align } = this.props;
    return (
      <div className={'widget widget-fact widget-fact-' + align}>
        <span className="widget-fact-number">{number}</span>
        <span className="widget-fact-title">{title}</span>
        <p className="widget-fact-description">{description}</p>
      </div>
    );
  }
}
