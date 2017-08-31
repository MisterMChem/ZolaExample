import React, { Component, PropTypes } from 'react';
import styles from './Button.scss';

export default class Button extends Component {

  static propTypes = {
    type: PropTypes.string,
    status: PropTypes.string,
    layout: PropTypes.string,
    theme: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    type: 'button',
    status: 'default',
    layout: 'desktop',
    theme: 'primary',
    children: [],
    onClick: () => {},
  };

  handleClick = (e) => {
    if (this.props.status !== 'submitting') {
      this.props.onClick(e);
    }
  }

  render() {
    const className = [
      styles.button,
      styles[`layout-${this.props.layout}`],
      styles[`status-${this.props.status}`],
      styles[`theme-${this.props.theme}`],
    ].join(' ');

    return (
      <button className={className} type={this.props.type} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
