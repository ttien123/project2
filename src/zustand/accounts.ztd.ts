import { UserAccountType, listAccountUser } from 'src/mock/listAccountUser';
import { create } from 'zustand';

type State = {
    listAccount: UserAccountType[];
};

type Actions = {
    setListAccount: (body: UserAccountType[]) => void;
    reset: () => void;
};

const initialState: State = {
    listAccount: listAccountUser,
};

const useGetListAccount = create<State & Actions>()((set) => ({
    ...initialState,
    setListAccount: (body) => set((state) => ({ listAccount: (state.listAccount = body) })),
    reset: () => {
        set(initialState);
    },
}));

export default useGetListAccount;
