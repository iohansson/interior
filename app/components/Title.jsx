import React from 'react';
import ReactDOM from 'react-dom';
import TweenMax from 'gsap/src/minified/TweenMax.min';

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
    const style = window.getComputedStyle(ReactDOM.findDOMNode(this));
    const family = style.getPropertyValue('font-family');
    const size = style.getPropertyValue('font-size');
    const width = parseInt(style.getPropertyValue('width'), 10);
    const textWidth = parseInt(this.getWidthOfText(this.props.title, family, size), 10);
    const nblocks = Math.ceil(textWidth / width);
    const words = this.props.title.split(' ');
    const len = this.props.title.length;
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
    this.props.onBlocksReady();
  }
  getWidthOfText(txt, fontname, fontsize) {
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    ctx.font = fontsize + ' ' + fontname;

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
