import { container, title } from "assets/jss/material-kit-react";
import cardStyle from 'assets/jss/components/cardStyle'


const storyItemStyle = {
  ...cardStyle,
  card:{
    borderRadius: '0 !important',
    borderLeft:'none',
    borderTop:'none',
    borderRight:'none',
    boxShadow:'0 1px 0px 0 rgba(0, 0, 0, 0.14)',
    '&:nth-child(even)':{
      background:'#f7f7f7'
    },
  },
  cardFooter: {
    padding: '0.9375rem 1.875rem 0',
    justifyContent: 'space-between'
  },
  button:{
    marginBottom:0,
    borderRadius: 0,
  },
  footerRight:{
    color: '#848484',
    fontSize: '12px'
  },
  footerLeft:{

  },
  icon:{
    fontSize:'16px'
  }
};

export default storyItemStyle;
