import { LoginForm } from "@/components/ui/Forms/login";
import { Link } from "react-router-dom";

const Login = () => {
    return ( 
        <div className="w-full bg-white flex flex-col items-center justify-center">
            <LoginForm/>
            <p>Don't have an account? <Link to={"/sign-up"} className="text-blue-950 underline">Sign Up</Link></p>
        </div>
     );
}
 
export default Login;