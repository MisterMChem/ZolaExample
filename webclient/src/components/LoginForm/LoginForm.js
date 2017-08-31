/*
  This is an example of a production-ready form. Highlights:
  - Redux-form to manage form state
  - We've built a set of common form elements to be used...TextField is just one sample. These are located in a common directory.
  - Support both inline and onSubmit validation. 
  - Submission handler through redux, see ../../redux/authentication

  For this specific project, the login session management is stateless and uses signed JWT.
  For more information on that mechanism, please see ../../../rendering-service/main
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import classnames from 'classnames/bind';
import Button from '../../common/src/Button/Button';
import TextField from '../../common/src/TextField/TextField';
import { email, password, required } from '../../../../common/validation/login';
import styles from './LoginForm.scss';
import { submit_user as submitUser } from '../../redux/authentication';

const cx = classnames.bind(styles);

@connect(
  state => ({}), {
    submitUser
  }
)
class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    submitting: PropTypes.bool,
    submitUser: PropTypes.func,
    router: PropTypes.object
  }

  handleSubmit = ({ content, action }) => {

    const { handleSubmit, submitUser } = this.props;

    return submitUser(content)
      .then(result => {
        // If the submission is successful, we'll redirect to /users.
        // For an experience where this redirect could be to multiple locations, we can also read it from the result.
        // This is fine for now.
        window.location = '/users';
      })
      .catch((error) => {
        throw new SubmissionError({ _error: 'Access Denied' });
      });
  }

  render() {
    const { handleSubmit, submitting, error, dirty } = this.props;
    return (
      <div className={cx('login-form')}>
        {error && dirty && <p className={cx('error')}>{error}</p> }
        <TextField
          name="email"
          label="Email"
          validate={[required, email]}
        />
        <TextField
          name="password"
          label="Password"
          validate={[required, password]}
        />
        <div className={styles.footerBtns}>
          <Button
            status={`${submitting ? 'submitting' : 'default'}`}
            onClick={handleSubmit(content =>
              this.handleSubmit({
                content,
                action: 'login'
              })
            )}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
})(LoginForm);

