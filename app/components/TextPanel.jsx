import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Panel from './Panel.jsx';
import Paragraph from './Paragraph.jsx';
import raf from 'raf';

export default class TextPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }
  show() {
    this.setState({
      text: this.props.text
    });
  }
  componentDidMount() {
    raf(this.show.bind(this));
  }
  render() {
    const { style, className, f1 } = this.props;
    const { text } = this.state;
    return (
      <Panel
        style={style}
        className={className}
        data-f1={f1 !== undefined ? f1 : ''}
      >
        <ReactCSSTransitionGroup transitionName="paragraph" transitionEnterTimeout={1000} transitionLeaveTimeout={600}>
          <Paragraph
            ref="paragraph"
            text={text}
            className={className + '-paragraph'}
            key="prg"
          />
        </ReactCSSTransitionGroup>
      </Panel>
    );
  }
}
