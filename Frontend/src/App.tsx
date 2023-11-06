import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import React, { Suspense } from 'react'
import { Loader } from '@mantine/core';
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




const App = () => {


    const loader = async () => {
       const type = Cookies.get("role")
       if(!type || type != "admin"){
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
        fontFamily: 'Open Sans, sans-serif',
        primaryColor: "gray"
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