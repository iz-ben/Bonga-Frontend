/**
 *
 * StoryItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Parser from 'html-react-parser';
import Schedule from '@material-ui/icons/Schedule';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

import storyItemStyle from 'assets/jss/views/storyItemStyle';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

/* eslint-disable react/prefer-stateless-function */
class StoryItem extends React.Component {
  render() {
    const { classes, replies_count, slug } = this.props;
    const singleView = this.props.singleView || false;
    const isReply = this.props.isReply || false;

    const repliesCount = function() {
      if (isReply) return null;
      return !singleView ? (
        <Link to={`/${slug}`}>{replies_count} replies.</Link>
      ) : (
        `${replies_count} replies.`
      );
    };
    const replies = repliesCount();
    // console.log(replies_count);
    return (
      <Card classes={{ card: classes.card }}>
        <CardBody>
          <div className={classes.storyContent}>
            {Parser(this.props.content)}
          </div>
        </CardBody>
        <CardFooter classes={{ cardFooter: classes.cardFooter }}>
          <div style={{ flexGrow: 1 }}>
            <GridContainer
              container
              direction="row-reverse"
              justify="space-between"
            >
              <GridItem xs={6}>
                <div className={classes.footerRight}>
                  <span>{replies} </span>
                  <Schedule classes={{ root: classes.icon }} />{' '}
                  <span className={classes.publishedDate}>Published </span>
                  <TimeAgo date={this.props.posted} />
                </div>
              </GridItem>
              <GridItem xs={6}>
                <div className={classes.footerLeft}>
                  {!singleView ? (
                    <Button
                      component={Link}
                      to={`/${this.props.slug}`}
                      classes={{ button: classes.button }}
                      color="info"
                    >
                      Reply
                    </Button>
                  ) : null}
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

StoryItem.propTypes = {
  slug: PropTypes.string,
  posted: PropTypes.object,
  classes: PropTypes.object,
  content: PropTypes.string,
  replies_count: PropTypes.number,
  isReply: PropTypes.bool,
  singleView: PropTypes.bool,
};

export default withStyles(storyItemStyle)(StoryItem);
