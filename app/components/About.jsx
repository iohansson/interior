import React from 'react';
import Page from './Page.jsx';
import ListControls from './ListControls.jsx';
import PageStore from '../page/store';
import './css/about.css';
import TweenMax from 'gsap/src/minified/TweenMax.min';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: null,
      current: null
    };
  }
  resolve(nextState, replace, callback) {
    callback();
  }
  componentDidMount() {
    const pages = PageStore.findAll();
    this.setState({
      pages,
      current: (pages.length > 0 ? 0 : null)
    });
    this.updateWindowHeight();
    this._windowResize = window.addEventListener('resize', this.updateWindowHeight.bind(this));
  }
  componentDidUpdate() {
    TweenMax.to('#pagelist', 1, { css: { y: -this._windowHeight * this.state.current }, onComplete: this.onPageReady.bind(this) });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._windowResize);
  }
  navigate(n) {
    this.setState({ current: n });
  }
  updateWindowHeight() {
    this._windowHeight = window.innerHeight;
  }
  onPageReady() {
    const { pages, current } = this.state;
    this.refs['page'+pages[current].id].show();
  }
  render() {
    const { current, pages } = this.state;
    const { next, prev } = {
      next: (pages && (current < (pages.length - 1))) ? current + 1 : null,
      prev: (pages && (current > 0)) ? current - 1 : null
    };
    const pagesView = pages ? pages.map((page) => <li id={'page'+page.id} className="page-item" key={page.id}><Page ref={'page'+page.id} page={page} /></li>) : null;
    const controls = <ListControls prev={prev} next={next} linkPrefix="/design/about/" onNavigate={this.navigate.bind(this)} />;
    return (
      <div className="page-controller page-about">
        { controls }
        <ul className="page-list" id="pagelist">
          { pagesView }
        </ul>
      </div>
    );
  }
}
