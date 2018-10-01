/**
 *
 * PictureUpload
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import pictureUploadStyle from 'assets/jss/components/pictureUploadStyle';
import { DEFAULT_AVATAR } from '../../utils/constants';

// import styled from 'styled-components';

class PictureUpload extends React.Component {
  handleFileChange = event => {
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        // console.log(event.target.result);
        // const callback = this.props.fileSelect || function() {};
        this.props.fileSelect(e.target.result);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  render() {
    const { classes, src } = this.props;
    const preview = src || DEFAULT_AVATAR;
    return (
      <div>
        <label htmlFor="art" style={{ display: 'block', maxWidth: '100%' }}>
          <input
            id="art"
            type="file"
            accept="image/*"
            capture="camera"
            onChange={this.handleFileChange}
            style={{ visibility: 'hidden' }}
          />
          <div className={classes.uploaderWrapper}>
            <div
              className={classes.container}
              style={{ backgroundImage: `url(${preview})` }}
            >
              &nbsp;
            </div>
          </div>
        </label>
      </div>
    );
  }
}

PictureUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.string,
  fileSelect: PropTypes.func,
};

export default withStyles(pictureUploadStyle)(PictureUpload);
