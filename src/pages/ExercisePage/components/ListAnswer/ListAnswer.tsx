import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';

import './ListAnswer.module.scss';
import { CheckOutlined } from '@ant-design/icons';
import useGetInfoExercise from 'src/zustand/exercise.ztd';

interface Props {
    listAnswer: {
        id: number;
        value: string;
    }[];
    numberQuestion: number;
}

const ListAnswer = ({ listAnswer, numberQuestion }: Props) => {
    const { listAnswer: listAnswerAll, setListAnswer } = useGetInfoExercise();
    const [value, setValue] = useState<number | undefined>(undefined);
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        listAnswer.forEach((item) => {
            if (item.id === e.target.value) {
                setListAnswer({ idQuestion: numberQuestion, answer: { id: e.target.value, value: item.value } });
            }
        });
    };
    useEffect(() => {
        listAnswerAll.forEach((item) => {
            if (item.idQuestion === numberQuestion) {
                setValue(item.answer.id);
            }
        });
    }, [numberQuestion, setValue]);

    return (
        <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
                {listAnswer.map((item) => (
                    <Radio key={item.id} value={item.id}>
                        <CheckOutlined className={'icon-check'} />
                        {item.value}
                    </Radio>
                ))}
            </Space>
        </Radio.Group>
    );
};

export default ListAnswer;
