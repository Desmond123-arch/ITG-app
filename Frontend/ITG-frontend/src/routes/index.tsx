import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))

const routes:RouteObject[] =  [
    {path: pathConstants.Home, element: <Home/>},
    {path: "/home", element: <Home/>},
    {path: pathConstants.About,  element: <About/>}
]

export default routes;