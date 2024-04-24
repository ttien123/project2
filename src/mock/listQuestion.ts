export const listQuestion = [
    {
        idGroup: 0,
        id: 0,
        question:
            'toán nhân viên  chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?',
        listAnswer: [
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
        ],
        answer: 0,
    },
    {
        idGroup: 0,
        id: 1,
        question:
            'toán Nhân1 viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?',
        listAnswer: [
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
        ],
        answer: 0,
    },
    {
        idGroup: 0,
        id: 2,
        question:
            'toán Nhân2 viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?',
        listAnswer: [
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
        ],
        answer: 0,
    },
    {
        idGroup: 1,
        id: 0,
        question: 'Văn Nhân0 viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?',
        listAnswer: [
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
        ],
        answer: 0,
    },
    {
        idGroup: 3,
        id: 0,
        question:
            'Công nghệ phần mềm Nhân0 viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?',
        listAnswer: [
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
        ],
        answer: 0,
    },
];

export type ListTypeObjQuestion = {
    idGroup: number;
    id: number;
    question: string;
    listAnswer: {
        id: number;
        value: string;
    }[];
    answer: number;
};

export type ListQuestionType = {
    idGroup: number;
    id: number;
    question: string;
    listAnswer: {
        id: number;
        value: string;
    }[];
    answer: number;
}[];
