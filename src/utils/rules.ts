import * as yup from 'yup';

export const authSchema = yup.object({
    username: yup.string().required('Username is a required field').min(4, 'Username must be at least 4 characters'),
    password: yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters'),
});

export type AuthSchema = yup.InferType<typeof authSchema>;
