import React from 'react';

export default class GridIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div
        {...this.props}
        className="grid-icon-svg-container"
      >
        <svg className="grid-icon-svg" width="100%" height="100%" viewBox="0 0 17 17">
          <rect width="7" height="7" x="0" y="0" />
          <rect width="7" height="7" x="10" y="0" />
          <rect width="7" height="7" x="0" y="10" />
          <rect width="7" height="7" x="10" y="10" />
        </svg>
      </div>
    );
  }
}
