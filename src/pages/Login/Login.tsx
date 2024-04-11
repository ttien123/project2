import ImgCamera from 'src/assets/ImgCamera';
import Input from 'src/components/Input';
import imgUserName from 'src/assets/images/imageUserName.jpg';
import imgPassword from 'src/assets/images/imgPassword.jpg';
import imgCameraMb from 'src/assets/images/imgCameraMb.png';
import { Button } from 'antd';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);
const Login = () => {
    return (
        <div className={cx('login')}>
            <div className={cx('login-container')}>
                <div className={cx('login-container-img-pc')}>
                    <ImgCamera />
                </div>
                <div className={cx('login-container-img-mb')}>
                    <img src={imgCameraMb} alt="img" className={cx('login-container-img-mb-item')} />
                </div>
                <div className={cx('login-container-content')}>
                    <form>
                        <div>
                            <Input srcImg={imgUserName} placeholder="username" />
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <Input srcImg={imgPassword} placeholder="password" isLargeIcon />
                        </div>

                        <div className={cx('checkbox')}>
                            <input type="checkbox" className={cx('checkbox-item')} />
                            <div className={cx('checkbox-description')}>Remember me</div>
                        </div>

                        <Button className={cx('btn-login')}>LOGIN</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
