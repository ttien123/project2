import { Pagination, PaginationProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cx = classNames.bind(styles);

interface Props {
    setNumberPage: React.Dispatch<React.SetStateAction<number>>;
    totalListExercise: number;
    pageSize: number;
    numberPage: number;
}

const PaginationCst = ({ setNumberPage, totalListExercise, pageSize, numberPage }: Props) => {
    const onChange: PaginationProps['onShowSizeChange'] = (current) => {
        setNumberPage(current - 1);
    };
    return (
        <Pagination
            showSizeChanger
            onChange={onChange}
            defaultCurrent={1}
            total={totalListExercise}
            current={numberPage + 1}
            showLessItems
            pageSize={pageSize}
            hideOnSinglePage={totalListExercise === 0}
        />
    );
};

export default PaginationCst;
