import classNames from 'classnames/bind';
import styles from './ResultPage.module.scss';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
const cx = classNames.bind(styles);
const ResultPage = () => {
    const listResult = [
        {
            id: 0,
            description: 'Số câu trả lời đúng:',
            value: 12,
        },
        {
            id: 1,
            description: 'Số câu trả lời sai:',
            value: 3,
        },
        {
            id: 2,
            description: 'Số câu chưa trả lời đúng:',
            value: 1,
        },
        {
            id: 3,
            description: 'Tổng số câu hỏi:',
            value: 16,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <h4 className={cx('wrapper-container-name')}>Kiểm tra an toàn bảo mật thông tin lần 2</h4>
                <div className={cx('wrapper-container-result')}>
                    <div className={cx('wrapper-container-result-answer')}>
                        {listResult.map((item) => (
                            <div className={cx('result-answer-item')}>
                                <div className={cx('result-answer-item-des')}>{item.description}</div>
                                <div className={cx('result-answer-item-value')}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('wrapper-container-result-goal')}>Điểm số: 120/160</div>
                </div>
                <div className={cx('box-btn')}>
                    <Link to={path.userPage} style={{ margin: 'auto' }} className={cx('btn-submit')}>
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
