import { Routes, Route } from 'react-router';
import { lazy } from 'react';
import RootLayout from '@app/layouts/layout';
import ProtectedRoute from '@components/shared/auth/ProtectedRoute';

const TodoPage = lazy(() => import('../app/pages/todo/page'));

const TodoRoutes = () => {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route
                    path="/todos"
                    element={
                        <ProtectedRoute>
                            <TodoPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default TodoRoutes;
