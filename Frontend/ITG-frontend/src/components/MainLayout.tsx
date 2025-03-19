import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Suspense } from "react";
import CustomSidebar from "./ui/CustomSidebar/CustomSidebar";
import CustomLoader from "./ui/CustomLoader";
import Header from "./Header";

const MainLayout = () => {
    return (
        <>
            <div className="flex h-screen">
                <CustomSidebar/>
                <div className="w-full flex flex-col h-screen">
                    <main className="py-3 px-4 bg-[#f1f2f4] overflow-y-scroll">
                        <Header/>
                        <Suspense fallback={<CustomLoader/>}>
                            <Outlet />
                        </Suspense>
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
}

export default MainLayout;