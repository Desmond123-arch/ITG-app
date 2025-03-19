import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"))
const Company = React.lazy(() => import("../pages/Company"))
const About = React.lazy(() => import("../pages/About"))
const Settings = React.lazy(() => import("../pages/Settings"))

const routes:RouteObject[] =  [
    {path: pathConstants.Home, element: <Home/>},
    {path: "/home", element: <Home/>},
    {path: "/company", element: <Company/>},
    {path: "/settings", element: <Settings/>},
    {path: pathConstants.About,  element: <About/>}
]

export default routes;