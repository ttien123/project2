import iconPen from 'src/assets/images/IconPen.png';
import iconBin from 'src/assets/images/IconBin.png';
import { UserAccountType, listAccountUser } from 'src/mock/listAccountUser';
import ModalCst from 'src/components/Modal';
import EditAccount from '../EditAccount';

import { useState } from 'react';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import useGetListAccount from 'src/zustand/accounts.ztd';
import Nodata from 'src/components/Nodata';
import ConfirmDelete from '../ConfirmDelete';
import classNames from 'classnames/bind';
import styles from './ListAccount.module.scss';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

interface Props {
    pageSize: number;
    numberPage: number;
    setNumberPage: React.Dispatch<React.SetStateAction<number>>;
}
const ListAccount = ({ numberPage, pageSize, setNumberPage }: Props) => {
    const { listAccount, setListAccount } = useGetListAccount();
    const [open, setOpen] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
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

    const handleDeleteAccount = (account: UserAccountType) => {
        const newList: UserAccountType[] = [...listAccount];
        const indexDelete = newList.findIndex((item) => item.id === account.id);
        newList.splice(indexDelete, 1);
        if (newList.length <= pageSize * numberPage && numberPage > 0) {
            setNumberPage((prev) => prev - 1);
        }
        setListAccount(newList);
        setOpenConfirmDelete(false);
        toast.success('Xóa thành công', {
            position: 'top-right',
            autoClose: 1500,
        });
    };
    return (
        <ul className={cx('wrapper')}>
            <ModalCst
                Content={<EditAccount userAccount={accountUser} setOpen={setOpen} />}
                open={open}
                setOpen={setOpen}
            />

            <ModalCst
                Content={
                    <ConfirmDelete
                        title="Bạn có chắc chắn muốn xóa account này?"
                        userAccount={accountUser}
                        setOpen={setOpenConfirmDelete}
                        handleDeleteAccount={handleDeleteAccount}
                    />
                }
                open={openConfirmDelete}
                setOpen={setOpenConfirmDelete}
            />

            {listAccountUserFilter.length > 0 ? (
                listAccountUserFilter.map((item, index) => {
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
                                    <button
                                        onClick={() => {
                                            setAccountUser(item);
                                            setOpenConfirmDelete(true);
                                        }}
                                    >
                                        <img src={iconBin} alt="icon" className={cx('wrapper-item-icon-plus')} />
                                    </button>
                                </div>
                            </li>
                        );
                    }
                })
            ) : (
                <Nodata />
            )}
        </ul>
    );
};

export default ListAccount;
