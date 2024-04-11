import { InputHTMLAttributes } from 'react';

import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    extendsClassName?: string;
    srcImg: string;
    isLargeIcon?: boolean;
}

const Input = ({ type = 'text', extendsClassName, isLargeIcon, srcImg, ...rest }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-box-icon')}>
                <img
                    src={srcImg}
                    alt="img"
                    className={cx('wrapper-box-icon-item', {
                        'large-icon': isLargeIcon,
                    })}
                />
            </div>
            <input type={type} className={cx('wrapper-input')} {...rest} />
        </div>
    );
};

export default Input;
