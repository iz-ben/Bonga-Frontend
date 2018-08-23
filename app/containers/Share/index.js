/**
 *
 * Share
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
import makeSelectShare from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class Share extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Share</title>
          <meta name="description" content="Description of Share" />
        </Helmet>
      </div>
    );
  }
}

Share.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  share: makeSelectShare(),
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

const withReducer = injectReducer({ key: 'share', reducer });
const withSaga = injectSaga({ key: 'share', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Share);
