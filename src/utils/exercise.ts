import { Exercise, listExe } from 'src/mock/listExe';
import { groupQuestionType, listGroupQuestion } from 'src/mock/listGroupQuestion';

export const setListExerciseToLS = (listExercise: Exercise[]) => {
    localStorage.setItem('listExercise', JSON.stringify(listExercise));
};

export const getListExerciseFromLS = () => {
    const result = localStorage.getItem('listExercise');
    return result ? JSON.parse(result) : listExe;
};

export const setListGroupQuestionToLS = (listGroupQuestion: groupQuestionType[]) => {
    localStorage.setItem('listGroupQuestion', JSON.stringify(listGroupQuestion));
};

export const getListGroupQuestion = () => {
    const result = localStorage.getItem('listGroupQuestion');
    return result ? JSON.parse(result) : listGroupQuestion;
};
