/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import PictureUpload from 'components/PictureUpload';
import SnackbarContent from 'components/Snackbar/SnackbarContent';
import registerStyle from 'assets/jss/views/registerStyle';
import { handleValidation } from 'utils/validationUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegister, {
  makeSelectAvatar,
  makeSelectEmail,
  makeSelectName,
  makeSelectPhone,
  makeSelectProfession,
  makeSelectValidations,
  makeSelectMessage,
  makeSelectMessageType,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  setRegistrationMessage,
  submitRegistrationForm,
  updateField,
  updateFieldValidation,
} from './actions';

export class Register extends React.Component {
  /**
   * Listens for changes to the input fields
   * Also handles validation as someone is typing
   *
   * @param name
   * @param validation
   * @returns {Function}
   */
  handleTextInputChange = (name, validation = null) => event => {
    this.props.dispatch(updateField(name, event.target.value));
    this.props.dispatch(
      updateFieldValidation(
        name,
        !handleValidation(event.target.value, validation),
      ),
    );
    // console.log(handleValidation(event.target.value, validation))
  };

  /**
   * The avatar could have been handled easily by the @handleTextInputChange function
   * But isn't doing it this way so much more satisfying?
   * Plus having the PhotoUpload component wrap the function unnecessarily complicates things, right?
   *
   * @param value
   */
  handleUpdateAvatar = value => {
    this.props.dispatch(updateField('avatar', value));
  };

  /**
   *
   * @returns {boolean}
   */
  handleSubmitForm = () => {
    const { name, phone, email, profession, avatar } = this.props;

    /*
    This is just a hack. I'll come up with better validation methods suitable for this case later
    The part below declares the validation rules
     */
    const validationRules = [
      {
        field: 'name',
        validation: ['required'],
      },
      {
        field: 'phone',
        validation: ['required', 'phone'],
      },
      {
        field: 'email',
        validation: ['required', 'email'],
      },
      {
        field: 'profession',
        validation: ['required'],
      },
    ];

    /**
     * This runs the validation
     * @type {any[]}
     */
    const validation = validationRules.map(item =>
      handleValidation(this.props[item.field], item.validation),
    );

    /**
     * Check if any of the fields didn't validate
     * When a field doesn't validate successfully it is returned positively ie not validated
     * so no action will be sent to the saga
     * Maybe the opposite is better...but you know...break a few eggs..to each their own..Rome was not built in a day
     */
    if (validation.find(item => item === true)) {
      this.props.dispatch(
        setRegistrationMessage({
          type: 'warning',
          message: 'Please fill all the fields correctly',
        }),
      );
      return false;
    }

    this.props.dispatch(
      submitRegistrationForm({ name, phone, email, avatar, profession }),
    );
    return true;
  };

  /**
   * This will be displayed above the form to indicate form status, submission status etc
   *
   * @param message
   * @returns {*}
   */
  displaySuccessMessage = message => {
    if (!message) return null;

    return (
      <SnackbarContent message={<span>{message}</span>} close color="success" />
    );
  };

  displayErrorMessage = message => {
    if (!message) return null;

    return (
      <SnackbarContent message={<span>{message}</span>} close color="warning" />
    );
  };

  render() {
    const { classes, avatar, validation, message, messageType } = this.props;
    // console.log(validation);
    return (
      <div>
        <Helmet titleTemplate="%s - Bonga">
          <title>Register</title>
          <meta name="description" content="Register as a professional" />
        </Helmet>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h2 className={classes.title}>Register as a professional</h2>
              {messageType === 'success'
                ? this.displaySuccessMessage(message)
                : null}
              {messageType !== 'success'
                ? this.displayErrorMessage(message)
                : null}
            </GridItem>
            <GridItem xs={7} sm={4} md={4}>
              <PictureUpload
                src={avatar}
                fileSelect={this.handleUpdateAvatar}
              />
              {avatar ? (
                <Button
                  color="rose"
                  size="sm"
                  simple
                  onClick={() => {
                    this.handleUpdateAvatar(null);
                  }}
                >
                  Remove
                </Button>
              ) : (
                <div className={classes.label}>Choose photo</div>
              )}
            </GridItem>
            <GridItem xs={12} sm={8} md={8}>
              <div>
                <CustomInput
                  labelText="Job Title"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('profession', [
                      'required',
                    ]),
                    required: true,
                  }}
                  inputProps={{
                    value: this.props.profession,
                  }}
                  error={
                    !validation.profession && this.props.profession.length > 0
                  }
                  success={validation.profession}
                />
                <CustomInput
                  labelText="Your name"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('name', ['required']),
                  }}
                  inputProps={{
                    value: this.props.name,
                  }}
                  error={!validation.name && this.props.name.length > 0}
                  success={validation.name}
                />
                <CustomInput
                  labelText="Email"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('email', [
                      'required',
                      'email',
                    ]),
                  }}
                  inputProps={{
                    value: this.props.email,
                  }}
                  error={!validation.email && this.props.email.length > 0}
                  success={validation.email}
                />
                <CustomInput
                  labelText="Phone Number"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('phone', [
                      'required',
                      'phone',
                    ]),
                  }}
                  inputProps={{
                    value: this.props.phone,
                  }}
                  error={!validation.phone && this.props.phone.length > 0}
                  success={validation.phone}
                />
                <Button color="info" onClick={this.handleSubmitForm}>
                  Register
                </Button>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.typo}>
                <p>
                  {' '}
                  Once you register successfully we shall contact you for
                  validation purposes then email you your the login credentials
                </p>
                <p>
                  {' '}
                  The (optional) photo you provide will appear next to your name
                  and profession on your posts, and on hover cards
                </p>
                <p>
                  The phone number and email is for communication only and will
                  not appear in the public facing website
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  profession: PropTypes.string,
  avatar: PropTypes.string,
  validation: PropTypes.object,
  message: PropTypes.object,
  messageType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
  name: makeSelectName(),
  email: makeSelectEmail(),
  phone: makeSelectPhone(),
  profession: makeSelectProfession(),
  avatar: makeSelectAvatar(),
  validation: makeSelectValidations(),
  message: makeSelectMessage(),
  messageType: makeSelectMessageType(),
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

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(registerStyle)(Register));
