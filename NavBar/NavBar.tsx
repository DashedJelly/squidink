import { ConnectWallet, ThirdwebProvider, coinbaseWallet, darkTheme, metamaskWallet, phantomWallet, useAddress, useContract, useContractRead, useDisconnect, walletConnect } from "@thirdweb-dev/react";

import styles from "../NavBar/NavBar.module.css";
import { Box, Button, Center, ChakraProvider, Image, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Grid, Icon, TabList, Tabs, useDisclosure, Heading, ModalContextProvider, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import theme from "../theme";
import TokenBalanceComponent from "../components/Tokenbal";
import THIRDWEB_CLIENT_ID from "../import";
import { SetStateAction, useState } from "react";
import router from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import fonts from "../styles/fonts.module.css";
import React from "react";


export function Navbar() {
  const address = useAddress();
 



  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerSize, setDrawerSize] = useState('md'); // Default drawer size
 
 

 

  const handleClick = (newSize: SetStateAction<string>) => {
    setDrawerSize(newSize);
    onOpen();
  }

  const sizes = ['md'];

  return (
    
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
      <ChakraProvider theme={theme}>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <div className={styles.navLeft}>
              <div className={styles.navMiddle}>
                <div className={styles.navConnect}>
                <ConnectWallet
        theme={darkTheme({
          colors: {
            accentText: "#5e02cf",
            accentButtonBg: "#ab66ff",
            modalBg: "#130d30",
           
            borderColor: "#0dbf6c",
            separatorLine: "#164126",
            success: "#c31cd9",
            danger: "#cc0000",
            primaryText: "#19aea4",
            secondaryText: "#ee9ff4",
            accentButtonText: "#116478",
            primaryButtonBg: "#35a498",
            primaryButtonText: "#0a0a0b",
            secondaryButtonBg: "#373e62",
            secondaryIconColor: "#79fd0d",
            secondaryIconHoverColor: "#a60ced",
            secondaryIconHoverBg: "#d7d9ea",
            
            
          },
          
        })}
        btnTitle={"Connect"}
        modalTitle={"Connect"}
        
        auth={{ loginOptional: false }}
        switchToActiveChain={true}
        modalSize={"wide"}
        welcomeScreen={{
          title:
            "Welcome to SquidInk-Reborn",
          subtitle: "Your Adventure Awaits",
          img: {
            src: "/options.png",
            width: 200,
            height: 250,
          },
        }}
        modalTitleIconUrl={
          "/button.png"
        
        }
      />
              </div> 
              </div>
            </div>
            <div className={styles.navRight}>
              <div>
                {sizes.map((size) => (
                  <Button
                  backgroundColor={"teal.200"}
                    key={size}
                    m={0}
                    onClick={() => handleClick(size)}
                  >
                    <HamburgerIcon />
                  </Button>
                ))}
              </div>
              <Drawer onClose={onClose} isOpen={isOpen} size={drawerSize}>
              <Center pt={0}>
                <DrawerOverlay />
                <DrawerContent borderColor={"blue"}
                backgroundImage={"/bubbles.png"}
                backdropBlur={434}
                fontFamily={'Franklin_notes'}
                backgroundColor={"blue.100"}>
                  <DrawerCloseButton backgroundColor={"teal.300"} />
                  
                  <DrawerHeader> 
                  
                    
                   
                      
                        <Box pr={1}>
                         <div className={styles.secondaryCta}>
                         <Image src="evotoken.png" alt="OS" height={70} width={70}/>    
                  <TokenBalanceComponent />
                </div>
                </Box>
                    
                  </DrawerHeader>
                  <DrawerBody>
<Box pb={6}>
                  <Button
                  colorScheme="blue" variant={"outline"}
                      width={300}
                      h={12}
                      bg={"teal.100"}
                      className={styles.codeButton}
                      onClick={() => {router.push(`/`)
                      onClose();
                    }}
                    >
                     
                      <Box pr={0}> Main</Box>
                     
                    </Button>
                    </Box>

                    <Box pt={2}/>
                  
                    <Button
                    colorScheme="teal" variant={"outline"}
                    loadingText
                      width={340}
                      h={100}
                      bg={" blue.100"}
                      className={styles.codeButton}
                      onClick={() => {router.push(`/SquidMint`)
                      onClose();
                      }}
                    >
                       
                      SquidInk-Reborn MINT
                    </Button>

<Center pl={3} pb={3}>

                 
                  </Center>
              
                  <Button
                    colorScheme="teal" variant={"outline"}
                      width={340}
                      h={100}
                      bg={"blue.200"}
                      className={styles.codeButton}
                      onClick={() => {router.push(`/JellyDoughMarketplace`)
                      onClose();
                      }}
                    >
                      Jelly Dough Market
                    </Button>
                  

<Box pt={2}>
    
</Box>

<Box pt={4}>
<Heading fontFamily={"DynaPuff"} color={"teal.300"}>Staking</Heading>
<Button
colorScheme="purple" variant={"outline"}
                              width={340}
                              bg={"teal.300"}
                              className={styles.codeButton}
                              onClick={() => {router.push(`/SquidStake`)
                              onClose();
                            }}
                            >
                              Squid Stake
                            </Button>
                           

</Box>



<Box pt={3}>
<Heading fontFamily={"DynaPuff"} color={"teal.300"}>Info & Socials</Heading>

<Box pt={3}></Box>     
                         
                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"purple.200"}
                              className={styles.codeButton}
                              role="button"
                              onClick={() => {router.push(`/collections`)
                              onClose();
                            }}
                            >
                               Collections
                            </Button>
                            <Box pb={2}></Box>
                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"teal.300"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://thejellygitbook.gitbook.io/the-jelly-collective/guides/community-token`)}
                            >
                             <Text size={"244px"}>JELLY DOUGH / $JDOH</Text> 
                            </Button>
        <Box pb={2}></Box> 

                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"orange.200"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://gitbook.io`)}
                            >
                               Squid-Info
                            </Button>
</Box>

                          
    <Box pb={6}></Box>         
                    <Button
                    colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.200"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://twitter.com/`)}
                            >
                               Follow on 𝕏 
                            </Button>
                            <Box pb={3}></Box> 
                            
                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.300"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://discord.gg/VRmJTGWHHh`)}
                            >
                               Join the Discord  
                            </Button>
    <Box pb={6}></Box>  
    <Button
                            colorScheme="blue" variant={"outline"}
                              width={240}
                              bg={"red.200"}
                              className={styles.codeButton}
                              role="button"
                              onClick={() => {router.push(`/JellyOverlay`)
                              onClose();
                            }}
                            >
                             Sticker Overlays
                            </Button>

                  </DrawerBody>
                  
                  <footer>© SquidInk/REBORN 2024</footer>
                </DrawerContent>
                </Center>
              </Drawer>
            </div>
          </nav>
        </div>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

