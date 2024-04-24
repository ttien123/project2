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
import MenuTop from 'src/components/MenuTop';
import Nodata from 'src/components/Nodata';
const cx = classNames.bind(styles);
const UserPage = () => {
    const { listExercise } = useGetInfoExercise();

    const [listExeNow, setListExeNow] = useState<Exercise[]>(listExercise);
    const [numberPage, setNumberPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(6);
    const { valueSearch, valueDiff } = useGetValueSearch();
    const { setActiveExercise } = useGetInfoExercise();

    const handleClickExercise = (istQuestion: Exercise) => {
        setActiveExercise(istQuestion);
    };
    console.log(numberPage);

    useEffect(() => {
        if (valueDiff === 0) {
            let newList = listExercise.filter((e) =>
                e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
            );
            setListExeNow(newList);
        } else {
            let newList = listExercise.filter(
                (e) =>
                    e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || '') &&
                    e.difficult === valueDiff,
            );
            setListExeNow(newList);
        }
    }, [valueSearch, valueDiff]);
    return (
        <div className={`${cx('wrapper')} userPage`}>
            <MenuTop element={<UserInfo />} title={'Dashboard'} />
            <Row style={{ flex: '1' }}>
                <Col span={0} xl={6} className={cx('info')}>
                    <UserInfo />
                </Col>
                <Col span={24} xl={18} className={cx('main')}>
                    <div className={cx('search-area')}>
                        <div className={cx('search-area-input')}>
                            <InputSearch setNumberPage={setNumberPage} />
                        </div>
                        <div className={cx('search-area-select')}>
                            <SelectDifficult setNumberPage={setNumberPage} />
                            <img src={iconArrowDow} alt="icon" className={cx('search-area-select-icon')} />
                        </div>
                    </div>

                    <div className={cx('main-exe')}>
                        {listExeNow.length > 0 ? (
                            listExeNow.map((item, index) => {
                                if (index >= pageSize * numberPage && index < pageSize * numberPage + pageSize) {
                                    return (
                                        <Link
                                            onClick={() => handleClickExercise(item)}
                                            to={path.exercisePage}
                                            key={item.id}
                                            className={cx('exe-item')}
                                        >
                                            <div>
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
                            })
                        ) : (
                            <Nodata />
                        )}
                    </div>
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <PaginationCst
                            numberPage={numberPage}
                            setNumberPage={setNumberPage}
                            totalListExercise={listExeNow.length}
                            pageSize={pageSize}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default UserPage;
