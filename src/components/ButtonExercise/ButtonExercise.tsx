import { Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './ButtonExercise.module.scss';
const cx = classNames.bind(styles);

interface Props {
    isFinish?: boolean;
    isChoosing?: boolean;
    value: number;
}

const ButtonExercise = ({ isChoosing, isFinish, value }: Props) => {
    return (
        <Button
            className={cx('btnExe', {
                isChoosing: isChoosing,
                isFinish: isFinish,
            })}
        >
            {value}
        </Button>
    );
};

export default ButtonExercise;
