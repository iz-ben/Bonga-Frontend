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
// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

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
            </List>
          </div>
          <div className={(classes.right, classes.copyright)}>
            &copy; {1900 + new Date().getYear()}{' '}
            <Link to="/" className={aClasses}>
              Bonga
            </Link>{' '}
            is a Capital Group Initiative
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
