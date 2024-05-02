import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, phantomWallet, walletConnect } from "@thirdweb-dev/react";
import { Navbar } from "../NavBar/NavBar";
import "../styles/globals.css";
import THIRDWEB_CLIENT_ID from "../import"
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";





function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider 
        activeChain="sepolia"
        clientId={THIRDWEB_CLIENT_ID}
        supportedWallets={[
          metamaskWallet(),
          walletConnect(),
          phantomWallet(),
          coinbaseWallet(),
        ]}
      >
        <Navbar />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
