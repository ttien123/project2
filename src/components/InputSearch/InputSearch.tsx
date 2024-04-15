import iconSearch from 'src/assets/images/iconSearch.png';

import classNames from 'classnames/bind';
import styles from './InputSearch.module.scss';
import { useEffect, useState } from 'react';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
const cx = classNames.bind(styles);
const InputSearch = () => {
    const [valueInput, setValueInput] = useState('');
    const { setValueSearch } = useGetValueSearch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueInput(e.target.value);
        }
    };

    const handleSearch = () => {
        setValueSearch(valueInput);
    };

    useEffect(() => {
        if (valueInput === '') {
            setValueSearch('');
        }
    }, [valueInput]);

    return (
        <div className={cx('wrapper')}>
            <input
                type="text"
                value={valueInput}
                onChange={handleChange}
                placeholder="Search"
                className={cx('wrapper-input')}
            />
            <button onClick={handleSearch} className={cx('wrapper-icon')}>
                <img src={iconSearch} alt="icon" className={cx('wrapper-icon-item')} />
            </button>
        </div>
    );
};

export default InputSearch;
