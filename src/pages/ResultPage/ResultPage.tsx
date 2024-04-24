import classNames from 'classnames/bind';
import styles from './ResultPage.module.scss';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
const cx = classNames.bind(styles);
const ResultPage = () => {
    const { activeExercise, listAnswer, reset } = useGetInfoExercise();
    const totalCorrectAnswer = activeExercise.listQuestion.reduce((total, item) => {
        let totalInner: number = 0;
        listAnswer.forEach((itemAnswer) => {
            if (
                itemAnswer.idQuestion === item.id &&
                itemAnswer.idGroup === item.idGroup &&
                itemAnswer.answer === item.answer
            ) {
                return (totalInner += 1);
            }
        });
        return (total += totalInner);
    }, 0);

    const totalNoChoose = activeExercise.listQuestion.length - listAnswer.length;

    const totalIncorrectAnswer = activeExercise.listQuestion.reduce((total, item) => {
        let totalInner: number = 0;
        listAnswer.forEach((itemAnswer) => {
            if (
                itemAnswer.idQuestion === item.id &&
                itemAnswer.idGroup === item.idGroup &&
                itemAnswer.answer != item.answer
            ) {
                return (totalInner += 1);
            }
        });
        return (total += totalInner);
    }, 0);

    const handleExit = () => {
        reset();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <h4 className={cx('wrapper-container-name')}>{activeExercise.name}</h4>
                <div className={cx('wrapper-container-result')}>
                    <div className={cx('wrapper-container-result-answer')}>
                        <div className={cx('result-answer-item')}>
                            <div className={cx('result-answer-item-des')}>Số câu trả lời đúng:</div>
                            <div className={cx('result-answer-item-value')}>{totalCorrectAnswer}</div>
                        </div>
                        <div className={cx('result-answer-item')}>
                            <div className={cx('result-answer-item-des')}>Số câu chưa trả lời đúng:</div>
                            <div className={cx('result-answer-item-value')}>{totalIncorrectAnswer + totalNoChoose}</div>
                        </div>
                        <div className={cx('result-answer-item')}>
                            <div className={cx('result-answer-item-des')}>Số câu chưa trả lời:</div>
                            <div className={cx('result-answer-item-value')}>{totalNoChoose}</div>
                        </div>
                        <div className={cx('result-answer-item')}>
                            <div className={cx('result-answer-item-des')}>Tổng số câu hỏi:</div>
                            <div className={cx('result-answer-item-value')}>{activeExercise.listQuestion.length}</div>
                        </div>
                    </div>
                    <div className={cx('wrapper-container-result-goal')}>{`Điểm số: ${totalCorrectAnswer * 10}/${
                        activeExercise.listQuestion.length * 10
                    }`}</div>
                </div>
                <div className={cx('box-btn')}>
                    <Link
                        to={path.userPage}
                        onClick={handleExit}
                        style={{ margin: 'auto' }}
                        className={cx('btn-submit')}
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
