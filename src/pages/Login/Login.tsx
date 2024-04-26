import ImgCamera from 'src/assets/ImgCamera';
import Input from 'src/components/Input';
import imgUserName from 'src/assets/images/imageUserName.jpg';
import imgPassword from 'src/assets/images/imgPassword.jpg';
import imgCameraMb from 'src/assets/images/imgCameraMb.png';
import { Button } from 'antd';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthSchema, authSchema } from 'src/utils/rules';
import useGetIsAuthenticated from 'src/zustand/auth.ztd';
import { setIsAuthenticatedToLS } from 'src/utils/auth';
const cx = classNames.bind(styles);

type FormDataLogin = Pick<AuthSchema, 'username' | 'password'>;
const loginSchema = authSchema.pick(['username', 'password']);

const Login = () => {
    const { setIsAuthenticated } = useGetIsAuthenticated();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = handleSubmit((data) => {
        data && setIsAuthenticated('user');
        data && setIsAuthenticatedToLS('user');
    });
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
                    <form onSubmit={onSubmit}>
                        <div>
                            <Input
                                name="username"
                                errorsMessage={errors.username?.message}
                                register={register}
                                srcImg={imgUserName}
                                placeholder="username"
                            />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Input
                                errorsMessage={errors.password?.message}
                                name="password"
                                type="password"
                                register={register}
                                srcImg={imgPassword}
                                placeholder="password"
                                isLargeIcon
                            />
                        </div>

                        <div className={cx('checkbox')}>
                            <input type="checkbox" className={cx('checkbox-item')} />
                            <div className={cx('checkbox-description')}>Remember me</div>
                        </div>

                        <Button htmlType="submit" className={cx('btn-login')}>
                            LOGIN
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
