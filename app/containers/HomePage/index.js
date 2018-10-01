/* eslint-disable react/no-unescaped-entities */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import homePageStyle from 'assets/jss/views/homePageStyle';
import logo from 'images/logo-white-bg.png';
import WordPool from 'components/WordPool/Loadable';
import { trackView } from 'utils/analyticsUtil';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  componentDidMount() {
    trackView(this.props.location);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div>
                <img src={logo} alt="Bonga Logo" />
              </div>
              <WordPool />
              <h4>
                Talk about whatever's weighing heavily on your mind here,
                anonymously.
              </h4>
              <br />
              <Button color="info" size="lg" to="/share" component={Link}>
                Start Here
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  location: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(homePageStyle)(HomePage);
