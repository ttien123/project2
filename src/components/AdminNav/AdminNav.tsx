import avatarAdmin from 'src/assets/images/avatarAdmin.png';
import { Button } from 'antd';

import classNames from 'classnames/bind';
import styles from './AdminNav.module.scss';
import { NavLink } from 'react-router-dom';
import path from 'src/constants/path';
import IconUserAdmin from 'src/assets/IconUserAdmin';
import IconQuestion from 'src/assets/IconQuestion';
import IconUserGraduate from 'src/assets/IconUserGraduate';
import useGetIsAuthenticated from 'src/zustand/auth.ztd';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import useGetListAccount from 'src/zustand/accounts.ztd';
import { setIsAuthenticatedToLS } from 'src/utils/auth';
const cx = classNames.bind(styles);

const AdminNav = () => {
    const { setIsAuthenticated } = useGetIsAuthenticated();
    const { reset } = useGetInfoExercise();
    const { reset: resetSearch } = useGetValueSearch();
    const { reset: resetAccount } = useGetListAccount();
    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAuthenticatedToLS(false);
        reset();
        resetSearch();
        resetAccount();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('info-box-avatar')}>
                    <img src={avatarAdmin} alt="img" className={cx('info-box-avatar-item')} />
                </div>
                <div className={cx('nav')}>
                    <NavLink to={path.admin} className={(nav) => cx('nav-item', { activeNav: nav.isActive })}>
                        <IconUserAdmin />
                        <div className={cx('nav-item-name')}>User Manager</div>
                    </NavLink>
                    <NavLink to={path.testManager} className={(nav) => cx('nav-item', { activeNav: nav.isActive })}>
                        <IconQuestion />
                        <div className={cx('nav-item-name')}>Test Manager</div>
                    </NavLink>
                    <NavLink to={path.testQuiz} className={(nav) => cx('nav-item', { activeNav: nav.isActive })}>
                        <IconUserGraduate />
                        <div className={cx('nav-item-name')}>Test Quiz</div>
                    </NavLink>
                </div>
            </div>
            <Button onClick={handleLogout} className={cx('btn-logout')}>
                LOGOUT
            </Button>
        </div>
    );
};

export default AdminNav;
