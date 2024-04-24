import iconBin from 'src/assets/images/IconBin.png';
import HeadingAdminPage from '../../components/HeadingAdminPage';
import path from 'src/constants/path';
import { Link } from 'react-router-dom';
import MenuTop from 'src/components/MenuTop';
import AdminNav from 'src/components/AdminNav';
import Input from 'src/components/Input';
import SelectDifficultAdmin from 'src/components/SelectDifficultAdmin';
import { useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxProps } from 'antd';
import { ListQuestionTypeGr, groupQuestionType, listGroupQuestion } from 'src/mock/listGroupQuestion';
import PaginationCst from 'src/components/Pagination/Pagination';
import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames/bind';
import styles from './CreateTest.module.scss';
import InputNumber from 'src/components/InputNumber';
import { Controller, useForm } from 'react-hook-form';
import { ExerciseSchema, exerciseSchema } from 'src/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { Exercise } from 'src/mock/listExe';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import { toast } from 'react-toastify';
import Nodata from 'src/components/Nodata';
const cx = classNames.bind(styles);

type FormExerciseSchema = Pick<ExerciseSchema, 'testName' | 'time' | 'difficult'>;
const createExerciseSchema = exerciseSchema.pick(['testName', 'time', 'difficult']);

const CreateTest = () => {
    const { listExercise, setListExercise, activeExerciseAdmin } = useGetInfoExercise();
    const [numberPageGrQuestion, setNumberPageGrQuestion] = useState<number>(0);
    const [numberPageListQsCh, setNumberPageListQsCh] = useState<number>(0);
    const [isSubmitNoQs, setIsSubmitNoQs] = useState<boolean>(false);
    const [isReverseQuestion, setIsReverseQuestion] = useState<boolean>(false);
    const [selectDiff, setSelectDiff] = useState<number | undefined>(undefined);
    const [selectGroupExercise, setSelectGroupExercise] = useState<number | undefined>(undefined);
    const [groupQuestionChoice, setGroupQuestionChoice] = useState<groupQuestionType | undefined>(undefined);
    const [listQuestionChoice, setListQuestionChoice] = useState<ListQuestionTypeGr[]>([]);
    const listGroupExercise: { value: number; label: string }[] = listGroupQuestion.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const {
        reset,
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormExerciseSchema>({
        defaultValues: {
            testName: '',
            time: '',
            difficult: '',
        },
        resolver: yupResolver(createExerciseSchema),
    });

    const onSubmit = handleSubmit((data) => {
        if (listQuestionChoice.length >= 5 && !activeExerciseAdmin) {
            const newObj: Exercise = {
                id: uuidv4(),
                name: data.testName,
                time: Number(data.time),
                difficult: Number(data.difficult),
                goal: '200/250',
                start: 1,
                listQuestion: listQuestionChoice,
                reverseQuestion: isReverseQuestion,
            };
            const newListExercise = [...listExercise, newObj];
            toast.success('Tạo bài test thành công');
            setListExercise(newListExercise);
            setIsSubmitNoQs(false);
            setNumberPageGrQuestion(0);
            setNumberPageListQsCh(0);
            setIsReverseQuestion(false);
            setSelectDiff(undefined);
            setSelectGroupExercise(undefined);
            setGroupQuestionChoice(undefined);
            setListQuestionChoice([]);
            reset();
        }

        if (listQuestionChoice.length >= 5 && activeExerciseAdmin) {
            const newListExercise = listExercise.map((item) => {
                if (item.id === activeExerciseAdmin.id) {
                    return {
                        id: item.id,
                        name: data.testName,
                        time: Number(data.time),
                        difficult: Number(data.difficult),
                        goal: '200/250',
                        start: 1,
                        listQuestion: listQuestionChoice,
                        reverseQuestion: isReverseQuestion,
                    };
                } else {
                    return item;
                }
            });

            toast.success('Tạo bài test thành công');
            setListExercise(newListExercise);
            setIsSubmitNoQs(false);
            setNumberPageGrQuestion(0);
            setNumberPageListQsCh(0);
            setIsReverseQuestion(false);
            setSelectDiff(undefined);
            setSelectGroupExercise(undefined);
            setGroupQuestionChoice(undefined);
            setListQuestionChoice([]);
            reset();
        }
    });

    const handleChangeCheckbox: CheckboxProps['onChange'] = (e) => {
        setIsReverseQuestion(e.target.checked);
    };
    const handleChooseQuestion = (e: React.ChangeEvent<HTMLInputElement>, item: ListQuestionTypeGr) => {
        if (e.target.checked === true) {
            setListQuestionChoice((prev) => {
                let newArr = [...prev];
                newArr.push(item);
                return newArr;
            });
        } else {
            setListQuestionChoice((prev) => {
                let newArr = [...prev];
                let arrFilter = newArr.filter(
                    (itemFilter) => itemFilter.id === item.id && itemFilter.idGroup === item.idGroup,
                );
                let result = newArr.filter((itemRs) => !arrFilter.includes(itemRs));
                return result;
            });
        }
    };
    const handleDeleteQsCh = (item: ListQuestionTypeGr) => {
        let newArr = [...listQuestionChoice];
        let arrFilter = newArr.filter((itemFilter) => itemFilter.id === item.id && itemFilter.idGroup === item.idGroup);
        let result = newArr.filter((itemRs) => !arrFilter.includes(itemRs));
        setListQuestionChoice(result);
        if (result.length <= 3 * numberPageListQsCh && numberPageListQsCh > 0) {
            setNumberPageListQsCh((prev) => prev - 1);
        }
    };

    useEffect(() => {
        if (activeExerciseAdmin) {
            setValue('testName', activeExerciseAdmin.name);
            setValue('difficult', activeExerciseAdmin.difficult.toString());
            setValue('time', activeExerciseAdmin.time.toString());
            setSelectDiff(activeExerciseAdmin.difficult);
            setIsReverseQuestion(activeExerciseAdmin.reverseQuestion);
            setListQuestionChoice(activeExerciseAdmin.listQuestion);
        }
    }, [activeExerciseAdmin]);

    useEffect(() => {
        if (selectGroupExercise || selectGroupExercise === 0) {
            const newArr = listGroupQuestion.find((item) => item.id === selectGroupExercise);
            setGroupQuestionChoice(newArr);
        }
    }, [selectGroupExercise]);

    useEffect(() => {
        selectDiff && setValue('difficult', selectDiff?.toString());
    }, [selectDiff]);

    return (
        <>
            <MenuTop element={<AdminNav />} title={'Test Manager'} />
            <HeadingAdminPage
                title="Thêm mới test"
                listLink={
                    <div>
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.admin}>
                            Home
                        </Link>
                        {' > '}
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.testManager}>
                            {'Test quiz manager'}
                        </Link>
                        <span>{' > new test'}</span>
                    </div>
                }
            >
                <div className={`${cx('wrapper')} adminPage`}>
                    <div className={cx('wrapper-container')}>
                        <form onSubmit={onSubmit} className={cx('box-form-container')}>
                            <div>
                                <div className={cx('wrapper-form')}>
                                    <div className={cx('wrapper-form-label')}>Test name:</div>
                                    <Input
                                        isSmall
                                        isFull
                                        name="testName"
                                        register={register}
                                        errorsMessage={errors.testName?.message}
                                    />
                                </div>
                                <div className={cx('wrapper-box-form')}>
                                    <div className={cx('wrapper-box-form-item')}>
                                        <div className={cx('wrapper-box-form-item-label')}>Time:</div>
                                        <Controller
                                            control={control}
                                            name="time"
                                            render={({ field }) => {
                                                return (
                                                    <InputNumber
                                                        type="text"
                                                        placeholder="phút"
                                                        onChange={(event) => {
                                                            field.onChange(event);
                                                        }}
                                                        value={field.value}
                                                        ref={field.ref}
                                                        errorsMessage={errors.time?.message}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={cx('wrapper-box-form-item')}>
                                        <div className={cx('wrapper-box-form-item-label')}>Độ khó:</div>
                                        <div>
                                            <SelectDifficultAdmin
                                                selected={selectDiff}
                                                setSelect={setSelectDiff}
                                                listValue={[
                                                    { value: 1, label: 'Độ khó 1' },
                                                    { value: 2, label: 'Độ khó 2' },
                                                    { value: 3, label: 'Độ khó 3' },
                                                    { value: 4, label: 'Độ khó 4' },
                                                    { value: 5, label: 'Độ khó 5' },
                                                ]}
                                            />
                                            <div className={cx('error-message')}>
                                                {!selectDiff && errors.difficult?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('wrapper-box-form')}>
                                    <div className={cx('wrapper-box-form-item')}>
                                        <div
                                            style={{ transform: 'translateY(0)' }}
                                            className={cx(`${cx('wrapper-box-form-item-label')} ${cx('pc')}`)}
                                        >
                                            Nhóm câu hỏi:
                                        </div>
                                        <div
                                            style={{ transform: 'translateY(0)' }}
                                            className={`${cx('wrapper-box-form-item-label')} ${cx('tablet')}`}
                                        >
                                            Nhóm:
                                        </div>
                                        <SelectDifficultAdmin
                                            selected={selectGroupExercise}
                                            setSelect={setSelectGroupExercise}
                                            listValue={listGroupExercise}
                                            setNumberPageGrQuestion={setNumberPageGrQuestion}
                                        />
                                    </div>
                                    <div className={cx('wrapper-box-form-item')}>
                                        <Checkbox
                                            checked={isReverseQuestion}
                                            style={{ fontSize: 16, alignItems: 'center' }}
                                            onChange={handleChangeCheckbox}
                                        >
                                            Đảo câu hỏi
                                        </Checkbox>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('group')}>
                                <div className={cx('group-question')}>
                                    <div style={{ flex: 1 }}>
                                        <h3 className={cx('group-question-title')}>Câu hỏi trong nhóm</h3>
                                        <div className={cx('group-question-list')}>
                                            <div className={cx('group-question-list-info')}>
                                                <div className={cx('group-question-list-info-stt')}>Stt</div>
                                                <div className={cx('group-question-list-info-check')}></div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                    className={cx('group-question-list-info-name')}
                                                >
                                                    Tên câu hỏi
                                                </div>
                                            </div>
                                            {groupQuestionChoice ? (
                                                groupQuestionChoice.ListQuestion.map((item, index) => {
                                                    if (
                                                        index >= 3 * numberPageGrQuestion &&
                                                        index < 3 * numberPageGrQuestion + 3
                                                    ) {
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className={cx('group-question-list-info')}
                                                            >
                                                                <div className={cx('group-question-list-info-stt')}>
                                                                    {index + 1}
                                                                </div>
                                                                <div className={cx('group-question-list-info-check')}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={Boolean(
                                                                            listQuestionChoice.find(
                                                                                (itemFilter) =>
                                                                                    itemFilter.id === item.id &&
                                                                                    itemFilter.idGroup === item.idGroup,
                                                                            ),
                                                                        )}
                                                                        onChange={(e) => handleChooseQuestion(e, item)}
                                                                        className={cx(
                                                                            'group-question-list-info-check-item',
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className={cx('group-question-list-info-name')}>
                                                                    {item.question}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })
                                            ) : (
                                                <Nodata />
                                            )}
                                        </div>
                                    </div>
                                    {groupQuestionChoice && (
                                        <div style={{ marginTop: 16, textAlign: 'center' }}>
                                            <PaginationCst
                                                setNumberPage={setNumberPageGrQuestion}
                                                pageSize={3}
                                                totalListExercise={groupQuestionChoice?.ListQuestion.length}
                                                numberPage={numberPageGrQuestion}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={cx('group-question')}>
                                    <div style={{ flex: 1 }}>
                                        <h3 className={cx('group-question-title')}>
                                            {listQuestionChoice.length < 5 && isSubmitNoQs && (
                                                <span style={{ marginRight: 8 }} className={cx('error-message')}>
                                                    Vui lòng chọn tối thiểu 5 bài test
                                                </span>
                                            )}
                                            <span>Câu hỏi đã chọn</span>
                                        </h3>
                                        <div className={cx('group-question-list')}>
                                            <div className={cx('group-question-list-info')}>
                                                <div className={cx('group-question-list-info-stt')}>Stt</div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                    className={cx('group-question-list-info-name')}
                                                >
                                                    Tên câu hỏi
                                                </div>
                                                <div className={cx('group-question-list-info-check')}>Action</div>
                                            </div>

                                            {listQuestionChoice.length > 0 ? (
                                                listQuestionChoice.map((item, index) => {
                                                    if (
                                                        index >= 3 * numberPageListQsCh &&
                                                        index < 3 * numberPageListQsCh + 3
                                                    ) {
                                                        return (
                                                            <div key={index} className={cx('group-question-list-info')}>
                                                                <div className={cx('group-question-list-info-stt')}>
                                                                    {index + 1}
                                                                </div>
                                                                <div className={cx('group-question-list-info-name')}>
                                                                    {item.question}
                                                                </div>
                                                                <div className={cx('group-question-list-info-check')}>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteQsCh(item)}
                                                                    >
                                                                        <img
                                                                            src={iconBin}
                                                                            alt="img"
                                                                            className={cx(
                                                                                'group-question-list-info-check-item',
                                                                            )}
                                                                        />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })
                                            ) : (
                                                <Nodata />
                                            )}
                                        </div>
                                    </div>

                                    {
                                        <div style={{ marginTop: 16, textAlign: 'center' }}>
                                            <PaginationCst
                                                setNumberPage={setNumberPageListQsCh}
                                                pageSize={3}
                                                totalListExercise={listQuestionChoice.length}
                                                numberPage={numberPageListQsCh}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={cx('btn-box')}>
                                <Button
                                    htmlType={'submit'}
                                    onClick={() => {
                                        if (listQuestionChoice.length < 5) {
                                            setIsSubmitNoQs(true);
                                        } else {
                                            setIsSubmitNoQs(false);
                                        }
                                    }}
                                    type="default"
                                    size="large"
                                    className={cx('btn-box-add')}
                                >
                                    ADD New
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </HeadingAdminPage>
        </>
    );
};

export default CreateTest;
