import { Select } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    setSelect: React.Dispatch<React.SetStateAction<string>>;
    listValue: { value: string; label: string }[];
    setNumberPageGrQuestion?: React.Dispatch<React.SetStateAction<number>>;
    selected?: string;
}

const SelectGroupQuestion = ({ setSelect, listValue, setNumberPageGrQuestion, selected }: Props) => {
    const [valueLocal, setValueLocal] = useState<string>('Select');
    const handleChange = (value: string) => {
        setSelect(value);
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

    return <Select value={valueLocal} onChange={handleChange} options={listValue} />;
};

export default SelectGroupQuestion;
