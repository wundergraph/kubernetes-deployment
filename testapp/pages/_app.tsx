import "../styles/globals.css";
import { WunderGraphProvider } from "../components/generated/provider";

function MyApp({ Component, pageProps }) {
  return (
    <WunderGraphProvider>
      <Component {...pageProps} />
    </WunderGraphProvider>
  );
}

export default MyApp;
