import React from "react";


const Find = React.lazy(() => import("../View/Find"));
const Home = React.lazy(() => import("../View/Home"));



const outerRoutes = [
    { path: '/', element: <Home /> },
    { path: '/find', element: <Find /> },
]

export default outerRoutes

