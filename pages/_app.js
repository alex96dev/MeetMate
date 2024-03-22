import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { StyleSheetManager } from "styled-components";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <StyleSheetManager
          shouldForwardProp={(prop) =>
            prop !== "category" && prop !== "isJoined"
          }
        >
          <Component
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            {...pageProps}
          />
        </StyleSheetManager>
      </SWRConfig>
    </>
  );
}
