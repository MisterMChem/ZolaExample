import React from 'react';
import classNames from 'classnames/bind';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './AuthPage.scss';

const cx = classNames.bind(styles);
const meatloaf = require('../../../assets/images/meatloaf.jpg');

// Simple Auth Page...
const AuthPage = () => <div className={cx('auth-page')}>
  <h1>Welcome to the Zola Example Project!</h1>
  <div className={cx('image-wrap')}>
    <img src={meatloaf} alt="meatloaf" />
    <p><em>#anythingforlove</em> - Meatloaf</p>
  </div>
  <p>Please sign in below.</p>
  <LoginForm />
</div>;

export default AuthPage;
