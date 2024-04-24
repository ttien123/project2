import { Exercise, listExe } from 'src/mock/listExe';

export const setListExerciseToLS = (listExercise: Exercise[]) => {
    localStorage.setItem('listExercise', JSON.stringify(listExercise));
};

export const getListExerciseFromLS = () => {
    const result = localStorage.getItem('listExercise');
    return result ? JSON.parse(result) : listExe;
};
