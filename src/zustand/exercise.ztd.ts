import { Exercise } from 'src/mock/listExe';
import { getListExerciseFromLS, setListExerciseToLS } from 'src/utils/exercise';
import { create } from 'zustand';

export type ListAnswerType = {
    idGroup: number;
    idQuestion: number;
    answer: number;
};

type State = {
    numQuestionNow: number;
    activeExercise: Exercise;
    listAnswer: ListAnswerType[];
    listExercise: Exercise[];
};

type Actions = {
    setNumQuestionNow: (body: number) => void;
    setListAnswer: (body: ListAnswerType) => void;
    setActiveExercise: (body: Exercise) => void;
    setListExercise: (body: Exercise[]) => void;
    reset: () => void;
};

const initialState: State = {
    numQuestionNow: 0,
    listExercise: getListExerciseFromLS(),
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
    listAnswer: [],
};

const useGetInfoExercise = create<State & Actions>()((set) => ({
    ...initialState,
    setNumQuestionNow: (body) => set((state) => ({ numQuestionNow: (state.numQuestionNow = body) })),
    setActiveExercise: (body) => set((state) => ({ activeExercise: (state.activeExercise = body) })),
    setListExercise: (body) =>
        set((state) => {
            setListExerciseToLS(body);
            return { listExercise: (state.listExercise = body) };
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
