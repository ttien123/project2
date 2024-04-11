import { Pagination, PaginationProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cx = classNames.bind(styles);
const PaginationCst = () => {
    const onChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
    };
    return (
        <Pagination
            showSizeChanger
            onChange={onChange}
            defaultCurrent={1}
            total={100}
            pageSizeOptions={[0]}
            showLessItems
            pageSize={10}
        />
    );
};

export default PaginationCst;
