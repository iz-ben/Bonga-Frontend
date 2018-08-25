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
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import homePageStyle from 'assets/jss/views/homePageStyle';
import logo from 'images/logo-white-bg.png';
import WordPool from 'components/WordPool/Loadable';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div><img src={logo}/></div>
              <WordPool/>
              <h4>Talk about whatever's weighing heavily on your mind here, anonymously.</h4>
              <br />
              <Button
                color="info"
                size="lg"
                to="/share"
                component={Link}
              >
                <i className="fas fa-play" />Start Here
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(homePageStyle)(HomePage);
