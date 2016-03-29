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
        <svg width="32" height="19.687" viewBox="0 0 29.258 18">
          <image x="-1.371" width="32" height="18" href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAUCAMAAAAweHR+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABGlBMVEUAAADOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4AAAAffOQwAAAAXHRSTlMAMJPW+/nRiyQThLmzbQcNofyPBhDbwRbSvw6DcQnPtgLUuLwf7Ap9XfMUxqJX6ceS/drJ6x7nRHLCn3pAWLABHBv66AgPiWUroK9wFci7Q5T+BCLtKpD098sM05eWb4YAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABBUlEQVQoz33S11bCQBAG4FGxBUGCotgFBRQQjAh2UYwdBRsW5v2fw+zORIash/9i9589316kAKgMDY+EcHRsfAJEJq3wVCTKw3QMOXZ85o/MJtTJHKH5JPaysOibJTpYVn1lFWXW1tmkaE6rHsf+RNjYNG54ddMOmEyWDI85r+YwmC1ptvNeLRimKM2OqiXDlIXZ1dUxzF7PVOh1hQaY/SrVmmEKvnEOdDmEI8Mc++ZE76f2P89+xua8rraLEsJlI0CuXDKJa7W6FUSAm4C55W9xp9d7VCZa7iMPdfkPPaI20HwS5DkrScthA277hUXDepXk7R19A/DRSX3i17dVlQJ+unTzF3W7j8uax5oVAAAAAElFTkSuQmCC"/>
        </svg>
      </div>
    );
  }
}