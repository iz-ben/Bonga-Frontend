import { infoColor, roseColor } from 'assets/jss/material-kit-react';
const pictureUploadStyle = {
  uploaderWrapper: {
    height: 0,
    position: 'relative',
    paddingBottom: '100%',
  },
  container: {
    border: 'solid 5px',
    borderColor: infoColor,
    borderRadius: '50%',
    position: 'absolute',
    transition: 'border-color 0.2s linear',
    cursor: 'pointer',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundSize: 'cover',
    '&:hover': {
      borderColor: roseColor,
    },
  },
  label: {
    textAlign: 'center',
  },
};

export default pictureUploadStyle;
