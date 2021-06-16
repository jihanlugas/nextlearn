import React from 'react';
import Head from "next/head";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"


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
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
        </React.Fragment>
    )
}

export default MyApp
