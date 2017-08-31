import { Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

class HttpHeader extends Component {
  render() {
    return null;
  }
}

HttpHeader.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

function reducePropsToState(propsList) {
  const headers = {};
  propsList.forEach((props) => {
    headers[props.name] = props.value;
  });
  return headers;
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(HttpHeader);
