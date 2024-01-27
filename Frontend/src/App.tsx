import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import React, { Suspense } from 'react'
import { Loader, Input } from '@mantine/core';
import { Layout } from "./Layout";
import { outerRoutes, innerRoutes } from "./Route";
import { MantineProvider, createTheme } from '@mantine/core';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Cookies from "js-cookie";


import classes from './App.module.css';





const App = () => {



    const loader = async () => {
        const type = Cookies.get("role")
        if (!type || type != "admin") {
            return redirect("/");
        }
        return null;
    };



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
            ...innerRoutes
        ]
    }

    ]
    const router = createBrowserRouter(routes)



    const theme = createTheme({
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
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={<Loader />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </QueryClientProvider>
            </MantineProvider>

        </>
    )
}



export default App