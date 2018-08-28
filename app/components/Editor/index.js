/**
 *
 * Editor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import ReCAPTCHA from 'react-google-recaptcha';
import editorStyle from 'assets/jss/views/editorStyle';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Button from 'components/CustomButtons/Button';
import RichEditor from 'components/RichEditor/Loadable';
import { makeSelectEditorContent } from 'containers/Share/selectors';
import {
  makeSelectEditorActive,
  makeSelectRecaptcha,
} from 'containers/Share/selectors';
import { submitStory } from 'containers/Share/actions';
import { closeEditor, updateRecaptcha } from 'containers/Share/actions';
import {
  makeSelectReplyEditorContent,
  makeSelectReplyRecaptcha,
} from 'containers/Story/selectors';
import { updateReplyRecaptcha } from 'containers/Story/actions';
import { RECAPTCHA_KEY } from 'utils/constants';
import { submitReply } from 'containers/Story/actions';

/* eslint-disable react/prefer-stateless-function */
class Editor extends React.Component {
  handleSubmitComment = () => {
    const { editorContent, recaptcha, replyTo } = this.props;
    const inReplyTo = replyTo || null;
    const submitAction = replyTo ? submitReply : submitStory;
    this.props.dispatch(submitAction(editorContent, recaptcha, inReplyTo));
  };

  handleRecaptchaChange = captchaKey => {
    const recaptcha = this.props.replyTo
      ? updateReplyRecaptcha
      : updateRecaptcha;
    this.props.dispatch(recaptcha(captchaKey));
  };

  handleHideForm = () => {
    this.props.dispatch(closeEditor());
  };

  render() {
    const { classes, editorContent, recaptcha, replyTo } = this.props;
    return (
      <div className="editor">
        <Card classes={{ card: classes.card }}>
          <CardBody classes={{ cardBody: classes.cardBody }}>
            <RichEditor id="rich-editor" replyTo={replyTo} />
          </CardBody>
          <CardFooter classes={{ cardFooter: classes.cardFooter }}>
            <div style={{flexGrow:1}}>
              <GridContainer direction="row-reverse" justify="space-between">
                <GridItem sm={6}>
                  <div className={classes.recaptcha}>
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_KEY}
                      onChange={value => this.handleRecaptchaChange(value)}
                      onExpired={() => this.handleRecaptchaChange(null)}
                      size="normal"
                    />
                  </div>
                </GridItem>
                <GridItem sm={6}>
                  <Button
                    disabled={!editorContent.length || !recaptcha}
                    onClick={this.handleSubmitComment}
                  >
                    {replyTo ? `Reply` : `Bonga`}
                  </Button>
                  <Button simple color="info" onClick={this.handleHideForm}>
                    Cancel
                  </Button>
                </GridItem>

              </GridContainer>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

Editor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editorContent: PropTypes.string,
  recaptcha: PropTypes.string,
  editorActive: PropTypes.bool,
  replyTo: PropTypes.string,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    editorContent: props.replyTo
      ? makeSelectReplyEditorContent()
      : makeSelectEditorContent(),
    editorActive: makeSelectEditorActive(),
    recaptcha: props.replyTo
      ? makeSelectReplyRecaptcha()
      : makeSelectRecaptcha(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(editorStyle)(Editor));
