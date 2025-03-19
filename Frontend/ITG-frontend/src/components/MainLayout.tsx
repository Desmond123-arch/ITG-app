import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Suspense, useEffect } from "react";
import CustomSidebar from "./ui/CustomSidebar/CustomSidebar";
import CustomLoader from "./ui/CustomLoader";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { toggleSidebar } from "@/store/sidebarSlice";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
    const isMobile = useIsMobile();
    const dispatch = useDispatch<AppDispatch>();
    const showSidebar = useSelector((state: RootState) => state.sidebar.showSidebar);

    useEffect(() => {
        if (!isMobile) {
            dispatch(toggleSidebar());
        }
    }, [isMobile, dispatch]);

    return (
        <div className="flex h-screen">
            {(!isMobile || showSidebar) && <CustomSidebar />}
            <div className="w-full flex flex-col h-screen">
                <main className="py-3 px-4 overflow-x-hidden bg-[#f1f2f4] text-[#2b283d] overflow-y-scroll min-h-screen">
                    <Header />
                    <Suspense fallback={<CustomLoader />}>
                        <Outlet />
                    </Suspense>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
