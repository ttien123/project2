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
    idQuestion: number;
    idGroup: number;
}

const ListAnswer = ({ listAnswer, numberQuestion, idGroup, idQuestion }: Props) => {
    const { listAnswer: listAnswerAll, setListAnswer } = useGetInfoExercise();
    const [value, setValue] = useState<number | undefined>(undefined);
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        const newAnswer = {
            idGroup,
            idQuestion,
            answer: e.target.value,
        };
        setListAnswer(newAnswer);
    };

    useEffect(() => {
        listAnswerAll.forEach((item) => {
            if (item.idQuestion === idQuestion && item.idGroup == idGroup) {
                setValue(item.answer);
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
