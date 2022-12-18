import type { AppProps } from "next/app";
import { StateContextProvider } from "../Context";
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  );
}
