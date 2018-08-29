import { container, title } from 'assets/jss/material-kit-react';
import cardStyle from 'assets/jss/components/cardStyle';

const storyItemStyle = theme => ({
  ...cardStyle,
  card: {
    borderRadius: '0 !important',
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none',
    boxShadow: '0 1px 0px 0 rgba(0, 0, 0, 0.14)',
    '&:nth-child(even)': {
      background: '#f7f7f7',
    },
  },
  cardFooter: {
    [theme.breakpoints.up('sm')]: {
      padding: '0.9375rem 1.875rem 0',
      justifyContent: 'space-between',
    },
  },
  button: {
    marginBottom: 0,
    borderRadius: 0,
  },
  footerRight: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
      display: 'flex',
    },
    [theme.breakpoints.down('sm')]: {
      '& span': {
        display: 'block',
      },
    },
    color: '#848484',
    fontSize: '12px',
    '& a': {
      color: '#848484 !important',
      fontSize: '12px',
    },
    flex: 1,
    lineHeight: '16px',
    position: 'relative',
    height: '100%',
    alignItems: 'center',
  },
  footerLeft: {},
  icon: {
    fontSize: '14px',
  },
  storyContent: {
    fontSize: '16px',
    color: '#313131',
    '& p': {
      fontSize: '16px',
    },
  },
  publishedDate: {
    [theme.breakpoints.down('sm')]: {
      display: 'none!important',
    },
  },
});

export default storyItemStyle;
