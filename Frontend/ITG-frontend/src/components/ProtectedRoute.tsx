import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const auth = useSelector((state: RootState) => state.auth);
    console.log(auth)

    // if (!auth.user) {
    //     return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;
