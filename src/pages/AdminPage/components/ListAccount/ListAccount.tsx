import iconPen from 'src/assets/images/IconPen.png';
import iconBin from 'src/assets/images/IconBin.png';
import { UserAccountType, listAccountUser } from 'src/mock/listAccountUser';
import ModalCst from 'src/components/Modal';
import EditAccount from '../EditAccount';

import classNames from 'classnames/bind';
import styles from './ListAccount.module.scss';
import { useState } from 'react';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import useGetListAccount from 'src/zustand/accounts.ztd';
const cx = classNames.bind(styles);

interface Props {
    pageSize: number;
    numberPage: number;
}
const ListAccount = ({ numberPage, pageSize }: Props) => {
    const { listAccount, setListAccount } = useGetListAccount();
    const [open, setOpen] = useState(false);
    const { valueSearch } = useGetValueSearch();
    const [accountUser, setAccountUser] = useState<UserAccountType>({
        id: '',
        address: '',
        name: '',
        password: '',
        username: '',
    });

    let listAccountUserFilter = listAccount.filter((e) =>
        e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
    );

    const handleDeleteAccount = (index: number) => {
        const newList: UserAccountType[] = [...listAccount];
        newList.splice(index, 1);
        setListAccount(newList);
    };
    return (
        <ul className={cx('wrapper')}>
            <ModalCst
                Content={<EditAccount userAccount={accountUser} setOpen={setOpen} />}
                open={open}
                setOpen={setOpen}
            />

            {listAccountUserFilter.map((item, index) => {
                if (index >= pageSize * numberPage && index < pageSize * numberPage + pageSize) {
                    return (
                        <li key={index} className={cx('wrapper-item')}>
                            <div className={cx('wrapper-item-des')}>
                                <span className={cx('wrapper-item-des-email')}>Username: {item.username}</span>
                                <span className={cx('wrapper-item-des-name')}>Name: {item.name}</span>
                            </div>
                            <div className={cx('wrapper-item-icon')}>
                                <button
                                    onClick={() => {
                                        setAccountUser(item);
                                        setOpen(true);
                                    }}
                                >
                                    <img src={iconPen} alt="icon" className={cx('wrapper-item-icon-pen')} />
                                </button>
                                <button onClick={() => handleDeleteAccount(index)}>
                                    <img src={iconBin} alt="icon" className={cx('wrapper-item-icon-plus')} />
                                </button>
                            </div>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default ListAccount;
