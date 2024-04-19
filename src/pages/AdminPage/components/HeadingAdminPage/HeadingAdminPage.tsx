import classNames from 'classnames/bind';
import styles from './HeadingAdminPage.module.scss';
import React from 'react';
const cx = classNames.bind(styles);

interface Props {
    children: React.ReactNode;
    title: string;
}

const HeadingAdminPage = ({ children, title }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <h3 className={cx('wrapper-container-title')}>{title}</h3>
                {children}
            </div>
        </div>
    );
};

export default HeadingAdminPage;
