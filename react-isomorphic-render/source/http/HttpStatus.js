import { Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

class HttpStatus extends Component {
  render() {
    return null;
  }
}

HttpStatus.propTypes = {
  code: PropTypes.number.isRequired
};

function reducePropsToState(propsList) {
  let status = null;
  propsList.forEach((props) => {
    status = props.code;
  });
  return status;
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(HttpStatus);
