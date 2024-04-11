import classNames from 'classnames/bind';
import styles from './ListExercise.module.scss';
import { Button } from 'antd';
import ButtonExercise from '../ButtonExercise';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
const cx = classNames.bind(styles);

const ListExercise = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-list')}>
                {Array(16)
                    .fill(0)
                    .map((_, index) => (
                        <ButtonExercise
                            key={index}
                            value={index + 1}
                            isChoosing={index + 1 === 3}
                            isFinish={index + 1 == 1 || index + 1 == 2 || index + 1 == 4 || index + 1 == 7}
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
