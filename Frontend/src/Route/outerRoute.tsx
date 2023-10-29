import React from "react";


const Find = React.lazy(() => import("../View/Find"));
const Home = React.lazy(() => import("../View/Home"));
const About = React.lazy(() => import("../View/About"));
const CommunityEngagement = React.lazy(() => import("../View/CommunityEngagement"));
const Admin = React.lazy(() => import("../View/Admin/Admin"));
const AdminData = React.lazy(() => import("../View/Admin/AdminData"));
const AdminTechnology = React.lazy(() => import("../View/Admin/AdminTechnology"));
const AdminApplication = React.lazy(() => import("../View/Admin/AdminApplication"));
const Vendor = React.lazy(() => import("../View/Vendor/Vendors"));
const VendorCreate = React.lazy(() => import("../View/Vendor/VendorCreate"));
const VendorList = React.lazy(() => import("../View/Vendor/VendorList"));
const VendorById = React.lazy(() => import("../View/Vendor/Vendor"));
const Approval = React.lazy(() => import("../View/Admin/AdminApproval"));
const Application = React.lazy(() => import("../View/Application"));


const outerRoutes = [
    { path: '/', element: <Home /> },
    { path: '/find', element: <Find /> },
    { path: '/about', element: <About /> },
    { path: '/ca', element: <CommunityEngagement /> },
    { path: '/admin', element: <Admin /> },
    { path: '/data/application/:id', element: <Application /> },
    { path: '/vendor', element: <Vendor /> },
    { path: '/vendor/:id', element: <VendorById /> },
    { path: '/vendor/create', element: <VendorCreate /> },
    { path: '/vendor/list', element: <VendorList /> },
    { path: '/vendor/:id', element: <VendorById /> },
    { path: '/admin/approve', element: <Approval /> },
    { path: '/admin/data', element: <AdminData /> },
    { path: '/admin/technology/:id', element: <AdminTechnology /> },
    { path: '/admin/application/:id', element: <AdminApplication /> },
]

export default outerRoutes

