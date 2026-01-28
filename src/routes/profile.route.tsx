import { Routes, Route } from "react-router"
import ProtectedRoute from "@components/shared/auth/ProtectedRoute"

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <p>Profile</p>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile/:id/edit"
                element={
                    <ProtectedRoute>
                        <p>Edit Profile</p>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default ProfileRoutes;