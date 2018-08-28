import { container, title } from "assets/jss/material-kit-react";
import cardStyle from 'assets/jss/components/cardStyle'


const editorStyle = {
  ...cardStyle,
  card:{
    borderLeft:'none',
    borderTop:'none',
    borderRight:'none'
  },
  cardBody: {
    padding: '0.9375rem 0.9375rem 0',
  },
  cardFooter: {
    padding: '0.9375rem',
    justifyContent: 'space-between'
  },
  recaptcha:{
    justifyContent: 'flex-start'
  }
};

export default editorStyle;
