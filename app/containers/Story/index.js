/**
 *
 * Story
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import pageStyle from 'assets/jss/views/pageStyle';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import StoryItem from 'components/StoryItem';
import Editor from 'components/Editor/Loadable';
import { makeSelectComment } from 'containers/Share/selectors';
import { trackView } from 'utils/analyticsUtil';
import reducer from './reducer';
import saga from './saga';
import { getStory } from './actions';
import {
  makeSelectACtiveStory,
  makeSelectNetworkActive,
  makeSelectReplies,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class Story extends React.Component {
  /**
   * Get story item
   * @param story
   * @returns {*}
   */
  getStoryItem = story => (
    <StoryItem key={story.id} singleView isReply {...story} />
  );
  componentDidMount() {
    this.props.dispatch(getStory(this.props.match.params.id));
    trackView(this.props.location);
  }
  render() {
    const { classes, story, replies } = this.props;
    const title = story ? story.excerpt : 'Conversation thread';
    return (
      <div>
        <Helmet titleTemplate="%s - Bonga">
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className="story-wrapper">
                <TransitionGroup className="story">
                  {story ? (
                    <CSSTransition
                      key={story.id}
                      timeout={500}
                      classNames="fade"
                    >
                      <StoryItem {...story} singleView />
                    </CSSTransition>
                  ) : null}
                </TransitionGroup>
                <div className={classes.replies}>
                  {replies
                    ? replies.map(reply => this.getStoryItem(reply))
                    : null}
                </div>
                {story ? <Editor replyTo={story.id} /> : null}
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

Story.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  story: PropTypes.object,
  replies: PropTypes.array,
  passedStory: PropTypes.object,
  loading: PropTypes.bool,
  location: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    passedStory: makeSelectComment(props.match.params.id),
    story: makeSelectACtiveStory(),
    replies: makeSelectReplies(),
    loading: makeSelectNetworkActive(),
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

const withReducer = injectReducer({ key: 'story', reducer });
const withSaga = injectSaga({ key: 'story', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(pageStyle)(Story));
