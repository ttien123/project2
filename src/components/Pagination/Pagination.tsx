import { Pagination, PaginationProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cx = classNames.bind(styles);

interface Props {
    setNumberPage: React.Dispatch<React.SetStateAction<number>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    totalListExercise: number;
}

const PaginationCst = ({ setNumberPage, setPageSize, totalListExercise }: Props) => {
    const onChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setNumberPage(current - 1);
    };
    return (
        <Pagination
            showSizeChanger
            onChange={onChange}
            defaultCurrent={1}
            total={totalListExercise}
            pageSizeOptions={[6]}
            showLessItems
            pageSize={6}
        />
    );
};

export default PaginationCst;
