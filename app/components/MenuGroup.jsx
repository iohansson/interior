import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import MenuItem from './MenuItem.jsx';
import CloseButton from './CloseButton.jsx';
import { hashHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TweenMax from 'gsap/src/minified/TweenMax.min';

export default class MenuGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      activeItemId: null,
      highlightedItemId: null
    };
  }
  onLocationChange(newLocation) {
    const path = newLocation.pathname.toLowerCase();
    const activeItems = this.props.group.children.filter((item) => {
      return path.indexOf('/'+item.name.toLowerCase()) > -1;
    });
    if (activeItems.length) {
      this.setState({
        activeItemId: activeItems[0].id
      });
    } else {
      this.setState({
        activeItemId: null
      });
    }
  }
  componentDidMount() {
    this.historyUnlisten = hashHistory.listen(this.onLocationChange.bind(this));
  }
  componentWillUnmount() {
    this.historyUnlisten();
  }
  render() {
    const { group, active, onClose } = this.props;
    const { activeItemId, highlightedItemId } = this.state;
    const { id, name, children } = group;
    const renderedItems = children.map(
      (item, i) => {
        const elt = <MenuItem
          key={item.id}
          item={item}
          prefix={name+'/'}
          active={item.id === activeItemId}
          highlighted={item.id === highlightedItemId}
          ref={(elt) => { this.highlight.call(this, elt) }}
          onMouseEnter={ item.id !== activeItemId ? this.handleItemHover.bind(this, item.id, true) : null }
          onMouseLeave={ item.id !== activeItemId ? this.handleItemHover.bind(this, item.id, false) : null }
        />;

        return elt;
      }
    );
    const header = active ?
      <div className="menu-group-header-container close-container" onClick={onClose}>
        <ReactCSSTransitionGroup transitionName="bugs" transitionAppear={true} transitionAppearTimeout={600}>
          <CloseButton key="close" />
        </ReactCSSTransitionGroup>
        <span className="menu-group-header">{name}</span>
      </div> :
      <Link
        className="menu-link menu-group-link"
        to={name}
        activeClassName="menu-link-active"
      >
        {name}
      </Link>;
    const highlighter = active ? <div className="menu-highlighter" ref="highlighter"></div> : null;
    const body = active ?
      <ul className="menu-list menu-group-list">
        {renderedItems}
      </ul> :
      null;
    const classes = 'menu-list-item menu-group' + (active ? ' menu-group-active' : '');
    return (
      <li className={classes}>
          {header}
          {highlighter}
          {body}
      </li>
    );
  }
  highlight(elt) {
    const {highlightedItemId} = this.state;
    if(elt && (elt.props.highlighted || (elt.props.active && !highlightedItemId))) {
      const duration = elt.props.highlighted ? 0.5 : 0.3;
      const domElt = ReactDOM.findDOMNode(elt);
      const baseOffset = domElt.offsetLeft;
      const link = elt.refs.link;
      const domLink = ReactDOM.findDOMNode(link);
      const linkOffset = domLink.offsetLeft;
      const highlighter = this.refs.highlighter;
      const domHighlighter = ReactDOM.findDOMNode(highlighter);
      const highlighterWidth = domHighlighter.clientWidth;
      const linkWidth = domLink.offsetWidth;
      TweenMax.to('.menu-highlighter', duration, { css: { x: baseOffset + linkOffset + (linkWidth - highlighterWidth) / 2 }});
    }
  }
  handleItemHover(id, hover) {
    this.setState({
      highlightedItemId: hover ? id : null
    });
  }
}
