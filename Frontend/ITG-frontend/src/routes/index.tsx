import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"))
const Company = React.lazy(() => import("../pages/Company"))
const About = React.lazy(() => import("../pages/About"))
<<<<<<< HEAD
const JobDescription = React.lazy(() => import("../pages/Job"))
const SignUp = React.lazy(() => import("../pages/SignUp"))
=======
const Settings = React.lazy(() => import("../pages/Settings"))
>>>>>>> c4ff03493f04088bc7c0b5ca9939056851a8a3b0

const JobDescription = React.lazy(() => import("../pages/Job"))
const SignUp = React.lazy(() => import("../pages/SignUp"))
const routes:RouteObject[] =  [
    {path: pathConstants.Home, element: <Home/>},
    {path: "/home", element: <Home/>},
    {path: "/company", element: <Company/>},
    {path: "/settings", element: <Settings/>},
    {path:pathConstants.JobDescription, element: <JobDescription/>},
    {path: pathConstants.About,  element: <About/>}
]

<<<<<<< HEAD
export const landingPageRoutes:RouteObject[] = [
    {path: pathConstants.SignUp, element:<SignUp/>}
=======
export const landingRoutes:RouteObject[] = [
    {path: pathConstants.SignUp, element:<SignUp/>},
>>>>>>> c4ff03493f04088bc7c0b5ca9939056851a8a3b0
]

export default routes;