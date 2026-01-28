import { Route, Routes, BrowserRouter } from "react-router";
import AuthRoutes from "./auth.route";
import ProfileRoutes from "./profile.route";
import TodoRoutes from "./todo.route";
import { lazy } from "react";
import RootLayout from "@app/layouts/layout";
import ProtectedRoute from "@components/shared/auth/ProtectedRoute";

const DashboardPage = lazy(() => import("../app/pages/dashboard/page"));
const LandingPage = lazy(() => import("../app/pages/landing/page"));


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route element={<RootLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/about" element={<p>About</p>} />
                    <Route path="/contact" element={<p>Login</p>} />
                </Route>
            </Routes>



            {/* auth routes */}
            <AuthRoutes />

            {/* todo routes */}
            <TodoRoutes />

            {/* protected routes */}
            <ProfileRoutes />
        </BrowserRouter >
    )
}

export default Router;