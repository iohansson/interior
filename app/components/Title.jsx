import React from 'react';
import ReactDOM from 'react-dom';
import './css/title.css';

export default class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [
        props.title
      ]
    };
  }
  componentDidMount() {
    const { title } = this.props;
    const style = window.getComputedStyle(ReactDOM.findDOMNode(this));
    const family = style.getPropertyValue('font-family');
    const size = style.getPropertyValue('font-size');
    const weight = style.getPropertyValue('font-weight');
    const width = parseInt(style.getPropertyValue('width'), 10);
    const textWidth = parseInt(this.getWidthOfText(title, family, size, weight), 10);
    const nblocks = textWidth / width;
    const words = title.split(' ');
    const len = title.length;
    const symsInBlock = Math.floor(len / nblocks);
    let blocks = [];
    while (words.length) {
      let syms = 0;
      let block = [];
      while (syms < symsInBlock && words.length) {
        let word = words.shift();
        if (syms + word.length > symsInBlock) {
          words.unshift(word);
          break;
        }
        block.push(word);
        syms += word.length + 1;
      }
      blocks.push(block.join(' '));
    }

    this.setState({
      blocks
    });
  }
  componentDidUpdate() {
    const { onBlocksReady } = this.props;
    if (typeof onBlocksReady === 'function') {
      this.props.onBlocksReady();
    }
  }
  getWidthOfText(txt, fontname, fontsize, fontweight = 'normal') {
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    ctx.font = fontweight + ' ' + fontsize + ' ' + fontname;

    const length = ctx.measureText(txt).width;

    return length;
  }
  render() {
    const blocks = this.state.blocks.map((block, i) =>
      <span className="title-block-container" key={i}>
        <span className="title-block">
          {block}
        </span>
      </span>
    );
    return (
      <h1
        ref="title"
        className={this.props.className}
        id={this.props.id}
      >
        {blocks}
      </h1>
    );
  }
}
