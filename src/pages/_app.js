import "@/styles/globals.css";

import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
