import InputSearch from 'src/components/InputSearch';
import HeadingAdminPage from '../../components/HeadingAdminPage';
import ButtonAdd from 'src/components/ButtonAdd';
import iconPlus from 'src/assets/images/IconPlus.png';
import iconPen from 'src/assets/images/IconPen.png';
import iconBin from 'src/assets/images/IconBin.png';
import iconDownSmall from 'src/assets/images/iconDownSmall.png';

import classNames from 'classnames/bind';
import styles from './TestQuizPage.module.scss';
const cx = classNames.bind(styles);

import { Space, Table } from 'antd';
import { Exercise } from 'src/mock/listExe';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import { Link, useNavigate } from 'react-router-dom';
import PopoverCst from 'src/components/Popover';
import path from 'src/constants/path';
import MenuTop from 'src/components/MenuTop';
import AdminNav from 'src/components/AdminNav';
import ModalCst from 'src/components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import { toast } from 'react-toastify';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import { groupQuestionType } from 'src/mock/listGroupQuestion';

interface PropsListPageSize {
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListPageSize = ({ setPageSize, setOpenPopover }: PropsListPageSize) => {
    return (
        <ul className={cx('listPageSize')}>
            <li
                onClick={() => {
                    setPageSize(6);
                    setOpenPopover(false);
                }}
                className={cx('listPageSize-item')}
            >
                6
            </li>
            <li
                onClick={() => {
                    setPageSize(8);
                    setOpenPopover(false);
                }}
                className={cx('listPageSize-item')}
            >
                8
            </li>
            <li
                onClick={() => {
                    setPageSize(10);
                    setOpenPopover(false);
                }}
                className={cx('listPageSize-item')}
            >
                10
            </li>
        </ul>
    );
};

const TestManagerPage = () => {
    const negative = useNavigate();
    const { listGrQuestion, setActiveExerciseAdmin, setListGrQuestion, setActiveListGroupQuestion } =
        useGetInfoExercise();
    const [listGrQuestionNow, setListGrQuestionNow] = useState<groupQuestionType[]>(listGrQuestion);
    const [pageSize, setPageSize] = useState<number>(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [topicDelete, setTopicDelete] = useState<groupQuestionType | undefined>(undefined);
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    const { valueSearch } = useGetValueSearch();

    const handleChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteExercise = (record: Exercise | groupQuestionType) => {
        const indexValue = listGrQuestion.findIndex((item) => item.id === record.id);
        const newList: groupQuestionType[] = [...listGrQuestion];
        newList.splice(indexValue, 1);
        setListGrQuestion(newList);
        setOpenConfirmDelete(false);
        toast.success('Xóa bài tập thành công', {
            autoClose: 1500,
        });
    };

    const columns: ColumnsType<groupQuestionType> = [
        {
            title: () => <span className={cx('title')}>{'STT'}</span>,
            width: '10%',
            dataIndex: 'id',
            key: 'id',
            responsive: ['lg'],
            render: (value, record, index) => {
                return <div>{index + 1 + (currentPage - 1) * pageSize}</div>;
            },
        },
        {
            title: () => <span className={cx('title')}>Topic name</span>,
            dataIndex: 'name',
            width: '50%',
            key: 'name',
            render: (value: any, record: groupQuestionType) => {
                return <div className={cx('max-line')}>{record.name}</div>;
            },
        },
        {
            title: () => <span className={cx('title')}>{'Total question'}</span>,
            width: '20%',
            dataIndex: 'ListQuestion',
            key: 'id',
            render: (value, record: groupQuestionType) => {
                return <div>{record.ListQuestion.length}</div>;
            },
        },
        {
            title: <span className={cx('title')}>{'Action'}</span>,
            key: 'action',
            width: '20%',
            render: (value, record: groupQuestionType) => (
                <Space size="middle" style={{ width: '100%', columnGap: 32, justifyContent: 'center' }}>
                    <Link to={path.questionManager} onClick={() => setActiveListGroupQuestion(record)}>
                        <img src={iconPen} alt="icon" style={{ width: 20, height: 20 }} />
                    </Link>
                    <button
                        onClick={() => {
                            setOpenConfirmDelete(true);
                            setTopicDelete(record);
                        }}
                    >
                        <img src={iconBin} alt="icon" style={{ width: 20, height: 20 }} />
                    </button>
                </Space>
            ),
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = listGrQuestion.slice(startIndex, endIndex);

    useEffect(() => {
        const remainingItems = listGrQuestion.length;
        const maxPage = Math.ceil(remainingItems / pageSize);
        if (currentPage > maxPage && maxPage > 0) {
            setCurrentPage(maxPage);
        }
    }, [listGrQuestion, pageSize]);

    useEffect(() => {
        let newList = listGrQuestion.filter((e) =>
            e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
        );
        setListGrQuestionNow(newList);
    }, [valueSearch]);

    useEffect(() => {
        setListGrQuestionNow(listGrQuestion);
    }, [listGrQuestion]);
    return (
        <>
            <MenuTop element={<AdminNav />} title={'List topic manager'} />
            <ModalCst
                Content={
                    <ConfirmDelete
                        title="Bạn có chắc chắn muốn xóa topic này?"
                        setOpen={setOpenConfirmDelete}
                        handleDeleteExercise={handleDeleteExercise}
                        record={topicDelete}
                    />
                }
                open={openConfirmDelete}
                setOpen={setOpenConfirmDelete}
            />
            <HeadingAdminPage
                title={'List topic manager'}
                listLink={
                    <div>
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.admin}>
                            Home
                        </Link>
                        <span>{' > List topic manager'}</span>
                    </div>
                }
            >
                <div className={cx('wrapper-search')}>
                    <div className={cx('wrapper-search-input')}>
                        <InputSearch setNumberPage={setCurrentPage} isTestManager />
                    </div>
                    <div className={cx('wrapper-search-add')}>
                        <ButtonAdd
                            handleClick={() => {
                                setActiveExerciseAdmin(undefined);
                                negative(path.createTopic);
                            }}
                            srcIcon={iconPlus}
                            content="New topic"
                            isNormal
                        />
                    </div>
                </div>
                <div className={`${cx('table-container')} testQuizPage`}>
                    <Table
                        columns={columns}
                        pagination={{
                            position: ['bottomCenter'],
                            pageSize: pageSize,
                            onChange: handleChange,
                            current: currentPage,
                        }}
                        rowKey={(record) => record.id}
                        dataSource={listGrQuestionNow}
                        scroll={{ y: currentPageData.length >= 8 ? 300 : undefined }}
                    />
                    {listGrQuestionNow.length > 0 && (
                        <button className={cx('pageSizeTable')}>
                            <PopoverCst
                                open={openPopover}
                                setOpen={setOpenPopover}
                                content={<ListPageSize setPageSize={setPageSize} setOpenPopover={setOpenPopover} />}
                            >
                                <span>{pageSize}</span>
                                <img src={iconDownSmall} alt="icon" />
                            </PopoverCst>
                        </button>
                    )}
                </div>
            </HeadingAdminPage>
        </>
    );
};

export default TestManagerPage;
