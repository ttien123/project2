import imgAvatarUser from 'src/assets/images/avatarUser.png';

import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';
import { Button } from 'antd';
const cx = classNames.bind(styles);
const UserInfo = () => {
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('info-box-avatar')}>
                    <img src={imgAvatarUser} alt="img" className={cx('info-box-avatar-item')} />
                </div>
                <div>
                    <h4 className={cx('info-email')}>User: thanhnh@gmail...</h4>
                    <h4 className={cx('info-des')}>Point: 2488</h4>
                </div>
            </div>
            <Button className={cx('btn-logout')}>LOGOUT</Button>
        </div>
    );
};

export default UserInfo;
