import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    errorsMessage?: string;
    classNameInput?: string;
    classNameError?: string;
}

import classNames from 'classnames/bind';
import styles from './InputNumber.module.scss';
const cx = classNames.bind(styles);

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
    {
        className,
        errorsMessage,
        autoComplete,
        classNameInput = 'class-input',
        classNameError = 'class-error',
        onChange,
        value = '',
        ...rest
    },
    ref,
) {
    const [localValue, setLocalValue] = useState<string>(value as string);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        // (/^\d+$/.test(value) || value === '') là để kiểm tra xem có phải là số hoặc "" không
        if (/^[1-9][0-9]*$/.test(value) || value === '') {
            onChange && onChange(event);
            setLocalValue(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <input
                className={cx(`${classNameInput}`)}
                {...rest}
                value={value === undefined ? localValue : value}
                onChange={handleChange}
                ref={ref}
            />
            <div className={cx(`${classNameError}`)}>{errorsMessage}</div>
        </div>
    );
});

export default InputNumber;
