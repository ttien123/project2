import { getIsAuthenticatedFromLS } from 'src/utils/auth';
import { create } from 'zustand';

interface authInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: (body: boolean) => void;
}

const useGetIsAuthenticated = create<authInterface>()((set) => ({
    isAuthenticated: getIsAuthenticatedFromLS(),
    setIsAuthenticated: (body) => set((state) => ({ isAuthenticated: (state.isAuthenticated = body) })),
}));

export default useGetIsAuthenticated;
