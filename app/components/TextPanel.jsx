import React from 'react';
import Panel from './Panel.jsx';
import Paragraph from './Paragraph.jsx';

export default class TextPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Panel
        style={this.props.style}
        className={this.props.className}
      >
        <Paragraph
          ref="paragraph"
          text={this.props.text}
          className={this.props.className + '-paragraph'}
        />
      </Panel>
    );
  }
}
