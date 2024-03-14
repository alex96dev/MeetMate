import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
// import { BrowserRouter } from "react-router-dom";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  // if (typeof document === "undefined") {
  //   return null;
  // }

  return (
    <>
      <GlobalStyle />
      {/* <BrowserRouter> */}
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
      {/* </BrowserRouter> */}
    </>
  );
}
