import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import React, { Suspense } from 'react'
import { Loader, Input } from '@mantine/core';
import { Layout } from "./Layout";
import { outerRoutes, adminRouter, vendorRoutes } from "./Route";
import { MantineProvider, createTheme } from '@mantine/core';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Cookies from "js-cookie";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';


import classes from './App.module.css';





const App = () => {



    const loader = async () => {
        const type = Cookies.get("role")
        if (!type || type != "admin") {
            return redirect("/login");
        }
        return null;
    };

    const vendorLoader = async () => {
        const type = Cookies.get("ABN")
        if (!type) {
            return redirect("/login");
        }
        return null;
    }



    const routes = [{
        path: "/", element: <Layout />,
        children: [
            ...outerRoutes
        ],

    },
    {
        path: "/", element: <Layout />,
        loader: loader,
        children: [
            ...adminRouter
        ]
    },
    {
        path: "/", element: <Layout />,
        loader: vendorLoader,
        children: [
            ...vendorRoutes
        ]
    },


    ]
    const router = createBrowserRouter(routes)



    const theme = createTheme({
        fontFamily: 'Verdana, sans-serif',
        primaryColor: "indigo",
        components: {
            InputWrapper: Input.Wrapper.extend({
                classNames: {
                    label: classes.label,
                },
            }),
        },
    });

    const queryClient = new QueryClient()



    return (
        <>
            <MantineProvider theme={theme}>
                <Notifications />
                <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
                    <QueryClientProvider client={queryClient}>
                        <Suspense fallback={<Loader />}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </QueryClientProvider>
                </ModalsProvider>
            </MantineProvider>

        </>
    )
}



export default App