import React from "react";


const Find = React.lazy(() => import("../View/Find"));
const Home = React.lazy(() => import("../View/Home"));
const About = React.lazy(() => import("../View/About"));
const CommunityEngagement = React.lazy(() => import("../View/CommunityEngagement"));
const Application = React.lazy(() => import("../View/Application"));
const Login = React.lazy(() => import("../View/Login"));
const Vendor = React.lazy(() => import("../View/Vendor"));
const VendorCreate = React.lazy(() => import("../View/Vendor/VendorCreate"));


const outerRoutes = [
    { path: '/', element: <Home /> },
    { path: '/find', element: <Find /> },
    { path: '/login', element: <Login /> },
    { path: '/about', element: <About /> },
    { path: '/ca', element: <CommunityEngagement /> },
    { path: '/data/application/:id', element: <Application /> },
    { path: '/vendor/:id', element: <Vendor /> },
    { path: '/vendor/create', element: <VendorCreate /> },
    
]

export default outerRoutes

