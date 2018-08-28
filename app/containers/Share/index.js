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
import withStyles from '@material-ui/core/styles/withStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReactPaginate from 'react-paginate';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import StoryItem from 'components/StoryItem';
import pageStyle from 'assets/jss/views/pageStyle';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Loading from 'components/Loading';
import Editor from 'components/Editor/Loadable';
import { trackView } from 'utils/analyticsUtil';
import makeSelectShare, {
  makeSelectCurrentPage,
  makeSelectEditorOpen,
  makeSelectNetworkActive,
  makeSelectPages,
  makeSelectVisibleItems,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getComments } from './actions';

/* eslint-disable react/prefer-stateless-function */
class Share extends React.Component {
  handlePaginationChange = ({ selected }) => {
    // console.log(selected);
    const page = selected + 1;
    this.props.dispatch(getComments(page));
  };

  componentDidMount() {
    const currentPage = this.props.current || 0;
    this.props.dispatch(getComments(currentPage));
    trackView(this.props.location);
  }
  render() {
    const { classes, stories, current } = this.props;
    if (this.props.loading && !stories.length) {
      return <Loading />;
    }
    return (
      <div>
        <Helmet titleTemplate="%s - Bonga">
          <title>Share</title>
          <meta name="description" content="What is weighing on you?" />
        </Helmet>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Editor />
              <div className="story-wrapper">
                <TransitionGroup className="todo-list">
                  {stories.map(story => (
                    <CSSTransition
                      key={story.id}
                      timeout={500}
                      classNames="fade"
                    >
                      <StoryItem {...story} />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            </GridItem>
          </GridContainer>
          <div className="pagination" id="react-paginate">
            {this.props.pages > 1 ? (
              <ReactPaginate
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                breakLabel={<a href={this.props.location.pathname}>...</a>}
                breakClassName="break-me"
                pageCount={this.props.pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePaginationChange}
                subContainerClassName="pages pagination"
                forcePage={current}
                activeClassName="active"
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Share.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stories: PropTypes.array,
  editorOpen: PropTypes.bool,
  loading: PropTypes.bool,
  pages: PropTypes.number,
  current: PropTypes.number,
  location: PropTypes.object,
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  share: makeSelectShare(),
  stories: makeSelectVisibleItems(),
  editorOpen: makeSelectEditorOpen(),
  loading: makeSelectNetworkActive(),
  pages: makeSelectPages(),
  current: makeSelectCurrentPage(),
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
)(withStyles(pageStyle)(Share));
