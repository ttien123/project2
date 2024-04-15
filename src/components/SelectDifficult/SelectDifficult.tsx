import { Select } from 'antd';

import classNames from 'classnames/bind';
import styles from './SelectDifficult.module.scss';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
const cx = classNames.bind(styles);

const SelectDifficult = () => {
    const { setValueDiff } = useGetValueSearch();
    const handleChange = (value: string) => {
        setValueDiff(Number(value));
    };

    return (
        <Select
            defaultValue="Difficult"
            onChange={handleChange}
            options={[
                { value: 0, label: 'All' },
                { value: 1, label: 'Độ khó 1' },
                { value: 2, label: 'Độ khó 2' },
                { value: 3, label: 'Độ khó 3' },
                { value: 4, label: 'Độ khó 4' },
                { value: 5, label: 'Độ khó 5' },
            ]}
            className={cx('main')}
        />
    );
};

export default SelectDifficult;
