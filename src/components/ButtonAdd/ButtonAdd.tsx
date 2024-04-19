import { Button } from 'antd';

import classNames from 'classnames/bind';
import styles from './ButtonAdd.module.scss';
const cx = classNames.bind(styles);

interface Props {
    srcIcon: string;
    content: string;
    isNormal?: boolean;
    handleClick?: () => void;
}
const ButtonAdd = ({ srcIcon, content, isNormal, handleClick }: Props) => {
    return (
        <Button
            className={cx('wrapper', {
                isNormal: isNormal,
            })}
            onClick={handleClick}
        >
            <img src={srcIcon} alt="img" className={cx('wrapper-icon')} />
            <span className={cx('wrapper-content')}>{content}</span>
        </Button>
    );
};

export default ButtonAdd;
