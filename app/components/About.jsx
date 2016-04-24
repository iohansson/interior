import React from 'react';
import Page from './Page.jsx';
import ListControls from './ListControls.jsx';
import PageStore from '../page/store';
import './css/about.css';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null,
      next: null,
      prev: null
    };
  }
  update(props, wait) {
    const { pageId } = props.params;
    const page = pageId ? PageStore.findById(pageId) : PageStore.first();
    const { next, prev } = PageStore.findNeighbours(pageId || page.id);
    const newState = {
      page,
      next,
      prev
    };
    if (wait) {
      this._nextState = newState;
      this.setState({
        page: null
      });
    } else {
      this.setState(newState);
    }
  }
  componentDidMount() {
    this.update(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.update(nextProps, true);
  }
  pageDidLeave() {
    this.setState(this._nextState);
  }
  render() {
    const { page } = this.state;
    const pageView = page ? <Page {...this.state} key={page.id} onDidLeave={this.pageDidLeave.bind(this)} /> : null;
    const controls = <ListControls {...this.state} linkPrefix="/design/about/" />;
    return (
      <div className="page-controller page-about container">
        { controls }
        <ReactTransitionGroup>
          { pageView }
        </ReactTransitionGroup>
      </div>
    );
  }
  static resolve(nextState, replace, callback) {
    const { pageId } = nextState.params;
    if (!pageId) {
      replace('/design/about/' + PageStore.first().id);
    }
    const page = PageStore.findById(pageId);
    callback();
  }
}
