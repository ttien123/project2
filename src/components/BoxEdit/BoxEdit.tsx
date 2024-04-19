import React from 'react';

import classNames from 'classnames/bind';
import styles from './BoxEdit.module.scss';
const cx = classNames.bind(styles);
interface Props {
    children: React.ReactNode;
}

const BoxEdit = ({ children }: Props) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default BoxEdit;
