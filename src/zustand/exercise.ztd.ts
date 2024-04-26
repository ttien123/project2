import { Exercise } from 'src/mock/listExe';
import { groupQuestionType } from 'src/mock/listGroupQuestion';
import {
    getListExerciseFromLS,
    getListGroupQuestion,
    setListExerciseToLS,
    setListGroupQuestionToLS,
} from 'src/utils/exercise';
import { create } from 'zustand';

export type ListAnswerType = {
    idGroup: string;
    idQuestion: string;
    indexInGr: number;
    answer: number;
};

type State = {
    numQuestionNow: number;
    activeExercise: Exercise;
    activeListGroupQuestion: groupQuestionType | undefined;
    activeExerciseAdmin: Exercise | undefined;
    listAnswer: ListAnswerType[];
    listExercise: Exercise[];
    listGrQuestion: groupQuestionType[];
};

type Actions = {
    setNumQuestionNow: (body: number) => void;
    setListAnswer: (body: ListAnswerType) => void;
    setActiveExercise: (body: Exercise) => void;
    setActiveExerciseAdmin: (body: Exercise | undefined) => void;
    setActiveListGroupQuestion: (body: groupQuestionType | undefined) => void;
    setListExercise: (body: Exercise[]) => void;
    setListGrQuestion: (body: groupQuestionType[]) => void;
    reset: () => void;
};

const initialState: State = {
    numQuestionNow: 0,
    listExercise: getListExerciseFromLS(),
    listGrQuestion: getListGroupQuestion(),
    activeExercise: {
        id: '0',
        difficult: 0,
        goal: '',
        listQuestion: [],
        name: '',
        time: 0,
        start: 0,
        reverseQuestion: false,
    },
    activeExerciseAdmin: undefined,
    activeListGroupQuestion: undefined,
    listAnswer: [],
};

const useGetInfoExercise = create<State & Actions>()((set) => ({
    ...initialState,
    setNumQuestionNow: (body) => set((state) => ({ numQuestionNow: (state.numQuestionNow = body) })),
    setActiveExercise: (body) => set((state) => ({ activeExercise: (state.activeExercise = body) })),
    setActiveExerciseAdmin: (body) => set((state) => ({ activeExerciseAdmin: (state.activeExerciseAdmin = body) })),
    setActiveListGroupQuestion: (body) =>
        set((state) => ({ activeListGroupQuestion: (state.activeListGroupQuestion = body) })),
    setListExercise: (body) =>
        set((state) => {
            setListExerciseToLS(body);
            return { listExercise: (state.listExercise = body) };
        }),
    setListGrQuestion: (body) =>
        set((state) => {
            setListGroupQuestionToLS(body);
            return { listGrQuestion: (state.listGrQuestion = body) };
        }),
    setListAnswer: (body) =>
        set((state) => {
            const { idQuestion, answer, idGroup } = body;
            const existingAnswer = state.listAnswer.find(
                (item) => item.idQuestion === idQuestion && item.idGroup === idGroup,
            );

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
