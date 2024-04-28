import { Button } from 'antd';
import React from 'react';

import classNames from 'classnames/bind';
import styles from './ConfirmDelete.module.scss';
const cx = classNames.bind(styles);

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
    title: string;
}

const ConfirmDelete = ({ setOpen, title, handleDelete }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('wrapper-title')}>{title}</h2>
            <div className={cx('wrapper-btn')}>
                <Button onClick={() => setOpen(false)} type="primary">
                    Cancel
                </Button>
                <Button
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        handleDelete();
                        setOpen(false);
                    }}
                    type="primary"
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
};

export default ConfirmDelete;
