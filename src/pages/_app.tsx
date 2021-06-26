import React from 'react';
import Head from "next/head";
import '../styles/globals.css'
import type { AppProps, AppContext } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { AppContextProvider } from "../stores/appContext"
import App from 'next/app';


function isBrowser() {
    return typeof window !== 'undefined';
}

function MyApp({ Component, pageProps }: AppProps) {

    const queryClient = new QueryClient();

    return (
        <React.Fragment>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Learn</title>
            </Head>
            <AppContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    {/* <ReactQueryDevtools /> */}
                </QueryClientProvider>
            </AppContextProvider>
        </React.Fragment>
    )
}

MyApp.getInitialProps = async (ctx: AppContext) => {
    const { pathname, req, res } = ctx.ctx

    // if (!isBrowser() && res) {
    //     if (req.headers.cookie) {
    //         if (req.headers.cookie.includes("token")) {
    //             if (pathname === "/sign-in") {
    //                 res.writeHead(302, { Location: "/search" });
    //                 res.end();
    //             }
    //         } else {
    //             if (pathname !== "/sign-in") {
    //                 res.writeHead(302, { Location: "/sign-in" });
    //                 res.end();
    //             }
    //         }
    //     } else {
    //         if (pathname !== "/sign-in") {
    //             res.writeHead(302, { Location: "/sign-in" });
    //             res.end();
    //         }
    //     }
    // }

    const appProps = await App.getInitialProps(ctx)

    return { ...appProps }
}

export default MyApp
