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
    const nblocks = Math.ceil(textWidth / width) + 1;

    const words = this.props.title.split(' ');
    const len = this.props.title.length;
    const symsInBlock = Math.floor(len / nblocks);
    let blocks = [];
    while (blocks.length < nblocks) {
      let syms = 0;
      let block = [];
      while (syms < symsInBlock && words.length > 0) {
        let word = words.shift();
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
    TweenMax.to('.title-block', 0.7, { y: '0%', delay: 0.5 });
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
        className={this.props.className + '-title'}
      >
        {blocks}
      </h1>
    );
  }
}
