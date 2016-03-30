import React from 'react';

export default class Logo extends React.Component {
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
        className="logo-svg-container"
      >
        <svg className="logo-svg" width="100%" height="100%" viewBox="0 0 34 20">
          <path d="M3.51,3.59A8.19,8.19,0,0,1,9.65,1a8.11,8.11,0,0,1,6.12,2.61A8.87,8.87,0,0,1,18.25,10a8.91,8.91,0,0,1-2.53,6.4A8.27,8.27,0,0,1,9.54,19a8.22,8.22,0,0,1-6-2.56A8.74,8.74,0,0,1,1,9.93,8.73,8.73,0,0,1,3.51,3.59ZM23.89,15V5q0.45-3.77,3.55-3.77a3.41,3.41,0,0,1,2.49,1,3.32,3.32,0,0,1,1,2.46A4.63,4.63,0,0,1,30.19,7C29.94,7.44,26.23,12,23.89,15Zm6.83-1.24L26.4,19H33V10.91Q32,12.18,30.71,13.76Z"/>
        </svg>
      </div>
    );
  }
}
