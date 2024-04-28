import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import ExercisePage from './pages/ExercisePage';
import ResultPage from './pages/ResultPage';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import useGetIsAuthenticated from './zustand/auth.ztd';
import TestQuizPage from './pages/AdminPage/pages/TestQuizPage';
import TestManagerPage from './pages/AdminPage/pages/TestManagerPage';
import CreateTest from './pages/AdminPage/pages/CreateTest';
import NotFound from './pages/NotFound';
import CreateTopic from './pages/AdminPage/pages/CreateTopic';
import QuestionManager from './pages/AdminPage/pages/QuestionManager';
import { Role } from './types/role';

function UserRoute() {
    const { isAuthenticated } = useGetIsAuthenticated();
    return isAuthenticated === Role.USER ? <Outlet /> : <Navigate to={path.login} />;
    // return <Outlet />;
}
function AdminRoute() {
    const { isAuthenticated } = useGetIsAuthenticated();
    return isAuthenticated === Role.ADMIN ? <Outlet /> : <Navigate to={path.login} />;
    // return <Outlet />;
}

function IsAuth() {
    const { isAuthenticated } = useGetIsAuthenticated();
    if (isAuthenticated && isAuthenticated === Role.USER) {
        return <Navigate to={path.userPage} />;
    }
    if (isAuthenticated && isAuthenticated === Role.ADMIN) {
        return <Navigate to={path.admin} />;
    }
    return <Outlet />;
}

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: '',
            element: <UserRoute />,
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
            element: <AdminRoute />,
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
                        {
                            path: path.createTopic,
                            element: <CreateTopic />,
                        },
                        {
                            path: path.questionManager,
                            element: <QuestionManager />,
                        },
                    ],
                },
            ],
        },
        {
            path: '',
            element: <IsAuth />,
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
