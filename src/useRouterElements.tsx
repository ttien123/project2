import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import ExercisePage from './pages/ExercisePage';
import ResultPage from './pages/ResultPage';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import useGetIsAuthentication from './zustand/auth.ztd';
import TestQuizPage from './pages/AdminPage/pages/TestQuizPage';
import TestManagerPage from './pages/AdminPage/pages/TestManagerPage';
import CreateTest from './pages/AdminPage/pages/CreateTest';
import NotFound from './pages/NotFound';

function ProtectedRoute() {
    const { isAuthenticated } = useGetIsAuthentication();
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
}
function RejectedRoute() {
    const { isAuthenticated } = useGetIsAuthentication();

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
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.userPage,
                    element: <AdminLayout />,
                    children: [
                        {
                            path: path.admin,
                            element: <AdminPage />,
                        },
                        {
                            path: path.testQuiz,
                            element: <TestQuizPage />,
                        },
                        {
                            path: path.testManager,
                            element: <TestManagerPage />,
                        },
                        {
                            path: path.createTest,
                            element: <CreateTest />,
                        },
                    ],
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
        {
            path: '*',
            element: <NotFound />,
        },
    ]);

    return routeElements;
};

export default useRouterElements;
