/**
 *
 * Header
 *
 */

import React from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import darkLogo from 'images/logo.png';
import { makeSelectLocation } from 'containers/App/selectors';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  toggleLogoVisibility = () => {
    const { location } = this.props;
    return location.pathname !== '/' ? (
      <CSSTransition timeout={500} classNames="fade">
        <Link to="/">
          <img src={darkLogo} alt="Bonga" />
        </Link>
      </CSSTransition>
    ) : null;
  };

  render() {
    // console.log(this.props);
    return (
      <div style={{ minHeight: '150px', textAlign: 'center' }}>
        <TransitionGroup>{this.toggleLogoVisibility()}</TransitionGroup>
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
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

export default compose(withConnect)(Header);
