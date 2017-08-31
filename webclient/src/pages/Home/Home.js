// This is the page that renders the user grid.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { webpage_title as title } from '../../../../react-isomorphic-render/source/webpage head';
import Loader from '../../components/Loader/Loader';
import UserTile from '../../components/UserTile/UserTile';
import UserFilters from '../../components/UserFilters/UserFilters';
import styles from './Home.scss';
import { connector as contentConnector, get_content as getContent } from '../../redux/content';

const cx = classnames.bind(styles);

@connect(state => ({
    content: state.Content.content,
    // This attaches the pending props from react-isomorphic-render to our component
    ...contentConnector(state.Content),
  }), { getContent }
)
export default class Home extends Component {
  static propTypes = {
    getContent: PropTypes.func,
    getContentPending: PropTypes.bool,
    content: PropTypes.arrayOf(PropTypes.object)
  }
  componentDidMount = () => {
    // when the component mounts, if a fetch isn't pending, send one.
    (!this.props.getContentPending) && this.props.getContent({});
  }
  render() {
    const { content } = this.props;
    return (
      <div className={cx('content')}>
        {title('UserGrid')}
        {/* Simple check to see if we have content yet, and if not, display the loader. */}
        {content.length > 0 ?
          <div className={cx('content-wrap')}>
            <UserFilters data={content} />
            {
              // Standard array map based on our content.
              content.map(item =>
                <div className={cx('user-tile-wrap')} key={`tile${item.name}`}>
                  <UserTile user={item} key={item.name} />
                </div>)
            }
          </div>
          :
          <div className={cx('empty-wrap')}>
            <p>I would do anything for love...and also React.</p>
            <div className={cx('loader-wrap')}>
              <Loader />
            </div>
          </div>
        }

      </div>
    );
  }
}
