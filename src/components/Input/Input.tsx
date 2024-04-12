import { InputHTMLAttributes } from 'react';

import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    extendsClassName?: string;
    srcImg: string;
    isLargeIcon?: boolean;
    errorsMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    classNameLabel?: string;
    classNameWrapper?: string;
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
}

const Input = ({
    extendsClassName,
    isLargeIcon,
    srcImg,
    register,
    errorsMessage,
    name,
    type = 'text',
    rules,
    classNameWrapper,
    classNameError = 'mt-1 mb-1 text-red-600 min-h-[2px] text-[14px] font-semibold',
    placeholder,
    autoComplete,
    ...rest
}: Props) => {
    const registerResult = register && name ? register(name, rules) : null;
    return (
        <div className={cx('container')}>
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
                <input
                    type={type}
                    className={cx('wrapper-input')}
                    placeholder={placeholder}
                    autoComplete="current-password"
                    {...registerResult}
                    {...rest}
                />
            </div>
            <div className={cx('classNameError')}>{errorsMessage && errorsMessage}</div>
        </div>
    );
};

export default Input;
