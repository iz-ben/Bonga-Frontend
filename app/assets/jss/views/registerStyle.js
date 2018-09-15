import { container, title } from 'assets/jss/material-kit-react';

const registerStyle = {
  container: {
    zIndex: '12',
    color: '#000',
    margin: '20px auto',
    maxWidth: '680px !important',
    ...container,
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#000',
    fontSize: '24px',
    textDecoration: 'none',
  },

  icon: {
    width: '17px',
    height: '17px',
    marginRight: '4px',
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: '400',
    paddingLeft: '0',
    textAlign: 'center',
  },
  typo: {
    fontWeight: '300',
    fontFamily: 'Roboto',
    padding: '10px 0',
    '& p':{
      fontSize:'12px'
    }
  },
};

export default registerStyle;
