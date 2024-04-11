import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Drawer, Space } from 'antd';
import UserInfo from '../UserInfo';
import btnMenu from 'src/assets/images/buttonMenu.png';

import classNames from 'classnames/bind';
import styles from './Drawer.module.scss';
const cx = classNames.bind(styles);

interface Props {
    element: React.ReactNode;
}

const DrawerCst = ({ element }: Props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Space>
                <button type="button" onClick={showDrawer}>
                    <img src={btnMenu} alt="btn" className={cx('item')} />
                </button>
            </Space>
            <Drawer placement={'left'} closable={false} onClose={onClose} open={open} key={'left'} width={268}>
                {element}
            </Drawer>
        </>
    );
};

export default DrawerCst;
