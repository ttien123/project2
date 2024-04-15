import { Button, Col, Row } from 'antd';
import DrawerCst from 'src/components/Drawer';
import ListExercise from 'src/components/ListExercise/ListExercise';
import UserInfo from 'src/components/UserInfo';
import ModalCst from 'src/components/Modal';

import classNames from 'classnames/bind';
import styles from './ExercisePage.module.scss';
import { listQuestion } from 'src/mock/listQuestion';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import ListAnswer from './components/ListAnswer';
import useGetTime from 'src/hooks/useGetTime';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
const cx = classNames.bind(styles);
const ExercisePage = () => {
    const negative = useNavigate();
    const { numQuestionNow, setNumQuestionNow } = useGetInfoExercise();
    const { timeRemaining, totalSeconds } = useGetTime(0, 0, 10);
    const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalSeconds);
    const handlePrevExercise = () => {
        setNumQuestionNow(numQuestionNow - 1);
    };

    const handleNextExercise = () => {
        setNumQuestionNow(numQuestionNow + 1);
    };

    useEffect(() => {
        const { hours, minutes, seconds } = timeRemaining;
        const newTotalTimeRemainingTime = hours * 3600 + minutes * 60 + seconds;
        setTotalTimeRemaining(newTotalTimeRemainingTime);
    }, [timeRemaining]);

    // useEffect(() => {
    //     if (totalTimeRemaining === 0) {
    //         negative(path.resultPage);
    //     }
    // }, [totalTimeRemaining]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-menu')}>
                <div className={cx('wrapper-menu-icon')}>
                    <DrawerCst element={<UserInfo />} />
                </div>
                <div className={cx('wrapper-menu-name')}>Làm bài thi</div>
            </div>
            <Row>
                <Col span={24} xl={18} className={cx('wrapper-main')}>
                    <div className={cx('wrapper-main-info')}>
                        <h5 className={cx('wrapper-main-info-name')}>Kiểm tra an toàn bảo mật thông tin lần 2</h5>
                        <div
                            className={cx('wrapper-main-info-time')}
                        >{`Còn lại: ${timeRemaining.hours} giờ ${timeRemaining.minutes} phút ${timeRemaining.seconds} giây`}</div>
                        <div className={cx('wrapper-main-info-process')}>
                            <div
                                style={{ width: `${(totalTimeRemaining / totalSeconds) * 100}%` }}
                                className={cx('wrapper-main-info-process-percent')}
                            ></div>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-container')}>
                        <div className={cx('ask-container')}>
                            {listQuestion.map((question, index) => {
                                if (question.id === numQuestionNow) {
                                    return (
                                        <div key={question.id}>
                                            <h3 className={cx('ask-container-des')}>
                                                Câu {index + 1}. {question.question}
                                            </h3>
                                            <div className={cx('ask-container-answer')}>
                                                <ListAnswer
                                                    numberQuestion={question.id}
                                                    listAnswer={question.listAnswer}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div>
                            <div className={cx('btn-pageExercise')}>
                                <Button
                                    disabled={numQuestionNow === 0}
                                    onClick={handlePrevExercise}
                                    className={cx('btn-pageExercise-prev')}
                                >
                                    Câu trước
                                </Button>
                                <Button
                                    disabled={numQuestionNow === listQuestion.length - 1}
                                    onClick={handleNextExercise}
                                    className={cx('btn-pageExercise-next')}
                                >
                                    Câu sau
                                </Button>
                            </div>

                            <div className={cx('box-btn-open-ListExe')}>
                                <ModalCst
                                    ButtonOpen={<div className={cx('box-btn-open-ListExe-item')}>Chuyển đến</div>}
                                    Content={<ListExercise />}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={0} xl={6} className={cx('wrapper-exercise')}>
                    <ListExercise />
                </Col>
            </Row>
        </div>
    );
};

export default ExercisePage;
