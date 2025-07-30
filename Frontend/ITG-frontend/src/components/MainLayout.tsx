import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import CustomSidebar from "./ui/CustomSidebar/CustomSidebar";
import CustomLoader from "./ui/CustomLoader";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { toggleSidebar } from "@/store/sidebarSlice";
import { useIsTablet } from "@/hooks/use-tablet";

const MainLayout = () => {
    const isTablet = useIsTablet();
    const dispatch = useDispatch<AppDispatch>();
    const showSidebar = useSelector((state: RootState) => state.sidebar.showSidebar);

    useEffect(() => {
        if (!isTablet) {
            dispatch(toggleSidebar());
        }
    }, [isTablet, dispatch]);

    return (
        <div className="flex h-screen">
            {(!isTablet || showSidebar) && <div><CustomSidebar /></div>}
            <div className="w-full flex flex-col h-screen">
                <main className="py-3 px-4 overflow-x-hidden bg-[#f1f2f4] text-[#2b283d] overflow-y-scroll min-h-screen">
                    <Header />
                    <Suspense fallback={<CustomLoader />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
