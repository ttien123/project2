import classNames from 'classnames/bind';
import styles from './CreateTopic.module.scss';
import HeadingAdminPage from '../../components/HeadingAdminPage';
import { Link, useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
import { Button } from 'antd';
import Input from 'src/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TopicSchema, topicSchema } from 'src/utils/rules';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { groupQuestionType } from 'src/mock/listGroupQuestion';
import useGetInfoExercise from 'src/zustand/exercise.ztd';
import AdminNav from 'src/components/AdminNav';
import MenuTop from 'src/components/MenuTop';

const cx = classNames.bind(styles);

type FormTopicSchema = Pick<TopicSchema, 'name' | 'description'>;
const createTopicSchema = topicSchema.pick(['name', 'description']);

const CreateTopic = () => {
    const { listGrQuestion, setListGrQuestion, setActiveListGroupQuestion } = useGetInfoExercise();
    const navigate = useNavigate();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTopicSchema>({
        defaultValues: {
            name: '',
            description: '',
        },
        resolver: yupResolver(createTopicSchema),
    });

    const onSubmit = handleSubmit((data) => {
        const newObj: groupQuestionType = {
            id: uuidv4(),
            name: data.name,
            ListQuestion: [],
        };
        const newListGrQuestion = [newObj, ...listGrQuestion];
        setActiveListGroupQuestion(newObj);
        setListGrQuestion(newListGrQuestion);
        toast.success('Tạo bài test thành công');
        navigate(path.questionManager);
        reset();
    });

    return (
        <>
            <MenuTop element={<AdminNav />} title={'New Topic'} />
            <HeadingAdminPage
                title={'New toppic'}
                listLink={
                    <div>
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.admin}>
                            Home
                        </Link>
                        {' > '}
                        <Link style={{ color: '#666161', fontWeight: 400 }} to={path.testQuiz}>
                            {'List topic manager'}
                        </Link>
                        <span>{' > new test'}</span>
                    </div>
                }
            >
                <div style={{ flex: 1, marginTop: 40 }}>
                    <form className={cx('form')} onSubmit={onSubmit}>
                        <div className={cx('form-container')}>
                            <div className={cx('form-container-item')}>
                                <div className={cx('form-container-item-label')}>Topic name:</div>
                                <Input
                                    isSmall
                                    isFull
                                    name="name"
                                    register={register}
                                    errorsMessage={errors.name?.message}
                                />
                            </div>
                            <div className={cx('form-container-item')}>
                                <div className={cx('form-container-item-label')}>Description:</div>
                                <Input
                                    isSmall
                                    isFull
                                    name="description"
                                    register={register}
                                    errorsMessage={errors.description?.message}
                                />
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 16 }}>
                            <Button htmlType="submit" size="large" style={{ minWidth: 150 }}>
                                {'Add question ->'}
                            </Button>
                        </div>
                    </form>
                </div>
            </HeadingAdminPage>
        </>
    );
};

export default CreateTopic;
