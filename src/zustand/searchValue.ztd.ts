import { create } from 'zustand';

interface ValueSearchInterface {
    valueSearch: string;
    valueDiff: number;
    setValueSearch: (body: string) => void;
    setValueDiff: (body: number) => void;
}

const useGetValueSearch = create<ValueSearchInterface>()((set) => ({
    valueSearch: '',
    valueDiff: 0,
    setValueSearch: (body) => set((state) => ({ valueSearch: (state.valueSearch = body) })),
    setValueDiff: (body) => set((state) => ({ valueDiff: (state.valueDiff = body) })),
}));

export default useGetValueSearch;
