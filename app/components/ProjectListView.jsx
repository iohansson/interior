import React from 'react';
import './css/project-list-view.css';
import Image from './Image.jsx';
import { Motion, spring } from 'react-motion';

export default class ProjectListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }
  handleHover(hover) {
    this.setState({hover});
  }
  render() {
    let style = this.state.hover ? this.getFinalHoverStyle() : this.getInitialHoverStyle();
    return (
      <div className="project-container container">
        <Motion style={style['aside']} key={'aside'}>
          {({width}) =>
            <aside
              ref="aside"
              className="project-list-description-panel"
              style={{width: width + '%'}}
            >
              <p className="project-list-description">
                Open plan spaces address the large mature garden, a double height
                space floods the core of the building with natural light and the
                new first floor balconies take advantage of the grounds and the
                fields beyond.
              </p>
            </aside>
          }
        </Motion>
        <Motion style={style['title']} key={'title'}>
          {({marginLeft}) =>
            <h1
              ref="title"
              className="project-list-title"
              onMouseEnter={this.handleHover.bind(this, true)}
              onMouseLeave={this.handleHover.bind(this, false)}
              style={{marginLeft: marginLeft + '%'}}
            >
              Now that we know who you are
            </h1>
          }
        </Motion>
        <Motion style={style['image']} key={'image'}>
          {({width}) => {
            console.log(spring(53.33));
            return(
              <Image
                ref="image"
                className="project-list-image"
                src={require('../images/sample_interior.jpg')}
                onMouseEnter={this.handleHover.bind(this, true)}
                onMouseLeave={this.handleHover.bind(this, false)}
                style={{width: width + '%'}}
              />
            );}
          }
        </Motion>
      </div>
    );
  }

  getInitialHoverStyle() {
    return {
      aside: {
        width: spring(46.67)
      },
      image: {
        width: spring(53.33)
      },
      title: {
        marginLeft: spring(38)
      }
    };
  }
  getFinalHoverStyle() {
    return {
      aside: {
        width: spring(41.67)
      },
      image: {
        width: spring(58.33)
      },
      title: {
        marginLeft: spring(33)
      }
    };
  }
}
