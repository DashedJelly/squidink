import type { AppProps } from 'next/app';
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, phantomWallet, walletConnect } from '@thirdweb-dev/react';
import { Navbar } from '../NavBar/NavBar';
import '../styles/globals.css'; // Import global styles
import '../styles/fonts.css'; // Import font styles
import THIRDWEB_CLIENT_ID from '../import';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider
        activeChain="sepolia"
        clientId={THIRDWEB_CLIENT_ID}
        supportedWallets={[metamaskWallet(), walletConnect(), phantomWallet(), coinbaseWallet()]}
      >
      
        <div style={{ fontFamily: 'Franklin_notes, monospace' }}>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
