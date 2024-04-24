import { Col, Row } from 'antd';
import { Outlet, useMatch } from 'react-router-dom';

import AdminNav from 'src/components/AdminNav';

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import path from 'src/constants/path';
const cx = classNames.bind(styles);
const AdminLayout = () => {
    const isCreatePage = useMatch(path.createTest);

    return (
        <div
            className={cx('wrapper', {
                isCreatePageWrapper: isCreatePage,
            })}
        >
            <Row
                className={cx('wrapper-container', {
                    isCreatePageWrapperContainer: isCreatePage,
                })}
            >
                <Col span={0} xl={6} className={cx('sideNav')}>
                    <AdminNav />
                </Col>
                <Col
                    span={24}
                    xl={18}
                    className={cx('main', {
                        isCreatePageWrapperContainer: isCreatePage,
                    })}
                >
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
};

export default AdminLayout;
