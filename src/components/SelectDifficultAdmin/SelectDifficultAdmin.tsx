import { Select } from 'antd';

import classNames from 'classnames/bind';
import styles from './SelectDifficultAdmin.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

interface Props {
    setSelect: React.Dispatch<React.SetStateAction<number | undefined>>;
    listValue: { value: number; label: string }[];
    setNumberPageGrQuestion?: React.Dispatch<React.SetStateAction<number>>;
    selected?: number;
}

const SelectDifficult = ({ setSelect, listValue, setNumberPageGrQuestion, selected }: Props) => {
    const [valueLocal, setValueLocal] = useState<string>('Select');
    const handleChange = (value: string) => {
        setSelect(Number(value));
        setNumberPageGrQuestion && setNumberPageGrQuestion(0);
    };

    useEffect(() => {
        const result = listValue.find((item) => item.value === selected);
        if (result) {
            setValueLocal(result.label);
        } else {
            setValueLocal('Select');
        }
    }, [selected]);

    return <Select value={valueLocal} onChange={handleChange} options={listValue} className={cx('main')} />;
};

export default SelectDifficult;
