// takes in windows width to
// compute pixel values required
// for f1 to work
function states(width) {
  return {
    idle: {
      cover: {
        style: {
          width: Math.round(0.5333 * width),
          color: [206, 206, 206, 1]
        }
      },
      textPanel: {
        style: {
          width: Math.round(0.4667 * width)
        }
      },
      image: {
        style: {
          translate: [0, 0, 0]
        }
      }
    },
    hover: {
      cover: {
        style: {
          width: Math.round(0.5833 * width),
          color: [133, 124, 192, 1]
        }
      },
      textPanel: {
        style: {
          width: Math.round(0.4167 * width)
        }
      },
      image: {
        style: {
          translate: [-100, 0, 0]
        }
      }
    }
  };
}

export default states;
