import classNames from 'classnames/bind';
import styles from './ListExercise.module.scss';
import ButtonExercise from '../ButtonExercise';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
const cx = classNames.bind(styles);

const ListExercise = () => {
    const { numQuestionNow, setNumQuestionNow, listAnswer, activeExercise } = useGetInfoExercise();

    const handleClick = (value: number) => {
        setNumQuestionNow(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-list')}>
                {activeExercise.listQuestion.map((item, index) => (
                    <ButtonExercise
                        onClick={() => handleClick(index)}
                        key={index}
                        value={index + 1}
                        isChoosing={numQuestionNow === index}
                        isFinish={Boolean(
                            listAnswer.find(
                                (answer) => answer.idQuestion === item.id && answer.idGroup === item.idGroup,
                            ),
                        )}
                    />
                ))}
            </div>
            <Link to={path.resultPage} className={cx('btn-submit')}>
                Nộp Bài
            </Link>
        </div>
    );
};

export default ListExercise;
