import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Radio } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames/bind';
import styles from './CreateOrRepairQs.module.scss';
import Input from 'src/components/Input';
import { QuestionSchema, questionSchema } from 'src/utils/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import { ListQuestionTypeGr, groupQuestionType } from 'src/mock/listGroupQuestion';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

interface Props {
    setOpenInfoQuestion: React.Dispatch<React.SetStateAction<boolean>>;
    questionRepair: ListQuestionTypeGr | undefined;
}

type FormDataQuestion = Pick<
    QuestionSchema,
    'question' | 'answerA' | 'answerB' | 'answerC' | 'answerD' | 'correctAnswer'
>;
const createOrRepairSchema = questionSchema.pick([
    'question',
    'answerA',
    'answerB',
    'answerC',
    'answerD',
    'correctAnswer',
]);

const CreateOrRepairQs = ({ setOpenInfoQuestion, questionRepair }: Props) => {
    const { activeListGroupQuestion, listGrQuestion, setListGrQuestion } = useGetInfoExercise();
    const [valueCorrectAnswer, setValueCorrectAnswer] = useState<string>('');
    const [isSelectCorrectAnswer, setIsSelectCorrectAnswer] = useState<boolean>(false);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataQuestion>({
        defaultValues: {
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
            question: '',
            correctAnswer: '',
        },
        resolver: yupResolver(createOrRepairSchema),
    });

    const onChange = (e: RadioChangeEvent) => {
        setValue('correctAnswer', e.target.value);
        setValueCorrectAnswer(e.target.value);
        setIsSelectCorrectAnswer(false);
    };

    const onSubmit = handleSubmit((data) => {
        const { answerA, answerB, answerC, answerD, correctAnswer, question } = data;
        if (!questionRepair) {
            const newListGrQs = listGrQuestion.map((item) => {
                if (item.id === activeListGroupQuestion?.id) {
                    const newQuestion: ListQuestionTypeGr = {
                        id: uuidv4(),
                        idGroup: item.id,
                        question: question,
                        answer: Number(correctAnswer),
                        listAnswer: [
                            { id: 0, value: answerA },
                            { id: 1, value: answerB },
                            { id: 2, value: answerC },
                            { id: 3, value: answerD },
                        ],
                    };
                    const newListQs = [...activeListGroupQuestion.ListQuestion, newQuestion];
                    const newList: groupQuestionType = {
                        id: item.id,
                        name: item.name,
                        ListQuestion: newListQs,
                    };
                    return newList;
                } else {
                    return item;
                }
            });
            setListGrQuestion(newListGrQs);
            setOpenInfoQuestion(false);
            toast.success('Tạo câu hỏi mới thành công');
        } else {
            const newListGrQs = listGrQuestion.map((item) => {
                if (item.id === activeListGroupQuestion?.id) {
                    const newQuestion: ListQuestionTypeGr = {
                        id: uuidv4(),
                        idGroup: item.id,
                        question: question,
                        answer: Number(correctAnswer),
                        listAnswer: [
                            { id: 0, value: answerA },
                            { id: 1, value: answerB },
                            { id: 2, value: answerC },
                            { id: 3, value: answerD },
                        ],
                    };
                    const newListQs: ListQuestionTypeGr[] = item.ListQuestion.map((item) => {
                        if (item.id === questionRepair.id && item.idGroup === questionRepair.idGroup) {
                            return {
                                id: item.id,
                                idGroup: item.idGroup,
                                question: question,
                                answer: Number(correctAnswer),
                                listAnswer: [
                                    { id: 0, value: answerA },
                                    { id: 1, value: answerB },
                                    { id: 2, value: answerC },
                                    { id: 3, value: answerD },
                                ],
                            };
                        } else {
                            return item;
                        }
                    });
                    const newList: groupQuestionType = {
                        id: item.id,
                        name: item.name,
                        ListQuestion: newListQs,
                    };
                    return newList;
                } else {
                    return item;
                }
            });
            setListGrQuestion(newListGrQs);
            setOpenInfoQuestion(false);
            toast.success('Update câu hỏi thành công');
        }
    });

    useEffect(() => {
        if (questionRepair) {
            setValue('question', questionRepair.question);
            setValue('correctAnswer', questionRepair.answer.toString());
            setValue('answerA', questionRepair.listAnswer[0].value);
            setValue('answerB', questionRepair.listAnswer[1].value);
            setValue('answerC', questionRepair.listAnswer[2].value);
            setValue('answerD', questionRepair.listAnswer[3].value);
            setValueCorrectAnswer(questionRepair.answer.toString());
        }
    }, [questionRepair]);

    return (
        <div className={`${cx('wrapper')} CreateOrRepairQs`}>
            <form onSubmit={onSubmit}>
                <div className={cx('wrapper-heading')}>
                    <div className={cx('wrapper-heading-question')}>Câu hỏi</div>
                    <Input
                        errorsMessage={errors.question?.message}
                        register={register}
                        name="question"
                        isSmall
                        isBorder
                        isFull
                        placeholder="Enter question"
                    />
                </div>
                <div className={cx('wrapper-answer')}>
                    <div className={cx('wrapper-answer-item')}>
                        <div className={cx('wrapper-answer-item-value')}>A</div>
                        <Input
                            errorsMessage={errors.answerA?.message}
                            placeholder="Enter answer"
                            name="answerA"
                            register={register}
                            isSmall
                            isBorder
                            isFull
                        />
                    </div>
                    <div className={cx('wrapper-answer-item')}>
                        <div className={cx('wrapper-answer-item-value')}>B</div>
                        <Input
                            errorsMessage={errors.answerB?.message}
                            placeholder="Enter answer"
                            name="answerB"
                            register={register}
                            isSmall
                            isBorder
                            isFull
                        />
                    </div>
                    <div className={cx('wrapper-answer-item')}>
                        <div className={cx('wrapper-answer-item-value')}>C</div>
                        <Input
                            errorsMessage={errors.answerC?.message}
                            placeholder="Enter answer"
                            name="answerC"
                            register={register}
                            isSmall
                            isBorder
                            isFull
                        />
                    </div>
                    <div className={cx('wrapper-answer-item')}>
                        <div className={cx('wrapper-answer-item-value')}>D</div>
                        <Input
                            errorsMessage={errors.answerD?.message}
                            placeholder="Enter answer"
                            name="answerD"
                            register={register}
                            isSmall
                            isBorder
                            isFull
                        />
                    </div>
                </div>
                <div className={cx('select-Correct-answer')}>
                    <div className={cx('select-Correct-answer-des')}>Đáp án đúng:</div>
                    <div className={cx('select-Correct-answer-item')}>
                        <Radio.Group size="large" onChange={onChange} value={valueCorrectAnswer}>
                            <Radio value={'0'}>A</Radio>
                            <Radio value={'1'}>B</Radio>
                            <Radio value={'2'}>C</Radio>
                            <Radio value={'3'}>D</Radio>
                        </Radio.Group>
                    </div>
                </div>
                {<div className={cx('className-error')}>{isSelectCorrectAnswer && errors.correctAnswer?.message}</div>}
                <div className={cx('wrapper-button')}>
                    <Button
                        onClick={() => setOpenInfoQuestion(false)}
                        style={{ width: 120 }}
                        size="large"
                        type="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        onClick={() => !isSelectCorrectAnswer && setIsSelectCorrectAnswer(true)}
                        style={{ width: 120 }}
                        size="large"
                        type="default"
                    >
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateOrRepairQs;
