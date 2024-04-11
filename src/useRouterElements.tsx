import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import ExercisePage from './pages/ExercisePage';
import ResultPage from './pages/ResultPage';

function ProtectedRoute() {
    const isAuthenticated = true;
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
}
function RejectedRoute() {
    const isAuthenticated = true;

    return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />;
}

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.userPage,
                    element: <UserPage />,
                },
                {
                    path: path.exercisePage,
                    element: <ExercisePage />,
                },
                {
                    path: path.resultPage,
                    element: <ResultPage />,
                },
            ],
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: path.login,
                    element: <Login />,
                },
            ],
        },
    ]);

    return routeElements;
};

export default useRouterElements;
