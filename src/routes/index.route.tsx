import { Route, Routes, BrowserRouter } from "react-router";
import AuthRoutes from "./auth.route";
import ProfileRoutes from "./profile.route";
import { lazy } from "react";
import RootLayout from "@app/layouts/layout";

const DashboardPage = lazy(() => import("../app/pages/dashboard/page"));


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route element={<RootLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/about" element={<p>About</p>} />
                    <Route path="/contact" element={<p>Login</p>} />
                </Route>
            </Routes>



            {/* auth routes */}
            <AuthRoutes />

            {/* protected routes */}
            <ProfileRoutes />
        </BrowserRouter >
    )
}

export default Router;