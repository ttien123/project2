import iconSearch from 'src/assets/images/iconSearch.png';

import classNames from 'classnames/bind';
import styles from './InputSearch.module.scss';
const cx = classNames.bind(styles);
const InputSearch = () => {
    return (
        <div className={cx('wrapper')}>
            <input type="text" placeholder="Search" className={cx('wrapper-input')} />
            <button className={cx('wrapper-icon')}>
                <img src={iconSearch} alt="icon" className={cx('wrapper-icon-item')} />
            </button>
        </div>
    );
};

export default InputSearch;
