import React from "react";


const Find = React.lazy(() => import("../View/Find"));
const About = React.lazy(() => import("../View/About"));
const CommunityEngagement = React.lazy(() => import("../View/CommunityEngagement"));
const Application = React.lazy(() => import("../View/Application"));
const Login = React.lazy(() => import("../View/Login"));
const Vendor = React.lazy(() => import("../View/Vendor"));
const VendorCreate = React.lazy(() => import("../View/Vendor/VendorCreate"));
const SecretResetPassword = React.lazy(() => import( "../View/Secret/SecretResetPassword"))

const outerRoutes = [
    { path: '/find', element: <Find /> },
    { path: '/login', element: <Login /> },
    { path: '/about', element: <About /> },
    { path: '/37b60eda89b5204fc5beda94005abe90d8cc6d25', element: <SecretResetPassword /> },
    { path: '/ca', element: <CommunityEngagement /> },
    { path: '/data/application/:id', element: <Application /> },
    { path: '/vendor/:id', element: <Vendor /> },
    { path: '/vendor/create', element: <VendorCreate /> },
    
]

export default outerRoutes

