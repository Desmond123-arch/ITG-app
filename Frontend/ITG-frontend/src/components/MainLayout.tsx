import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Suspense } from "react";
import CustomSidebar from "./ui/CustomSidebar/CustomSidebar";
import CustomLoader from "./ui/CustomLoader";
import Header from "./Header";

const MainLayout = () => {
    return (
        <>
            <div className="flex">
                <CustomSidebar/>
                <main className="py-3 px-4">
                    <Header/>
                    <Suspense fallback={<CustomLoader/>}>
                        <Outlet />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default MainLayout;