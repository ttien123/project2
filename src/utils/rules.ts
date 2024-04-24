import * as yup from 'yup';

export const authSchema = yup.object({
    username: yup.string().required('Username is a required field').min(4, 'Username must be at least 4 characters'),
    password: yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters'),
    name: yup.string().required('Name is a required field').min(6, 'Name must be at least 6 characters'),
    address: yup.string().required('Address is a required field'),
});

export const exerciseSchema = yup.object({
    testName: yup.string().required('TestName is a required field').min(4, 'TestName must be at least 4 characters'),
    time: yup.string().required('Time is a required field').min(1, 'Time must be at least 1 minute'),
    difficult: yup.string().required('Difficult is a required field'),
});

export type AuthSchema = yup.InferType<typeof authSchema>;
export type ExerciseSchema = yup.InferType<typeof exerciseSchema>;
