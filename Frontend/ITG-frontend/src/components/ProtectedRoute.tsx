import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    children: JSX.Element;
}

interface DecodedAccessToken {
    userId: string;
    roleName: string;
    type: "access";
    exp: number;
}

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedAccessToken>(token);
        const now = Date.now() / 1000;
        return decoded.exp < now || decoded.type !== "access";
    } catch (error) {
        return true;
    }
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const auth = useSelector((state: RootState) => state.auth);
    const token = auth.token;

    if (!auth.user || !token || isTokenExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
