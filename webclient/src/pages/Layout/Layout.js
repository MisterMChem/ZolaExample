import React, { PropTypes } from 'react';
import { webpage_head as head } from '../../../../react-isomorphic-render/source/webpage head';
import { httpHeader } from '../../../../react-isomorphic-render/source/http';
import classNames from 'classnames/bind';
import styles from './Layout.scss';

const cx = classNames.bind(styles);

const Layout = ({ children }) => {

    // Html document metadata

    const title = 'Zola Example Project';
    const description = 'I would do anything for love.';
    // You can adjust meta tags here for more production-ready items like additional favicon configs, etc.
    // I have skipped this step, as this is just a demo.
    const meta = [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no'
      },
      {
        property: 'og:title',
        content: 'Anything for Love'
      }, {
        property: 'og:description',
        content: 'A killer song by Meatloaf.'
      }, {
        property: 'og:locale',
        content: 'en-US'
      }
    ];

    return (
      <div className={cx('content')}>
        {head(title, meta)}
        {httpHeader('Cache-Control', 'public')}
        {children}
      </div>
    );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
