import React, { useState } from 'react';
import { Popover } from 'antd';

import classNames from 'classnames/bind';
import styles from './Popover.module.scss';
const cx = classNames.bind(styles);

interface Props {
    children: React.ReactNode;
    content: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopoverCst = ({ children, content, open, setOpen }: Props) => {
    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover content={content} trigger="click" open={open} onOpenChange={handleOpenChange}>
            <div className={cx('button')}>{children}</div>
        </Popover>
    );
};

export default PopoverCst;
