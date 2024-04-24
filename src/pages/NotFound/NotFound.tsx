import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
const cx = classNames.bind(styles);

const NotFound = () => {
    const negative = useNavigate();
    useEffect(() => {
        const isToHome = setTimeout(() => {
            negative('/');
        }, 3000);
        return () => {
            clearTimeout(isToHome);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-text')}>404</div>
            <img
                src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                alt="Page not found"
                className={cx('wrapper-item')}
            />
        </div>
    );
};

export default NotFound;
