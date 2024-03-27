import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { StyleSheetManager } from "styled-components";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <StyleSheetManager
          shouldForwardProp={(prop) =>
            prop !== "category" && prop !== "isJoined"
          }
        >
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </StyleSheetManager>
      </SWRConfig>
    </>
  );
}
