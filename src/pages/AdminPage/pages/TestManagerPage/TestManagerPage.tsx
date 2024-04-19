import InputSearch from 'src/components/InputSearch';
import HeadingAdminPage from '../../components/HeadingAdminPage';
import ButtonAdd from 'src/components/ButtonAdd';
import iconPlus from 'src/assets/images/IconPlus.png';
import iconPen from 'src/assets/images/IconPen.png';
import iconBin from 'src/assets/images/IconBin.png';
import iconDownSmall from 'src/assets/images/iconDownSmall.png';

import classNames from 'classnames/bind';
import styles from './TestManagerPage.module.scss';
const cx = classNames.bind(styles);

import { Space, Table } from 'antd';
import { Exercise, listExe } from 'src/mock/listExe';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import { Link } from 'react-router-dom';
import PopoverCst from 'src/components/Popover';

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
    const [pageSize, setPageSize] = useState<number>(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    const [listExerciseNow, setListExerciseNow] = useState<Exercise[]>(listExe);
    const { valueSearch } = useGetValueSearch();

    const columns: ColumnsType<Exercise> = [
        {
            title: () => <span className={cx('title')}>{'STT'}</span>,
            width: '10%',
            dataIndex: 'id',
            key: 'id',
            responsive: ['lg'],
            render: (value, record, index) => {
                return <div>{index + 1}</div>;
            },
        },
        {
            title: () => <span className={cx('title')}>Test name</span>,
            dataIndex: 'name',
            width: '30%',
            key: 'name',
            render: (value: any, record: Exercise) => {
                return <div className={cx('max-line')}>{record.name}</div>;
            },
        },
        {
            title: () => <span className={cx('title')}>{'Time'}</span>,
            dataIndex: 'time',
            width: '20%',
            key: 'time',
            render: (value: any, record: Exercise) => {
                return <div>{record.time}</div>;
            },
        },
        {
            title: () => <span className={cx('title')}>{'Start'}</span>,
            dataIndex: 'start',
            width: '20%',
            key: 'Start',
            render: (value: any, record: Exercise) => {
                return <div>{record.start}</div>;
            },
        },
        {
            title: <span className={cx('title')}>{'Action'}</span>,
            key: 'action',
            width: '20%',
            render: (value, record: Exercise) => (
                <Space size="middle" style={{ width: '100%', columnGap: 32 }}>
                    <Link to={''}>
                        <img src={iconPen} alt="icon" style={{ width: 20, height: 20 }} />
                    </Link>
                    <button onClick={() => handleDeleteExercise(record)}>
                        <img src={iconBin} alt="icon" style={{ width: 20, height: 20 }} />
                    </button>
                </Space>
            ),
        },
    ];

    const handleChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteExercise = (record: Exercise) => {
        const indexValue = listExerciseNow.findIndex((item) => item.id === record.id);
        const newList: Exercise[] = [...listExerciseNow];
        newList.splice(indexValue, 1);
        setListExerciseNow(newList);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = listExerciseNow.slice(startIndex, endIndex);

    useEffect(() => {
        let newList = listExe.filter((e) =>
            e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
        );
        setListExerciseNow(newList);
    }, [valueSearch]);
    return (
        <HeadingAdminPage title={'Test manager'}>
            <div className={cx('wrapper-search')}>
                <div className={cx('wrapper-search-input')}>
                    <InputSearch />
                </div>
                <div className={cx('wrapper-search-add')}>
                    <ButtonAdd srcIcon={iconPlus} content="New test" isNormal />
                </div>
            </div>
            <div className={cx('table-container')}>
                <Table
                    columns={columns}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: pageSize,
                        onChange: handleChange,
                    }}
                    rowKey={(record) => record.id}
                    dataSource={listExerciseNow}
                    scroll={{ y: currentPageData.length >= 8 ? 300 : undefined }}
                />
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
            </div>
        </HeadingAdminPage>
    );
};

export default TestManagerPage;
