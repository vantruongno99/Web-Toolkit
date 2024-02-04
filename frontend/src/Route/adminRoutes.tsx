import React from "react";

const AdminData = React.lazy(() => import("../View/Admin/AdminData"));
const AdminTechnology = React.lazy(() => import("../View/Admin/AdminTechnology"));
const AdminApplication = React.lazy(() => import("../View/Admin/AdminApplication"));
const AdminApproval = React.lazy(() => import("../View/Admin/AdminApproval"));
const AdminInput = React.lazy(() => import("../View/Admin/AdminInput"));
const AdminVendors = React.lazy(() => import("../View/Admin/AdminVendors"));
const AdminVendor = React.lazy(() => import("../View/Admin/AdminVendor"));
const Admin = React.lazy(() => import("../View/Admin/Admin"));



const adminRouter = [
    { path: '/admin', element: <Admin /> },
    { path: '/admin/approve', element: <AdminApproval /> },
    { path: '/admin/data', element: <AdminData /> },
    { path: '/admin/input', element: <AdminInput /> },
    { path: '/admin/vendors', element: <AdminVendors /> },
    { path: '/admin/vendor/:id', element: <AdminVendor /> },
    { path: '/admin/technology/:id', element: <AdminTechnology /> },
    { path: '/admin/application/:id', element: <AdminApplication /> },

]

export default adminRouter

