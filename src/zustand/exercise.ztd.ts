import { Exercise } from 'src/mock/listExe';
import { create } from 'zustand';

export type ListAnswerType = {
    idQuestion: number;
    answer: {
        id: number;
        value: string;
    };
};

type State = {
    numQuestionNow: number;
    activeExercise: Exercise;
    listAnswer: ListAnswerType[];
};

type Actions = {
    setNumQuestionNow: (body: number) => void;
    setListAnswer: (body: ListAnswerType) => void;
    setActiveExercise: (body: Exercise) => void;
    reset: () => void;
};

const initialState: State = {
    numQuestionNow: 0,
    activeExercise: { id: 0, difficult: 0, goal: '', listQuestion: [], name: '', time: 0, start: 0 },
    listAnswer: [],
};

const useGetInfoExercise = create<State & Actions>()((set) => ({
    ...initialState,
    setNumQuestionNow: (body) => set((state) => ({ numQuestionNow: (state.numQuestionNow = body) })),
    setActiveExercise: (body) => set((state) => ({ activeExercise: (state.activeExercise = body) })),
    setListAnswer: (body) =>
        set((state) => {
            const { idQuestion, answer } = body;
            const existingAnswer = state.listAnswer.find((item) => item.idQuestion === idQuestion);

            if (existingAnswer) {
                existingAnswer.answer = answer;
            } else {
                const newListAnswer = state.listAnswer;
                return { listAnswer: [...newListAnswer, body] };
            }

            return { listAnswer: state.listAnswer };
        }),
    reset: () => {
        set(initialState);
    },
}));

export default useGetInfoExercise;
