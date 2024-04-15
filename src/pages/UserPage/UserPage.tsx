import { Col, Row } from 'antd';

import iconArrowDow from 'src/assets/images/iconArrowDow.png';
import InputSearch from 'src/components/InputSearch';
import UserInfo from 'src/components/UserInfo';
import iconClock from 'src/assets/images/IconClock.png';
import iconGoal from 'src/assets/images/iconGoal.png';
import DrawerCst from 'src/components/Drawer';
import { Exercise, listExe } from 'src/mock/listExe';
import IconStar from 'src/assets/IconStar';
import PaginationCst from 'src/components/Pagination/Pagination';

import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import useGetValueSearch from 'src/zustand/searchValue.ztd';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import SelectDifficult from 'src/components/SelectDifficult';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import { ListQuestionType } from 'src/mock/listQuestion';
const cx = classNames.bind(styles);
const UserPage = () => {
    const [numberPage, setNumberPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(6);
    const [listExercise, setListExercise] = useState<Exercise[]>(listExe);
    const { valueSearch, valueDiff } = useGetValueSearch();
    const { setActiveExercise } = useGetInfoExercise();

    const handleClickExercise = (istQuestion: Exercise) => {
        setActiveExercise(istQuestion);
    };

    useEffect(() => {
        if (valueDiff === 0) {
            let newList = listExe.filter((e) =>
                e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
            );
            setListExercise(newList);
        } else {
            let newList = listExe.filter(
                (e) =>
                    e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || '') &&
                    e.difficult === valueDiff,
            );
            setListExercise(newList);
        }
    }, [valueSearch, valueDiff]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-menu')}>
                <div className={cx('wrapper-menu-icon')}>
                    <DrawerCst element={<UserInfo />} />
                </div>
                <div className={cx('wrapper-menu-name')}>Dashboard</div>
            </div>
            <Row style={{ flex: 1 }}>
                <Col span={0} xl={6} className={cx('info')}>
                    <UserInfo />
                </Col>
                <Col span={24} xl={18} className={cx('main')}>
                    <div className={cx('search-area')}>
                        <div className={cx('search-area-input')}>
                            <InputSearch />
                        </div>
                        <div className={cx('search-area-select')}>
                            <SelectDifficult />
                            <img src={iconArrowDow} alt="icon" className={cx('search-area-select-icon')} />
                        </div>
                    </div>

                    <div className={cx('main-exe')}>
                        <div className={cx('main-exe-container')}>
                            {listExercise.map((item, index) => {
                                if (index >= pageSize * numberPage && index < pageSize * numberPage + pageSize) {
                                    return (
                                        <Link
                                            onClick={() => handleClickExercise(item)}
                                            to={path.exercisePage}
                                            key={item.id}
                                            className={cx('exe-item')}
                                        >
                                            <div className={cx('exe-item-name')}>{item.name}</div>
                                            <div className={cx('exe-item-des')}>
                                                <div className={cx('exe-item-des-time')}>
                                                    <img
                                                        src={iconClock}
                                                        alt="img"
                                                        className={cx('exe-item-des-time-img')}
                                                    />
                                                    <span className={cx('exe-item-des-time-number')}>
                                                        {item.time} phút
                                                    </span>
                                                </div>
                                                <div className={cx('exe-item-des-goal')}>
                                                    <img
                                                        src={iconGoal}
                                                        alt="img"
                                                        className={cx('exe-item-des-goal-img')}
                                                    />
                                                    <div className={cx('exe-item-des-goal-number')}>
                                                        {item.goal} điểm
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('exe-item-star')}>
                                                {Array(5)
                                                    .fill(0)
                                                    .map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className={cx('exe-item-star-icon', {
                                                                'exe-item-star-fill': index < item.difficult,
                                                            })}
                                                        >
                                                            <IconStar />
                                                        </div>
                                                    ))}
                                            </div>
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <PaginationCst
                            setNumberPage={setNumberPage}
                            setPageSize={setPageSize}
                            totalListExercise={listExercise.length}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default UserPage;
