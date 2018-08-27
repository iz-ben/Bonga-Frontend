/**
 *
 * RichEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/plugins/advlist/plugin';
import 'tinymce/plugins/lists/plugin';

import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'
import { debounce } from 'utils/editorUtils';
import { typeText } from 'containers/Share/actions';
import { makeSelectEditorContent } from 'containers/Share/selectors';
import { typeReplyText } from 'containers/Story/actions';
import { makeSelectReplyEditorContent } from 'containers/Story/selectors';

/* eslint-disable react/prefer-stateless-function */
class RichEditor extends React.Component {

  editor = null;

  handleTypeText = (content)=>{
    const typing = this.props.replyTo ? typeReplyText : typeText;
    this.props.dispatch(typing(content));
  };

  renderRichText()
  {
    //console.log(this.editor);
    if(!this.editor)
    {
      tinymce.remove(`#${this.props.id}`);
    }

    tinymce.init({
      selector: `#${this.props.id}`,
      //skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
      plugins: ['paste', 'link', 'autoresize','wordcount','table', 'lists','advlist'],
      skin: false,
      menubar: false,
      toolbar:'undo redo | bold italic | bullist numlist',
      setup: editor => {
        this.editor = editor;
        //console.log(this.editor);
        //this.setState({ editor });
        //const throttler = debounce.bind(this);
        editor.on('keyup change', debounce(() =>
        {
          const content = editor.getContent();
          //console.log('keyup change',content, editor);
          //this.content = content;
          this.handleTypeText(content);
          editor.setContent(this.props.editorContent);
          editor.selection.select(editor.getBody(), true);
          editor.selection.collapse(false);
        }, 500));

        editor.on('init',(e) => {
          //console.log('tinymce init');
          e.target.setContent(this.props.editorContent);
        });
      }
    });
  }

  /**
   *
   */
  componentDidMount()
  {
    this.renderRichText();
  }

  /**
   *
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState)
  {
    this.renderRichText();
    if(this.editor)
    {
      this.editor.setContent(this.props.editorContent);
    }
  }

  componentWillUnmount() {
    //tinymce.remove(this.state.editor);
  }

  /**
   *
   * @returns {*}
   */
  render() {
    //console.log(this.props);
    return (
      <textarea
        id={`${this.props.id}`}
        value={this.props.editorContent}
        onChange={(e)=>this.handleTypeText(e.target.value)}
      />
    );
  }
}

RichEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editorContent:PropTypes.string,
  replyTo: PropTypes.string
};

const mapStateToProps = (state, props) => createStructuredSelector({
  editorContent:props.replyTo ? makeSelectReplyEditorContent() : makeSelectEditorContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichEditor);
