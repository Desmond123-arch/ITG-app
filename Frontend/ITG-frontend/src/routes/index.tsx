import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";
import Settings from "@/pages/Settings";

const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))

const routes:RouteObject[] =  [
    {path: pathConstants.Home, element: <Home/>},
    {path: "/home", element: <Home/>},
    {path: "/settings", element: <Settings/>},
    {path: pathConstants.About,  element: <About/>}
]

export default routes;