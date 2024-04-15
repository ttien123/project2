import imgAvatarUser from 'src/assets/images/avatarUser.png';

import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';
import { Button } from 'antd';
import useGetIsAuthenticated from 'src/zustand/auth.ztd';
import { setIsAuthenticatedToLS } from 'src/utils/auth';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
const cx = classNames.bind(styles);
const UserInfo = () => {
    const { setIsAuthenticated } = useGetIsAuthenticated();
    const { reset } = useGetInfoExercise();
    const { reset: resetSearch } = useGetValueSearch();

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAuthenticatedToLS(false);
        reset();
        resetSearch();
    };
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
            <Button onClick={handleLogout} className={cx('btn-logout')}>
                LOGOUT
            </Button>
        </div>
    );
};

export default UserInfo;
