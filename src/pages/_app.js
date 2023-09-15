import "../styles/globals.css";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <NextUIProvider>
        <SessionProvider session={session}>
          <SWRConfig value={{ fetcher }}>
            <Component {...pageProps} />
          </SWRConfig>
        </SessionProvider>
      </NextUIProvider>
    </>
  );
}
