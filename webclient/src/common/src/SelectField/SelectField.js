import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import SelectInput from '../SelectInput/SelectInput';
import styles from './SelectField.scss';


const renderSelect = ({ input, label, type, meta, options, multi, helpText, display }) => (
  <FieldWrapper name={input.name} label={label} helpText={helpText} meta={meta} >
    <div className={`${styles.fieldSizer} ${styles[display]}`}>
      <SelectInput searchable multi={multi} options={options} value={input.value} onChange={input.onChange} />
    </div>
  </FieldWrapper>
);

export default class SelectField extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    multi: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    helpText: PropTypes.string,
    display: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.func),
    onChange: PropTypes.func
  }

  render() {
    const { multi, options, name, label, helpText, display, validate, onChange } = this.props;
    return (
      <Field
        label={label}
        name={name}
        component={renderSelect}
        props={{ options, multi, helpText, display }}
        validate={validate}
        onChange={onChange}
      />
    );
  }
}
