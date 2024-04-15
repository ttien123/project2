import { ListQuestionType, listQuestion } from './listQuestion';

export const listExe = [
    {
        id: 0,
        name: 'Kiểm tra bảo mật hệ thống 1...',
        time: 7,
        goal: '200/250',
        difficult: 1,
        listQuestion: listQuestion,
    },
    {
        id: 1,
        name: 'Kiểm tra bảo mật hệ thống 2...',
        time: 7,
        goal: '200/250',
        difficult: 2,
        listQuestion: listQuestion,
    },
    {
        id: 2,
        name: 'Kiểm tra toán 1...',
        time: 7,
        goal: '200/250',
        difficult: 3,
        listQuestion: listQuestion,
    },
    {
        id: 3,
        name: 'Kiểm tra toán 2...',
        time: 7,
        goal: '200/250',
        difficult: 4,
        listQuestion: listQuestion,
    },
    {
        id: 4,
        name: 'Kiểm tra văn...',
        time: 7,
        goal: '200/250',
        difficult: 5,
        listQuestion: listQuestion,
    },
    {
        id: 5,
        name: 'Kiểm tra tiếng anh1...',
        time: 7,
        goal: '200/250',
        difficult: 1,
        listQuestion: listQuestion,
    },
    {
        id: 6,
        name: 'Kiểm tra tiếng anh2...',
        time: 7,
        goal: '200/250',
        difficult: 3,
        listQuestion: listQuestion,
    },
    {
        id: 7,
        name: 'Kiểm tra tiếng vật lý...',
        time: 7,
        goal: '200/250',
        difficult: 4,
        listQuestion: listQuestion,
    },
    {
        id: 8,
        name: 'Kiểm tra sinh...',
        time: 7,
        goal: '200/250',
        difficult: 2,
        listQuestion: listQuestion,
    },
    {
        id: 9,
        name: 'Kiểm tra âm nhạc...',
        time: 7,
        goal: '200/250',
        difficult: 5,
        listQuestion: listQuestion,
    },
    {
        id: 10,
        name: 'Kiểm tra mỹ thuật...',
        time: 7,
        goal: '200/250',
        difficult: 5,
        listQuestion: listQuestion,
    },
    {
        id: 11,
        name: 'Kiểm tra 1 tiết...',
        time: 7,
        goal: '200/250',
        difficult: 5,
        listQuestion: listQuestion,
    },
    {
        id: 12,
        name: 'Kiểm tra 2 tiết...',
        time: 7,
        goal: '200/250',
        difficult: 1,
        listQuestion: listQuestion,
    },
    {
        id: 13,
        name: 'Kiểm tra hóa...',
        time: 7,
        goal: '200/250',
        difficult: 5,
        listQuestion: listQuestion,
    },
];

export type Exercise = {
    id: number;
    name: string;
    time: number;
    goal: string;
    difficult: number;
    listQuestion: ListQuestionType;
};
