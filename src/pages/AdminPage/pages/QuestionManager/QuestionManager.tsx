import { useEffect, useState } from 'react';
import AdminNav from 'src/components/AdminNav';
import MenuTop from 'src/components/MenuTop';
import HeadingAdminPage from '../../components/HeadingAdminPage';
import { Link, useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
import imgAdd from 'src/assets/images/IconAdd.png';
import iconPen from 'src/assets/images/IconPen.png';
import iconBin from 'src/assets/images/IconBin.png';

import classNames from 'classnames/bind';
import styles from './QuestionManager.module.scss';
import InputSearch from 'src/components/InputSearch';
import ButtonAdd from 'src/components/ButtonAdd';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import { Space } from 'antd';
import PaginationCst from 'src/components/Pagination/Pagination';
import Nodata from 'src/components/Nodata';
import { ListQuestionTypeGr } from 'src/mock/listGroupQuestion';
import ModalCst from 'src/components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import CreateOrRepairQs from '../CreateOrRepairQs';
const cx = classNames.bind(styles);

const QuestionManager = () => {
    const { activeListGroupQuestion, listGrQuestion, setListGrQuestion } = useGetInfoExercise();
    const { valueSearch } = useGetValueSearch();
    const [numberPage, setNumberPage] = useState<number>(0);
    const [listGrQsNow, setListGrQsNow] = useState<ListQuestionTypeGr[] | undefined>(
        activeListGroupQuestion?.ListQuestion,
    );
    const [openDeleteQuestion, setOpenDeleteQuestion] = useState<boolean>(false);
    const [openInfoQuestion, setOpenInfoQuestion] = useState<boolean>(false);
    const [questionDelete, setQuestionDelete] = useState<ListQuestionTypeGr | undefined>(undefined);
    const [questionRepair, setQuestionRepair] = useState<ListQuestionTypeGr | undefined>(undefined);

    const handleDeleteQuestion = () => {
        if (questionDelete) {
            const newListGrQuestion = [...listGrQuestion];
            const result = newListGrQuestion.map((item) => {
                if (item.id === activeListGroupQuestion?.id) {
                    const indexDelete = item.ListQuestion.findIndex(
                        (itemQuestion) =>
                            itemQuestion.id === questionDelete.id && itemQuestion.idGroup === questionDelete.idGroup,
                    );
                    item.ListQuestion.splice(indexDelete, 1);
                    return item;
                } else {
                    return item;
                }
            });
            setListGrQuestion(result);
        }
    };

    useEffect(() => {
        if (listGrQsNow && activeListGroupQuestion) {
            listGrQuestion.forEach((item) => {
                if (item.id === activeListGroupQuestion.id) {
                    const remainingItems = listGrQsNow.length;
                    const maxPage = Math.ceil(remainingItems / 2) - 1;
                    if (numberPage > maxPage && maxPage >= 0) {
                        setNumberPage(maxPage);
                    }
                }
            });
        }
    }, [listGrQuestion, listGrQsNow]);

    useEffect(() => {
        listGrQuestion.forEach((item) => {
            if (item.id === activeListGroupQuestion?.id) {
                setListGrQsNow(item.ListQuestion);
            }
        });
    }, [listGrQuestion]);

    useEffect(() => {
        listGrQuestion.forEach((item) => {
            if (item.id === activeListGroupQuestion?.id) {
                let newList = item.ListQuestion.filter((e) =>
                    e.question.toLocaleLowerCase().includes(valueSearch?.trim().toLocaleLowerCase() || ''),
                );
                setListGrQsNow(newList);
            }
        });
    }, [valueSearch, listGrQuestion]);

    return (
        <>
            <MenuTop element={<AdminNav />} title={'Question Manager'} />
            <ModalCst
                Content={
                    <ConfirmDelete
                        title="Bạn có chắc chắn muốn xóa Câu hỏi này?"
                        setOpen={setOpenDeleteQuestion}
                        handleDelete={handleDeleteQuestion}
                    />
                }
                open={openDeleteQuestion}
                setOpen={setOpenDeleteQuestion}
            />
            <ModalCst
                width={800}
                Content={<CreateOrRepairQs setOpenInfoQuestion={setOpenInfoQuestion} questionRepair={questionRepair} />}
                open={openInfoQuestion}
                setOpen={setOpenInfoQuestion}
                className={'QuestionManagerModal'}
            />
            <HeadingAdminPage
                title={'Question Manager'}
                listLink={
                    <div>
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.admin}>
                            Home
                        </Link>
                        {' > '}
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.testQuiz}>
                            {'Test quiz manager'}
                        </Link>
                        <span>{' > Question Manager'}</span>
                    </div>
                }
            >
                <div className={cx('wrapper-search')}>
                    <div className={cx('wrapper-search-input')}>
                        <InputSearch setNumberPage={setNumberPage} />
                    </div>
                    <div className={cx('wrapper-search-add')}>
                        <ButtonAdd
                            handleClick={() => {
                                setQuestionRepair(undefined);
                                setOpenInfoQuestion(true);
                            }}
                            srcIcon={imgAdd}
                            content="New Question"
                        />
                    </div>
                </div>
                <h3 className={cx('total-question')}>Tổng số câu hỏi: {listGrQsNow?.length || 0}</h3>
                <div className={cx('list-question')}>
                    {listGrQsNow && listGrQsNow.length > 0 ? (
                        listGrQsNow.map((item, index) => {
                            if (index >= 2 * numberPage && index < 2 * numberPage + 2) {
                                return (
                                    <div key={item.id} className={cx('list-question-item')}>
                                        <div className={cx('question-info')}>
                                            <h4 className={cx('question-info-name')}>{item.question}</h4>
                                            <div className={cx('question-info-List')}>
                                                {item.listAnswer.map((itemAnswer) => (
                                                    <div
                                                        key={itemAnswer.id}
                                                        className={cx('question-info-List-answer', {
                                                            active: itemAnswer.id === item.answer,
                                                        })}
                                                    >
                                                        {itemAnswer.id === 0 && `A. ${itemAnswer.value}`}
                                                        {itemAnswer.id === 1 && `B. ${itemAnswer.value}`}
                                                        {itemAnswer.id === 2 && `C. ${itemAnswer.value}`}
                                                        {itemAnswer.id === 3 && `D. ${itemAnswer.value}`}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={cx('question-action')}>
                                            <Space
                                                size="middle"
                                                style={{ width: '100%', columnGap: 16, justifyContent: 'center' }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setOpenInfoQuestion(true);
                                                        setQuestionRepair(item);
                                                    }}
                                                >
                                                    <img src={iconPen} alt="icon" style={{ width: 20, height: 20 }} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenDeleteQuestion(true);
                                                        setQuestionDelete(item);
                                                    }}
                                                >
                                                    <img src={iconBin} alt="icon" style={{ width: 20, height: 20 }} />
                                                </button>
                                            </Space>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <Nodata />
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <PaginationCst
                        pageSize={2}
                        numberPage={numberPage}
                        setNumberPage={setNumberPage}
                        totalListExercise={listGrQsNow ? listGrQsNow.length : 0}
                    />
                </div>
            </HeadingAdminPage>
        </>
    );
};

export default QuestionManager;
