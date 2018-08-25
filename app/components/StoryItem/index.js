/**
 *
 * StoryItem
 *
 */

import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import storyItemStyle from 'assets/jss/views/storyItemStyle';
import Parser from 'html-react-parser';
import Schedule from "@material-ui/icons/Schedule";
import TimeAgo from 'react-timeago';
import {Link} from 'react-router-dom';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Button from 'components/CustomButtons/Button';

/* eslint-disable react/prefer-stateless-function */
class StoryItem extends React.Component {
  render() {
    const { classes, replies_count, slug, ...rest } = this.props;
    const singleView = this.props.singleView || false;
    const isReply = this.props.isReply || false;

    const repliesCount = function() {
      if(isReply)
        return null;
      return  !singleView ? <Link to={`/${slug}`}>{replies_count} replies</Link> : `${replies_count} replies`;
      };
    const replies  = repliesCount();
    //console.log(replies_count);
    return (
      <Card classes={{card:classes.card}}>
        <CardBody>
          {Parser(this.props.content)}
        </CardBody>
        <CardFooter classes={{cardFooter:classes.cardFooter}}>
          <div className={classes.footerRight}>
            {
              !singleView ? <Button component={Link} to={`/${this.props.slug}`} classes={{button:classes.button}} color="info">Reply</Button>:null
            }

          </div>
          <div className={classes.footerRight}>

            { replies }.
            <Schedule classes={{root:classes.icon}}/> Published <TimeAgo date={this.props.posted}/>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

StoryItem.propTypes = {};

export default withStyles(storyItemStyle)(StoryItem);
