import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense } from "react";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;