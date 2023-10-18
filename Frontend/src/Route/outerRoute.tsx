import React from "react";


const Find = React.lazy(() => import("../View/Find"));
const Home = React.lazy(() => import("../View/Home"));
const About = React.lazy(() => import("../View/About"));
const CommunityEngagement = React.lazy(() => import("../View/CommunityEngagement"));
const Admin = React.lazy(() => import("../View/Admin"));




const outerRoutes = [
    { path: '/', element: <Home /> },
    { path: '/find', element: <Find /> },
    { path: '/about', element: <About /> },
    { path: '/ca', element: <CommunityEngagement /> },
    { path: '/admin', element: <Admin /> },



]

export default outerRoutes

