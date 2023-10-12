import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import React, { Suspense } from 'react'
import { Loader } from '@mantine/core';
import { Layout } from "./Layout";
import { outerRoutes, innerRoutes } from "./Route";
import { MantineProvider, createTheme } from '@mantine/core';



const App = () => {




    const routes = [{
        path: "/", element: <Layout />,
        children: [
            ...outerRoutes
        ]
    }
    ]
    const router = createBrowserRouter(routes)


    
const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'blue',
  });


    return (
        <>
            <MantineProvider  theme={theme}>
                <Suspense fallback={<Loader />}>
                    <RouterProvider router={router} />
                </Suspense>
            </MantineProvider>

        </>
    )
}



export default App