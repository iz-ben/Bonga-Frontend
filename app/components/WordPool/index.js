/**
 *
 * WordPool
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { TimelineLite, Power2, SlowMo } from 'gsap';
import withStyles from '@material-ui/core/styles/withStyles';
import wordPoolStyle from 'assets/jss/views/wordPoolStyle';
import { SLOGANS } from 'utils/constants';
import SplitText from 'utils/SplitText';
/* eslint-disable react/prefer-stateless-function */
class WordPool extends React.Component {
  constructor(props) {
    super(props);

    this.text = React.createRef();

    this.state = { slogan: null };

    this.animate = false;
  }

  slogan = () => {
    const tl = new TimelineLite({
      onComplete: () => {
        // console.log('tick');
        if (this.animate) this.changeSlogan();
      },
    });
    const { text } = this;
    const node = text.childNodes;
    const split = new SplitText(node, { type: 'chars' });
    const { chars } = split;
    const centerIndex = Math.floor(chars.length / 2);
    let i;
    // console.log(node)
    for (i = 0; i < chars.length; i += 1) {
      tl.from(
        chars[i],
        1.8,
        { x: (i - centerIndex) * 40, opacity: 0, ease: Power2.easeOut },
        i * 0.1,
      );
    }
    tl.fromTo(
      node,
      4,
      { z: 500, y: 30, visibility: 'visible', opacity: 1 },
      { z: -1000, ease: SlowMo.ease.config(0.1, 0.9) },
      0,
    );
    tl.to(
      node,
      1.5,
      { rotationX: -720, autoAlpha: 0, scale: 2, ease: Power2.easeInOut },
      '-=1.5',
    );

    return tl;
  };

  changeSlogan = () => {
    const wordPool = this.props.wordPool || SLOGANS;
    const word = Math.floor(Math.random() * wordPool.length);
    const slogan = wordPool[word];
    this.setState({ slogan });
  };

  getSlogan = () => {
    const { slogan } = this.state;
    return <div style={{ opacity: 1 }}>{slogan}</div>;
  };

  componentDidMount() {
    this.animate = true;
    this.changeSlogan();
  }
  componentDidUpdate() {
    this.slogan();
  }
  componentWillUnmount() {
    this.animate = false;
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div ref={this.text} className={classes.wordPool} id="word-pool">
          {this.getSlogan()}
        </div>
      </div>
    );
  }
}

WordPool.propTypes = {
  wordPool: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(wordPoolStyle)(WordPool);
