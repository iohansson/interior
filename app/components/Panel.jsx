import React from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, style, children } = this.props;
    return (
      <div
        className={className}
        style={style}
        data-f1={this.props['data-f1']}
      >
        {children}
      </div>
    );
  }
}
