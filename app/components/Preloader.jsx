import React from 'react';

export default class Preloader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }
  updateProgress() {
    const nbFiles = this.props.loadList.length;
    let newProgress = 0;
    for (let key in this._progress) {
      if (this._progress.hasOwnProperty(key)) {
        newProgress += this._progress[key];
      }
    }
    this.setState({
      progress: newProgress / nbFiles
    });
  }
  onProgress(file, e) {
    this._progress[file] = e.loaded / e.total;
    this.updateProgress();
  }
  onLoad(file, e) {
    this._progress[file] = 1;
    this.updateProgress();
  }
  load(file) {
    const request = new XMLHttpRequest(), self = this;
    request.open('GET', file, true);
    request.onprogress = this.onProgress.bind(this, file);
    //request.onload = this.onLoad.bind(this, file);
    this._progress[file] = 0;
    // Fire!
    request.send();
  }
  loadFiles() {
    this._progress = {};
    const {loadList} = this.props;
    loadList.forEach(file => {
      this.load(file);
    });
  }
  componentDidMount() {
    this.loadFiles();
  }
  render() {
    const {progress} = this.state;
    const {preloader, children} = this.props;
    const view = progress < 1 ? preloader : children;

    return view;
  }
}
