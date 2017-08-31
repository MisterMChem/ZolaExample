// This is a simple loader for the page, but we could do anything here.
// Not enough time!
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loader.scss';

const cx = classNames.bind(styles);

const Loader = () => <div className={cx('loader')} />;

export default Loader;
