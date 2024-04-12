import classNames from 'classnames/bind';
import styles from './ListExercise.module.scss';
import ButtonExercise from '../ButtonExercise';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import { listQuestion } from 'src/mock/listQuestion';
const cx = classNames.bind(styles);

const ListExercise = () => {
    const { numQuestionNow, setNumQuestionNow, listAnswer, reset } = useGetInfoExercise();
    const handleClick = (value: number) => {
        setNumQuestionNow(value);
    };
    const handleSubmit = () => {
        console.log(listAnswer);
        reset();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-list')}>
                {listQuestion.map((item) => (
                    <ButtonExercise
                        onClick={() => handleClick(item.id)}
                        key={item.id}
                        value={item.id + 1}
                        isChoosing={numQuestionNow === item.id}
                        isFinish={Boolean(listAnswer.find((answer) => answer.idQuestion === item.id))}
                    />
                ))}
            </div>
            <Link to={path.resultPage} onClick={handleSubmit} className={cx('btn-submit')}>
                Nộp Bài
            </Link>
        </div>
    );
};

export default ListExercise;
