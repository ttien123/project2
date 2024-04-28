import InputSearch from 'src/components/InputSearch';
import ButtonAdd from 'src/components/ButtonAdd';
import ListAccount from './components/ListAccount';
import PaginationCst from 'src/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import HeadingAdminPage from './components/HeadingAdminPage';
import imgAdd from 'src/assets/images/IconAdd.png';

import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import ModalCst from 'src/components/Modal';
import CreateAccount from './components/CreateAccount';
import useGetListAccount from 'src/zustand/accounts.ztd';
import MenuTop from 'src/components/MenuTop';
import AdminNav from 'src/components/AdminNav';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import { UserAccountType } from 'src/mock/listAccountUser';
const cx = classNames.bind(styles);

const AdminPage = () => {
    const { listAccount } = useGetListAccount();
    const { valueSearch } = useGetValueSearch();
    const [listAccountNow, setListAccountNow] = useState<UserAccountType[]>(listAccount);
    const [numberPage, setNumberPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(4);
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        setListAccountNow(listAccount);
    }, [listAccount]);

    useEffect(() => {
        let listAccountUserFilter = listAccount.filter((e) =>
            e.name.toLocaleLowerCase().includes(valueSearch?.trim().toLocaleLowerCase() || ''),
        );
        setListAccountNow(listAccountUserFilter);
    }, [valueSearch, listAccount]);

    return (
        <>
            <MenuTop element={<AdminNav />} title={'User Manager'} />
            <HeadingAdminPage title={'Home > User Manager'}>
                <ModalCst open={open} setOpen={setOpen} Content={<CreateAccount setOpen={setOpen} />} />
                <div className={cx('wrapper-search')}>
                    <div className={cx('wrapper-search-input')}>
                        <InputSearch setNumberPage={setNumberPage} />
                    </div>
                    <div className={cx('wrapper-search-add')}>
                        <ButtonAdd srcIcon={imgAdd} content="New User" handleClick={handleClick} />
                    </div>
                </div>
                <h3 className={cx('wrapper-total-account')}>Tổng số tài khoản: {listAccount.length}</h3>
                <div style={{ flex: 1, overflow: 'auto' }}>
                    <ListAccount
                        numberPage={numberPage}
                        pageSize={pageSize}
                        setNumberPage={setNumberPage}
                        listAccountUserFilter={listAccountNow}
                    />
                </div>
                <div style={{ textAlign: 'center', paddingTop: '16px' }}>
                    <PaginationCst
                        numberPage={numberPage}
                        setNumberPage={setNumberPage}
                        totalListExercise={listAccountNow.length}
                        pageSize={pageSize}
                    />
                </div>
            </HeadingAdminPage>
        </>
    );
};

export default AdminPage;
