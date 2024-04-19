import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';

import AdminNav from 'src/components/AdminNav';

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import MenuTop from 'src/components/MenuTop';
const cx = classNames.bind(styles);
const AdminLayout = () => {
    return (
        <div className={cx('wrapper')}>
            <Row className={cx('wrapper-container')}>
                <Col span={0} xl={6} className={cx('sideNav')}>
                    <AdminNav />
                </Col>
                <Col span={24} xl={18} className={cx('main')}>
                    <MenuTop element={<AdminNav />} title={'User Manager'} />
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
};

export default AdminLayout;
