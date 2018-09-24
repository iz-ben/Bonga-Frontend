/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { List, ListItem, withStyles } from '@material-ui/core';
import Link from 'react-router-dom/Link';

import amkaLogo from 'assets/images/amka-logo.png';

import footerStyle from 'assets/jss/components/footerStyle';

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  render() {
    const { classes, whiteFont } = this.props;
    const footerClasses = classNames({
      [classes.footer]: true,
      [classes.footerWhiteFont]: whiteFont,
    });
    const aClasses = classNames({
      [classes.a]: true,
      [classes.footerWhiteFont]: whiteFont,
    });
    return (
      <footer className={footerClasses}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <Link to="/share" className={classes.block}>
                  Open up
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>|</ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/about" className={classes.block}>
                  What is Bonga?
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>|</ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/register" className={classes.block}>
                  Register
                </Link>
              </ListItem>
            </List>
          </div>
          <div className={classNames(classes.right, classes.copyright)}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                &copy; {1900 + new Date().getYear()}{' '}
                <Link to="/" className={aClasses}>
                  Bonga
                </Link>{' '}
                is a Capital Group Initiative
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="http://www.amka.life"
                  target="_blank"
                  className={classes.block}
                >
                  <img src={amkaLogo} alt="Amka" style={{ maxWidth: '40px' }} />{' '}
                  Speak to someone now!
                </a>
              </ListItem>
            </List>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
