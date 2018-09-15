/**
 *
 * RichEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import { typeText } from 'containers/Share/actions';
import { makeSelectEditorContent } from 'containers/Share/selectors';
import { typeReplyText } from 'containers/Story/actions';
import { makeSelectReplyEditorContent } from 'containers/Story/selectors';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/* eslint-disable react/prefer-stateless-function */
class RichEditor extends React.Component {
  /**
   * @param content
   */
  handleTypeText = content => {
    const typing = this.props.replyTo ? typeReplyText : typeText;
    this.props.dispatch(typing(content));
  };

  render() {
    const { editor } = this.props.editorState;
    const editorState = editor || EditorState.createEmpty();
    const toolbar = {
      options: ['history', 'inline', 'list', 'textAlign', 'link', 'emoji'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
      },
    };
    return (
      <div>
        <Editor
          editorClassName="rich-editor"
          editorState={editorState}
          onEditorStateChange={this.handleTypeText}
          toolbar={toolbar}
          hashtag={{
            separator: ' ',
            trigger: '#',
          }}
        />
      </div>
    );
  }
}

RichEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editorState: PropTypes.object,
  replyTo: PropTypes.string,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    editorState: props.replyTo
      ? makeSelectReplyEditorContent()
      : makeSelectEditorContent(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RichEditor);
