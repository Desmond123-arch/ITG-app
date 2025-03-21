import { Suspense } from "react";
import CustomLoader from "./ui/CustomLoader";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
    return (
<<<<<<< HEAD
        <div className="flex w-full h-screen">
=======
        <div className="flex h-screen w-full">
>>>>>>> c4ff03493f04088bc7c0b5ca9939056851a8a3b0
            <Suspense fallback={<CustomLoader />}>
                <Outlet />
            </Suspense>
        </div>
    );
}

export default LandingPageLayout;