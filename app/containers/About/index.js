/**
 *
 * About
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Slide from "@material-ui/core/Slide";
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Check from "@material-ui/icons/Check";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAbout, {
  makeSelectComment,
  makeSelectDialogState,
  makeSelectEmail, makeSelectErrors, makeSelectMessage,
  makeSelectName,
  makeSelectPhone,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import CustomInput from "components/CustomInput/CustomInput";
import Warning from "components/Typography/Warning";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import pageStyle from 'assets/jss/views/pageStyle';
import { displayModal, hideModal, submitContactForm, updateField } from './actions';
import { trackView } from 'utils/analyticsUtil';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

/* eslint-disable react/prefer-stateless-function */
class About extends React.Component {

  handleCloseModal = ()=>{
    this.props.dispatch(hideModal())
  };

  handleOpenModal = ()=>{
    this.props.dispatch(displayModal())
  };

  handleTextInputChange = name => event => {
    this.props.dispatch(updateField(name, event.target.value));
  };

  handleSubmitForm = ()=>
  {
    const {name, phone, email, comment} = this.props;
    this.props.dispatch(submitContactForm(name, phone, email, comment));
  };



  componentDidMount(){
    trackView(this.props.location);
  }

  render() {
    const { classes, modal, message } = this.props;
    const {name, email, phone, comment} = this.props.errors;
    return (
      <div>
        <Helmet titleTemplate="%s - Bonga">
          <title>About</title>
          <meta name="description" content="Mental well-being campaign" />
        </Helmet>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Bonga</h2>
              <h4>
                Bonga is an initiative aimed at getting people to open up about their mental well-being.
                This is a safe space where you can share your feelings anonymously without fear of judgement and empathize with others going through stress and mental conditions like depression, anxiety disorder and bipolar disorder.
              </h4>
              <br />
              <Button
                color="info"
                size="sm"
                onClick={this.handleOpenModal}
              >
                Register to offer help
              </Button>
            </GridItem>
          </GridContainer>
        </div>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseModal}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>Join Bonga</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <p>How you would like to work with Bonga(volunteer, partner, professional counsellor etc)</p>
            { message!=='' ? <SnackbarContent
              message={
                <span>
              {message}
            </span>
              }
              close
              color="success"
              icon={Check}
            />:null}
            <CustomInput
              labelText="Name"
              id="float"
              formControlProps={{
                fullWidth: true,
                onChange: this.handleTextInputChange('name'),
              }}
              inputProps={{
                value: this.props.name
                } }
            />
            { name && name.length ?
              <Warning>
                {name.map(error=>error)}
              </Warning>:null}
            <CustomInput
              labelText="Email"
              id="float"
              formControlProps={{
                fullWidth: true,
                onChange: this.handleTextInputChange('email'),
              }}
              inputProps={{
                value: this.props.email
              } }
            />
            { email && email.length ?
              <Warning>
                {email.map(error=>error)}
              </Warning>:null}
            <CustomInput
              labelText="Phone Number"
              id="float"
              formControlProps={{
                fullWidth: true,
                onChange: this.handleTextInputChange('phone'),
                value: this.props.phone,
              }}
              inputProps={{
              value: this.props.phone
            } }
            />
            { phone && phone.length ?
              <Warning>
                {phone.map(error=>error)}
              </Warning>:null}
            <CustomInput
              labelText="Comment"
              id="float"

              formControlProps={{
                fullWidth: true,
                onChange: this.handleTextInputChange('comment'),
              }}
              inputProps={
                {
                  multiline:true,
                  rows:2,
                  rowsmax:4,
                  value: this.props.comment,
                }
              }
            />
            { comment && comment.length ?
              <Warning>
                {comment.map(error=>error)}
              </Warning>:null}
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              color="transparent"
              simple
              onClick={this.handleSubmitForm}
            >
              Submit
            </Button>
            <Button
              onClick={this.handleCloseModal}
              color="danger"
              simple
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

About.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modal:makeSelectDialogState(),
  about: makeSelectAbout(),
  name:makeSelectName(),
  phone:makeSelectPhone(),
  email:makeSelectEmail(),
  comment:makeSelectComment(),
  errors:makeSelectErrors(),
  message:makeSelectMessage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'about', reducer });
const withSaga = injectSaga({ key: 'about', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(pageStyle)(About));
