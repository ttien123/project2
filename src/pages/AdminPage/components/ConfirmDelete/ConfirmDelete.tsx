import { Button } from 'antd';
import React, { useEffect } from 'react';
import { UserAccountType } from 'src/mock/listAccountUser';

import classNames from 'classnames/bind';
import styles from './ConfirmDelete.module.scss';
import { Exercise } from 'src/mock/listExe';
const cx = classNames.bind(styles);

interface Props {
    userAccount?: UserAccountType;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteAccount?: (account: UserAccountType) => void;
    handleDeleteExercise?: (record: Exercise) => void;
    record?: Exercise;
    title: string;
}

const ConfirmDelete = ({ setOpen, userAccount, handleDeleteAccount, title, record, handleDeleteExercise }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('wrapper-title')}>{title}</h2>
            <div className={cx('wrapper-account')}>
                {userAccount && <div className={cx('wrapper-name')}>name: {userAccount.name}</div>}
                {record && <div className={cx('wrapper-name')}>Test name: {record.name}</div>}
            </div>
            <div className={cx('wrapper-btn')}>
                <Button onClick={() => setOpen(false)} type="primary">
                    Cancel
                </Button>
                <Button
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        userAccount && handleDeleteAccount && handleDeleteAccount(userAccount);
                        record && handleDeleteExercise && handleDeleteExercise(record);
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