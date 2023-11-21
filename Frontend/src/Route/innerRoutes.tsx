import React from "react";

const AdminData = React.lazy(() => import("../View/Admin/AdminData"));
const AdminTechnology = React.lazy(() => import("../View/Admin/AdminTechnology"));
const AdminApplication = React.lazy(() => import("../View/Admin/AdminApplication"));
const AdminApproval = React.lazy(() => import("../View/Admin/AdminApproval"));
const AdminInput = React.lazy(() => import("../View/Admin/AdminInput"));
const AdminVendor = React.lazy(() => import("../View/Admin/AdminVendor"));



const innerRoutes = [
    { path: '/admin/approve', element: <AdminApproval /> },
    { path: '/admin/data', element: <AdminData /> },
    { path: '/admin/input', element: <AdminInput /> },
    { path: '/admin/vendor', element: <AdminVendor /> },
    { path: '/admin/technology/:id', element: <AdminTechnology /> },
    { path: '/admin/application/:id', element: <AdminApplication /> },

]

export default innerRoutes

