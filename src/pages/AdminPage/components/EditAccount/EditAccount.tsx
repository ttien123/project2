import React, { useState } from 'react';
import { UserAccountType } from 'src/mock/listAccountUser';

import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';
import { Button } from 'antd';
import useGetListAccount from 'src/zustand/accounts.ztd';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

interface Props {
    userAccount: UserAccountType;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAccount = ({ userAccount, setOpen }: Props) => {
    const { listAccount, setListAccount } = useGetListAccount();

    const [valueName, setValueName] = useState<string>(userAccount.name);
    const [valueAddress, setValueAddress] = useState<string>(userAccount.address);
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueName(e.target.value);
    };
    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueAddress(e.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        if (valueName && valueAddress) {
            const newListAccount = listAccount.map((item, index) => {
                if (item.id === userAccount.id) {
                    const newUser = {
                        ...userAccount,
                        name: valueName,
                        address: valueAddress,
                    };
                    return newUser;
                } else {
                    return item;
                }
            });
            setListAccount(newListAccount);
            setOpen(false);
            toast.success('Update thành công', {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('wrapper-title')}>Edit Account</h2>
            <div className={cx('wrapper-box')}>
                <span className={cx('wrapper-box-item')}>username: {userAccount.username}</span>
            </div>
            <div className={cx('wrapper-box')}>
                <span className={cx('wrapper-box-item')}>password: ******</span>
            </div>
            <div className={cx('wrapper-box-repair')}>
                <span className={cx('wrapper-box-repair-des')}>name:</span>
                <input value={valueName} onChange={handleChangeName} className={cx('wrapper-box-repair-input')} />
            </div>
            <div className={cx('error')}>{valueName === '' && 'vui lòng nhập trường này'}</div>
            <div className={cx('wrapper-box-repair')}>
                <span className={cx('wrapper-box-repair-des')}>address:</span>
                <input value={valueAddress} onChange={handleChangeAddress} className={cx('wrapper-box-repair-input')} />
            </div>
            <div className={cx('error')}>{valueAddress === '' && 'vui lòng nhập trường này'}</div>
            <div className={cx('box-button')}>
                <Button size="large" onClick={handleClose}>
                    Close
                </Button>
                <Button size="large" style={{ marginLeft: 16 }} onClick={handleUpdate}>
                    update
                </Button>
            </div>
        </div>
    );
};

export default EditAccount;
