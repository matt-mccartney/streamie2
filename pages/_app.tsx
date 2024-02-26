import type { AppProps } from "next/app";
import { Quattrocento_Sans } from "next/font/google";
import styled from "styled-components";

const quattrocentoSans = Quattrocento_Sans({ weight: "400", subsets: ["latin"] });

const RootContainer = styled.div.attrs((props) => ({className: quattrocentoSans.className}))<any>`
background: radial-gradient(circle, #22427E, #112140);
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootContainer>
      <Component {...pageProps} />
    </RootContainer>
  );
}
