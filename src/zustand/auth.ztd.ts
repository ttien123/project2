import { getIsAuthenticatedFromLS } from 'src/utils/auth';
import { create } from 'zustand';

interface authInterface {
    isAuthenticated: string;
    setIsAuthenticated: (body: string) => void;
}

const useGetIsAuthenticated = create<authInterface>()((set) => ({
    isAuthenticated: getIsAuthenticatedFromLS(),
    setIsAuthenticated: (body) => set((state) => ({ isAuthenticated: (state.isAuthenticated = body) })),
}));

export default useGetIsAuthenticated;
