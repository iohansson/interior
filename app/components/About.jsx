import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import Page from './Page.jsx';
import PageStore from '../page/store';
import './css/about.css';

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
      next: PageStore.isLast(pageId || page.id) ? null : next,
      prev: PageStore.isFirst(pageId || page.id) ? null : prev
    };
    if (wait) {
      this.nextState = newState;
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
    this.update(nextProps, false);
  }
  pageDidLeave() {
  }
  render() {
    const { page } = this.state;
    const pageView = page ? <Page className="page-about" {...this.state} linkPrefix="/design/about/" key={page.id} onDidLeave={this.pageDidLeave.bind(this)} /> : <div key={'stub'}></div>;
    return (
      <ReactTransitionGroup>
        { pageView }
      </ReactTransitionGroup>
    );
  }
}
