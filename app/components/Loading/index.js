/**
 *
 * Loading
 *
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import pageStyle from 'assets/jss/views/pageStyle';
import WordPool from 'components/WordPool';

/* eslint-disable react/prefer-stateless-function */
class Loading extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <WordPool wordPool={['Loading']} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Loading.propTypes = {};

export default withStyles(pageStyle)(Loading);
