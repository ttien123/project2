import { create } from 'zustand';

interface ValueSearchInterface {
    valueSearch: string;
    valueDiff: number;
    setValueSearch: (body: string) => void;
    setValueDiff: (body: number) => void;
}

type State = {
    valueSearch: string;
    valueDiff: number;
};

type Actions = {
    setValueSearch: (body: string) => void;
    setValueDiff: (body: number) => void;
    reset: () => void;
};

const initialState: State = {
    valueSearch: '',
    valueDiff: 0,
};

const useGetValueSearch = create<State & Actions>()((set) => ({
    ...initialState,
    setValueSearch: (body) => set((state) => ({ valueSearch: (state.valueSearch = body) })),
    setValueDiff: (body) => set((state) => ({ valueDiff: (state.valueDiff = body) })),
    reset: () => {
        set(initialState);
    },
}));

export default useGetValueSearch;
