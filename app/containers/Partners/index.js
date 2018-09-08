/**
 *
 * Partners
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPartners from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class Partners extends React.Component {
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - Bonga">
          <title>Partners</title>
          <meta name="description" content="Who else is involved in this initiative" />
        </Helmet>
      </div>
    );
  }
}

Partners.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  partners: makeSelectPartners(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'partners', reducer });
const withSaga = injectSaga({ key: 'partners', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Partners);
