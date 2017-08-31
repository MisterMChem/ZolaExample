import React from 'react';
import classNames from 'classnames/bind';
import { title, httpStatus, httpHeader } from '../../../../react-isomorphic-render';

import styles from './NotFound.scss';

const cx = classNames.bind(styles);

const NotFound = ({}) =>
<div className={cx('page-not-found')}>
  {httpStatus(404)}
  {httpHeader('Cache-Control', 'no-cache')}
  {title('Page not found')}
  <h1>Sorry, this app is a one hit wonder.</h1>
  <p>
    Just like Meatloaf. Please try a different route.
  </p>
</div>;

export default NotFound;
