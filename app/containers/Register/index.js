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
import CustomInput from "components/CustomInput/CustomInput";
import PictureUpload from 'components/PictureUpload';
import registerStyle from 'assets/jss/views/registerStyle';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegister, {
  makeSelectAvatar,
  makeSelectEmail, makeSelectName,
  makeSelectPhone,
  makeSelectProfession, makeSelectValidations,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { submitRegistrationForm, updateField, updateFieldValidation } from './actions';
import { handleValidation } from '../../utils/validationUtils';

export class Register extends React.Component {

  handleTextInputChange = (name, validation = null) => event => {
    this.props.dispatch(updateField(name, event.target.value));
    this.props.dispatch(updateFieldValidation(name, !handleValidation(event.target.value, validation)));
    //console.log(handleValidation(event.target.value, validation))
  };

  handleUpdateAvatar = value =>{
    this.props.dispatch(updateField('avatar', value));
  };
  handleSubmitForm = ()=>
  {
    const {name, phone, email, avatar} = this.props;
    this.props.dispatch(submitRegistrationForm({name, phone, email, avatar}));
  };


  render() {
    const { classes, avatar, validation, ...rest} = this.props;
    //console.log(validation);
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
            </GridItem>
            <GridItem xs={7} sm={4} md={4}>
              <PictureUpload src={avatar} fileSelect={this.handleUpdateAvatar} />
              { avatar ?
                (<Button
                  color="rose"
                  size="sm"
                  simple
                  onClick={()=>{this.handleUpdateAvatar(null)}}
                >
                  Remove
                </Button>)
                : <div className={classes.label}>Choose photo</div>}
            </GridItem>
            <GridItem xs={12} sm={8} md={8}>
              <div>
                <CustomInput
                  labelText="Job Title"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('profession', ['required']),
                    required:true
                  }}
                  inputProps={{
                    value: this.props.profession
                  } }
                  error={!validation.profession && this.props.profession.length > 0}
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
                    value: this.props.name
                  } }
                  error={!validation.name && this.props.name.length > 0}
                  success={validation.name}
                />
                <CustomInput
                  labelText="Email"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('email', ['required','email'])
                  }}
                  inputProps={{
                    value: this.props.email
                  } }
                  error={!validation.email && this.props.email.length > 0}
                  success={validation.email}
                />
                <CustomInput
                  labelText="Phone Number"
                  id="float"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleTextInputChange('phone', ['required','phone']),
                  }}
                  inputProps={{
                    value: this.props.phone,
                  } }
                  error={!validation.phone && this.props.phone.length > 0}
                  success={validation.phone}
                />
                <Button
                  color="info"
                  onClick={this.handleSubmitForm}
                >
                  Register
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name:PropTypes.string,
  email:PropTypes.string,
  phone:PropTypes.string,
  profession:PropTypes.string,
  avatar:PropTypes.string,
  validation:PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
  name:makeSelectName(),
  email:makeSelectEmail(),
  phone:makeSelectPhone(),
  profession:makeSelectProfession(),
  avatar:makeSelectAvatar(),
  validation:makeSelectValidations()
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
