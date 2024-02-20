import type { AppProps } from "next/app";
import styled from "styled-components";

const RootContainer = styled.div<any>`
background: radial-gradient(circle, #22427E, #112140);
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootContainer>
      <Component {...pageProps} />
    </RootContainer>
  );
}
