import classNames from 'classnames/bind';
import styles from './MenuTop.module.scss';
import DrawerCst from '../Drawer';
import React from 'react';
const cx = classNames.bind(styles);

interface Props {
    element: React.ReactNode;
    title: String;
}
const MenuTop = ({ element, title }: Props) => {
    return (
        <div className={cx('wrapper-menu')}>
            <div className={cx('wrapper-menu-icon')}>
                <DrawerCst element={element} />
            </div>
            <div className={cx('wrapper-menu-name')}>{title}</div>
        </div>
    );
};

export default MenuTop;
