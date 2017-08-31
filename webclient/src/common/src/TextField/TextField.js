import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import TextInput from '../TextInput/TextInput';
import styles from './TextField.scss';

const renderField = ({ input, label, type, meta, helpText, display }) => (
  <FieldWrapper name={input.name} label={label} helpText={helpText} meta={meta} >
    <div className={`${styles.fieldSizer} ${styles.full} ${styles[display]} ${meta.error && styles.error}`}>
      <TextInput placeholder={label} value={input.value} onChange={input.onChange} />
    </div>
  </FieldWrapper>
);

export default class TextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    helpText: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.func),
    display: PropTypes.string,
    onChange: PropTypes.func,
  }

  render() {
    const { name, label, helpText, validate, display, onChange } = this.props;
    return (
      <Field
        label={label}
        name={name}
        component={renderField}
        props={{ helpText, display }}
        validate={validate}
        onChange={onChange}
      />
    );
  }
}
