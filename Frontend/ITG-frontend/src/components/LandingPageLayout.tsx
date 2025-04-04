import { Suspense } from "react";
import CustomLoader from "./ui/CustomLoader";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
    return (
        <div className="flex w-full h-screen">
            <Suspense fallback={<CustomLoader />}>
                <Outlet />
            </Suspense>
        </div>
    );
}

export default LandingPageLayout;