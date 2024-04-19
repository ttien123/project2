import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from 'src/components/Input';
import { UserAccountType } from 'src/mock/listAccountUser';
import { AuthSchema, authSchema } from 'src/utils/rules';
import useGetListAccount from 'src/zustand/accounts.ztd';
import { v4 as uuidv4 } from 'uuid';
type FormDataLogin = Pick<AuthSchema, 'username' | 'password' | 'address' | 'name'>;
const registerSchema = authSchema.pick(['username', 'password', 'address', 'name']);

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateAccount = ({ setOpen }: Props) => {
    const { listAccount, setListAccount } = useGetListAccount();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = handleSubmit((data) => {
        const newAccount: UserAccountType = {
            name: data.name,
            username: data.username,
            address: data.address,
            id: uuidv4(),
            password: data.password,
        };
        const newListAccount = [...listAccount];
        newListAccount.push(newAccount);
        setListAccount(newListAccount);
        setOpen(false);
    });
    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 4 }}>
                    <div>name:</div>
                    <Input
                        name="name"
                        isSmall
                        register={register}
                        placeholder="Name"
                        errorsMessage={errors.name?.message}
                    />
                </div>
                <div>
                    <div style={{ marginBottom: 4 }}>username:</div>
                    <Input
                        name="username"
                        isSmall
                        register={register}
                        placeholder="Username"
                        errorsMessage={errors.username?.message}
                    />
                </div>
                <div>
                    <div style={{ marginBottom: 4 }}>password:</div>
                    <Input
                        name="password"
                        type="password"
                        isSmall
                        register={register}
                        placeholder="Password"
                        errorsMessage={errors.password?.message}
                    />
                </div>
                <div>
                    <div style={{ marginBottom: 4 }}>address:</div>
                    <Input
                        name="address"
                        isSmall
                        register={register}
                        placeholder="Address"
                        errorsMessage={errors.address?.message}
                    />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button htmlType="submit" type="primary" size="large" style={{ width: '100%', marginTop: 16 }}>
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;
