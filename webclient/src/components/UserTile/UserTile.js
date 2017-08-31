// Standard stateless render component
import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './UserTile.scss';

const cx = classNames.bind(styles);

const UserTile = ({ user }) =>
<div className={cx(['user-tile-wrap', `priority-${user.priority}`])}>
	<h2>{user.name}</h2>
	<p className={cx('user-age')}>Age: {user.age}</p>
	<p>Category: {user.category}</p>
</div>;

UserTile.propTypes = {
	user: PropTypes.object
};

export default UserTile;