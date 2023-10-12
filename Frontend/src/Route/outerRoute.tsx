import React from "react";


const List = React.lazy(() => import("../View/List"));
const Home = React.lazy(() => import("../View/Home"));



const outerRoutes = [
    { path: '/', element: <Home /> },
    { path: '/list', element: <List /> },
]

export default outerRoutes

