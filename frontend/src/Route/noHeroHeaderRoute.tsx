import React from "react";


const Home = React.lazy(() => import("../View/Home"));

const noHeroHeaderRoutes = [
    { path: '/', element: <Home /> }
]

export default noHeroHeaderRoutes

