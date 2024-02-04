import React from "react";


const Vendor = React.lazy(() => import("../View/Vendor/Vendor"));
const VendorList = React.lazy(() => import("../View/Vendor/VendorList"));
const VendorById = React.lazy(() => import("../View/Vendor/Vendor"));



const vendorRoutes = [
    { path: '/vendor', element: <Vendor /> },
    { path: '/vendor/:id', element: <VendorById /> },
    { path: '/vendor/list', element: <VendorList /> },
    { path: '/vendor/:id', element: <VendorById /> },
]

export default vendorRoutes

