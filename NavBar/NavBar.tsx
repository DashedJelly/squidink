import { ConnectWallet, ThirdwebProvider, coinbaseWallet, darkTheme, metamaskWallet, phantomWallet, trustWallet, useAddress, useContract, useContractRead, useDisconnect, walletConnect } from "@thirdweb-dev/react";

import styles from "../NavBar/NavBar.module.css";
import { Box, Button, Center, ChakraProvider, Image, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Grid, Icon, TabList, Tabs, useDisclosure, Heading, ModalContextProvider, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import theme from "../theme";
import TokenBalanceComponent from "../components/Tokenbal";
import THIRDWEB_CLIENT_ID from "../import";
import { SetStateAction, useState } from "react";
import router from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";

import React from "react";


export function Navbar() {
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerSize, setDrawerSize] = useState('md'); 
 
 


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
        trustWallet(),
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
           accentText: "#0851bf",
           accentButtonBg: "#18e90",
           modalBg: "#06023",
           borderColor: "#0c7a88",
           separatorLine: "#3e1a93",
           secondaryText: "#71ccb5",
           secondaryButtonBg: "#0e154e",
           secondaryButtonHoverBg: "#33074b",
           connectedButtonBgHover: "#206c92",
           walletSelectorButtonHoverBg:
             "#1c455f",
           skeletonBg: "#0d1b30",
           selectedTextColor: "#0c1227",
           selectedTextBg: "#c5f7e6",
         },
         
       })
     
     }
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
           width: 250,
           height: 280,
         },
       }}
       modalTitleIconUrl={
         "/comlogo.png"
       
       }
       showThirdwebBranding={false}
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
                <DrawerOverlay />
                <DrawerContent borderColor={"white"}
                backgroundImage={"/bubbles.png"}
                backgroundSize={"4200px"}
                backdropBlur={420}
                fontFamily={'Franklin_notes'}
                backgroundColor={"blue.200"}>
                  <DrawerCloseButton backgroundColor={"green.200"} />
                  
                  <DrawerHeader> 
                  
                    <Center pt={0}>
                   
                      
                        <Box pr={1}>
                         <div className={styles.secondaryCta}>
                         <Image src="evotoken.png" alt="OS" height={70} width={70}/>    
                  <TokenBalanceComponent />
                </div>
                </Box>
                    </Center>
                  </DrawerHeader>
                  <DrawerBody>
<Box pb={6}>
                  <Button
                  colorScheme="blue" variant={"outline"}
                      width={300}
                      h={12}
                      bg={"blue.200"}
                      className={styles.codeButton}
                      onClick={() => {router.push(`/`)
                      onClose();
                    }}
                    >
                     
                      <Box fontSize={26} pr={0}> Main</Box>
                     
                    </Button>
                    </Box>

                    <Box pt={2}/>
                  
                    <Button
                   fontSize={24}
                    colorScheme="blue" variant={"outline"}
                    loadingText
                      width={340}
                     
                      bg={"blue.200"}
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
                  fontSize={20}
                    colorScheme="blue" variant={"outline"}
                      width={340}
                    
                      bg={"blue.200"}
                      className={styles.codeButton}
                      onClick={() => {router.push(`https://www.thejellycollective.club/JellyDoughMarketplace`)
                      onClose();
                      }}
                    >
                      JellyDough Market
                    </Button>
                  


<Center pl={0} pb={3}  pt={3}>

           </Center>
<Box color={"purple.700"}>
  <Center>
 
  </Center>
<Box pt={4}>
<Heading fontFamily={"Franklin_notes"} color={"orange.300"}>Staking</Heading>

    <Box pt={3}></Box>
                            <Button
                            fontSize={20}
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.200"}
                              className={styles.codeButton}
                              onClick={() => {router.push(`/SquidStake`)
                              onClose();
                            }}
                            >
                              Squid Reward Registry
                            </Button>


</Box>
</Box>

<Box pt={3}></Box>

<Box pt={3}>
<Heading fontFamily={"Franklin_notes"} color={"orange.300"}>Info & Socials</Heading>

<Box pt={3}></Box>     
                         
                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.200"}
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
                              bg={"blue.200"}
                              className={styles.codeButton}
                              role="button"
                              onClick={() => {router.push(`/collections`)
                              onClose();
                            }}
                            >
                              Jelly Dough/$JDOH
                            </Button>
        <Box pb={2}></Box> 

                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.200"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://gitbook.io`)}
                            >
                               Squid-Info 
                            </Button>
</Box>
<Box pb={2}></Box> 
                 
    <Box pb={6}></Box>         
                    <Button
                    colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.200"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://twitter.com/`)}
                            >
                               Follow on     <Text pl={2} fontSize={22}> 𝕏</Text>
                            </Button>
                            <Box pb={3}></Box> 
                            <Button
                            colorScheme="blue" variant={"outline"}
                              width={340}
                              bg={"blue.200"}
                              className={styles.codeButton}
                              onClick={() => router.push(`https://discord.gg/`)}
                            >
                               Join the Discord  
                            </Button>
  

                  </DrawerBody>
                  
                  <footer>© SquidInk-Reborn 2024</footer>
                </DrawerContent>
              </Drawer>
            </div>
          </nav>
        </div>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

