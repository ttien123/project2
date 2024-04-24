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
    const { numQuestionNow, setNumQuestionNow, activeExercise } = useGetInfoExercise();
    const { timeRemaining, totalSeconds } = useGetTime(0, activeExercise.time, 0);
    const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalSeconds);
    const [randomArray, setRandomArray] = useState<number[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const handlePrevExercise = () => {
        setNumQuestionNow(numQuestionNow - 1);
    };

    const handleNextExercise = () => {
        setNumQuestionNow(numQuestionNow + 1);
    };

    useEffect(() => {
        const generateRandomArray = (n: number): number[] => {
            const array: number[] = [];
            for (let i = 0; i < n; i++) {
                array.push(i);
            }
            shuffleArray(array);
            return array;
        };

        const shuffleArray = (array: number[]): void => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        const newArray = generateRandomArray(activeExercise.listQuestion.length);
        setRandomArray(newArray);
    }, []);

    useEffect(() => {
        const { hours, minutes, seconds } = timeRemaining;
        const newTotalTimeRemainingTime = hours * 3600 + minutes * 60 + seconds;
        setTotalTimeRemaining(newTotalTimeRemainingTime);
    }, [timeRemaining]);

    useEffect(() => {
        if (totalTimeRemaining === 0) {
            negative(path.resultPage);
        }
    }, [totalTimeRemaining]);

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
                        <h5 className={cx('wrapper-main-info-name')}>{activeExercise.name}</h5>
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
                            {activeExercise.listQuestion.map((question, index) => {
                                if (activeExercise.reverseQuestion && randomArray[index] === numQuestionNow) {
                                    return (
                                        <div key={index}>
                                            <h3 className={cx('ask-container-des')}>
                                                Câu {numQuestionNow + 1}. {question.question}
                                            </h3>
                                            <div className={cx('ask-container-answer')}>
                                                <ListAnswer
                                                    numberQuestion={numQuestionNow}
                                                    listAnswer={question.listAnswer}
                                                    idGroup={question.idGroup}
                                                    idQuestion={question.id}
                                                />
                                            </div>
                                        </div>
                                    );
                                }

                                if (!activeExercise.reverseQuestion && index === numQuestionNow) {
                                    return (
                                        <div key={index}>
                                            <h3 className={cx('ask-container-des')}>
                                                Câu {numQuestionNow + 1}. {question.question}
                                            </h3>
                                            <div className={cx('ask-container-answer')}>
                                                <ListAnswer
                                                    numberQuestion={numQuestionNow}
                                                    listAnswer={question.listAnswer}
                                                    idGroup={question.idGroup}
                                                    idQuestion={question.id}
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
                                    disabled={numQuestionNow === activeExercise.listQuestion.length - 1}
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
                                    open={openModal}
                                    setOpen={setOpenModal}
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
