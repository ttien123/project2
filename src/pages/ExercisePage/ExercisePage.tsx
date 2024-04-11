import { Button, Col, Row } from 'antd';
import DrawerCst from 'src/components/Drawer';
import ListExercise from 'src/components/ListExercise/ListExercise';
import UserInfo from 'src/components/UserInfo';
import ModalCst from 'src/components/Modal';

import classNames from 'classnames/bind';
import styles from './ExercisePage.module.scss';
const cx = classNames.bind(styles);
const ExercisePage = () => {
    const listAnswer = [
        {
            id: 0,
            value: 'A. 12 ngày nếu làm đủ cả năm',
        },
        {
            id: 1,
            value: 'B. 16 ngày nếu làm đủ cả năm',
        },
        {
            id: 2,
            value: 'C. Không có nghỉ phép vẫn hưởng lương',
        },
        {
            id: 3,
            value: 'D. 8 ngày nếu làm đủ cả năm',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-menu')}>
                <div className={cx('wrapper-menu-icon')}>
                    <DrawerCst element={<UserInfo />} />
                </div>
                <div className={cx('wrapper-menu-name')}>Làm bài thi</div>
            </div>
            <Row>
                <Col span={24} xl={18} className={cx('wrapper-main')}>
                    <div className={cx('wrapper-main-info')}>
                        <h5 className={cx('wrapper-main-info-name')}>Kiểm tra an toàn bảo mật thông tin lần 2</h5>
                        <div className={cx('wrapper-main-info-time')}>Còn lại: 14 phút 22 giây</div>
                        <div className={cx('wrapper-main-info-process')}>
                            <div className={cx('wrapper-main-info-process-percent')}></div>
                        </div>
                    </div>
                    <div className={cx('wrapper-main-container')}>
                        <div className={cx('ask-container')}>
                            <h3 className={cx('ask-container-des')}>
                                Câu 3. Nhân viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu
                                ngày một năm?
                            </h3>
                            <div className={cx('ask-container-answer')}>
                                {listAnswer.map((item) => (
                                    <div key={item.id} className={cx('ask-container-answer-item')}>
                                        <input type="checkbox" className={cx('ask-container-answer-item-checkbox')} />
                                        <div className={cx('ask-container-answer-item-value')}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className={cx('btn-pageExercise')}>
                                <Button className={cx('btn-pageExercise-prev')}>Câu trước</Button>
                                <Button className={cx('btn-pageExercise-next')}>Câu sau</Button>
                            </div>

                            <div className={cx('box-btn-open-ListExe')}>
                                <ModalCst
                                    ButtonOpen={<div className={cx('box-btn-open-ListExe-item')}>Chuyển đến</div>}
                                    Content={<ListExercise />}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={0} xl={6} className={cx('wrapper-exercise')}>
                    <ListExercise />
                </Col>
            </Row>
        </div>
    );
};

export default ExercisePage;
