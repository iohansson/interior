import React from 'react';

export default class CloseButton extends React.Component {
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
        className="close-button-svg-container"
      >
        <svg className="close-button-svg" width="100%" height="100%" viewBox="0 0 25 25">
          <path id="bugLeftBottom" d="M12.6,12.6L12.6,12.6c-0.4,0.4-1,0.4-1.4,0L7.3,8.7c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0l3.9,3.9
        		C13,11.6,13,12.2,12.6,12.6z"/>
          <path id="bugLeftTop" d="M12.4,12.6L12.4,12.6c0.4,0.4,1,0.4,1.4,0l3.9-3.9c0.4-0.4,0.4-1,0-1.4l0,0c-0.4-0.4-1-0.4-1.4,0l-3.9,3.9
        		C12,11.6,12,12.2,12.4,12.6z"/>
          <path id="bugRightTop" d="M12.4,12.4L12.4,12.4c0.4-0.4,1-0.4,1.4,0l3.9,3.9c0.4,0.4,0.4,1,0,1.4l0,0c-0.4,0.4-1,0.4-1.4,0l-3.9-3.9
        		C12,13.4,12,12.8,12.4,12.4z"/>
          <path id="bugRightBottom" d="M12.6,12.4L12.6,12.4c-0.4-0.4-1-0.4-1.4,0l-3.9,3.9c-0.4,0.4-0.4,1,0,1.4l0,0c0.4,0.4,1,0.4,1.4,0l3.9-3.9
        		C13,13.4,13,12.8,12.6,12.4z"/>
        </svg>
      </div>
    );
  }
}
