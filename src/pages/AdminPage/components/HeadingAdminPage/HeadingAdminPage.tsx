import classNames from 'classnames/bind';
import styles from './HeadingAdminPage.module.scss';
import React from 'react';
import { useMatch } from 'react-router-dom';
import path from 'src/constants/path';
const cx = classNames.bind(styles);

interface Props {
    children: React.ReactNode;
    title: React.ReactNode;
    listLink?: React.ReactNode;
}

const HeadingAdminPage = ({ children, title, listLink }: Props) => {
    const isCreatePage = useMatch(path.createTest);

    return (
        <div
            className={cx('wrapper', {
                isCreatePageWrapperContainer: isCreatePage,
            })}
        >
            <div className={cx('wrapper-container')}>
                <h3 className={cx('wrapper-container-title')}>{title}</h3>
                {listLink && <h5 className={cx('wrapper-container-list-link')}>{listLink}</h5>}
                {children}
            </div>
        </div>
    );
};

export default HeadingAdminPage;
