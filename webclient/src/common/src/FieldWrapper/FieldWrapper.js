import React, { PropTypes, Component } from 'react';
import styles from './FieldWrapper.scss';

export default class FieldWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    helpText: PropTypes.string,
    name: PropTypes.string,
    meta: PropTypes.object
  }

  render() {
    const { helpText, label, name, children, meta: { error } } = this.props;
    return (
      <div className={styles.formGroup}>
        {label && <label htmlFor={name}>
          {label}
        </label>}
        <div className={styles.childWrap}>
          {children}
          {helpText && <small>{helpText}</small>}
          {typeof error === 'string' &&
            <span className={styles.error}>{error}</span>
          }
        </div>
      </div>
    );
  }
}
