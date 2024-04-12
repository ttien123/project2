import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import InputSearch from 'src/components/InputSearch';
import ButtonType1 from 'src/components/ButtonType1';
import BoxEdit from 'src/components/BoxEdit';
const cx = classNames.bind(styles);

const AdminPage = () => {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>{'Home > User Manager'}</h3>
            <div className={cx('search')}>
                <InputSearch />
                <ButtonType1 />
            </div>
            <h3 className={cx('account')}>Tổng số tài khoản: 85</h3>
            <div className={cx('list-acc')}>
                <BoxEdit />
            </div>
        </div>
    );
};

export default AdminPage;
