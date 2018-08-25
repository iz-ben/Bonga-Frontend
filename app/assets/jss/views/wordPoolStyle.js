import { container, title } from "assets/jss/material-kit-react";
import cardStyle from 'assets/jss/components/cardStyle'


const wordPoolStyle = {
  ...cardStyle,
  container:{
    minHeight:'100px',
    fontSize:'24px',
    lineHeight:'24px'
  },
  wordPool:{
    display: 'flex',
    justifyContent: 'center',
    '& > div':{
      //position:'absolute',
      //left:'50%',
      //top:'50%'
      //transform: 'translateX(50%)',
    }
  }
};

export default wordPoolStyle;
