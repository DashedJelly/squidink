import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  Box,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Alert,
  AlertIcon,
  Popover,
  Button,
  ButtonGroup,
  Center,
  Link,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Heading,
  Tab,
  Tabs,
} from "@chakra-ui/react";
import { Web3Button} from "@thirdweb-dev/react";
import { ethers } from "ethers"; // Import ethers for Wei conversion
import NFTTotalSupply from "../components/Supply";
import router from "next/router";


const Home: NextPage = () => {
  const initialFocusRef = useRef<HTMLElement | null>(null);
  
  const [numberOfTokensSlider1, setNumberOfTokensSlider1] = useState<number>(1);
  const [numberOfTokensSlider2, setNumberOfTokensSlider2] = useState<number>(1);
  
  const amount = 200000000000000;
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<"success" | "error" | "info" | "warning" | undefined>(undefined);
  
  

  const handleSliderChangeSlider1 = (value: number) => {
    setNumberOfTokensSlider1(value);
  };

  const handleSliderChangeSlider2 = (value: number) => {
    setNumberOfTokensSlider2(value);
  };

  const handleMintToken = async (contract: any, numberOfTokens: number) => {
    try {
      let totalEtherAmount = 0.0001 * numberOfTokens; // Set the base mint price
      // Apply discount for three or more mints
      if (numberOfTokens >= 3) {
        totalEtherAmount *= 0.75; // Apply 25% discount
      }
      totalEtherAmount = parseFloat(totalEtherAmount.toFixed(18));
      await contract.call("mintToken", [numberOfTokens], {
        value: ethers.utils.parseEther(totalEtherAmount.toString()), // Convert the total Ether amount to Wei
      });
      setAlertMessage("🐙Minting Successful!🐙");
      setAlertStatus("success");
    } catch (error) {
      console.error("Error minting tokens:", error);
      setAlertMessage("Minting failed. Please try again later.");
      setAlertStatus("error");
    }
  };

  const handleMintWithJDOH = async (contract: any, numberOfTokens: number) => {
    try {
      await contract.call("mintWithJDOH", [numberOfTokens]);
      setAlertMessage("🐙Minting Successful!🐙");
      setAlertStatus("success");
    } catch (error) {
      console.error("Error minting tokens:", error);
      setAlertMessage("Minting failed. Please try again later.");
      setAlertStatus("error");
    }
  };

  const handleJDOHApproval = async (contract: any, amount: number) => {
    try {
      await contract.call("approve", ["0xCAaEe9f60A3749Ed26b3385c92bBeD11d61eD854", amount]);
      setAlertMessage("Approval successful!");
      setAlertStatus("success");
    } catch (error) {
      console.error("Error approving tokens:", error);
      setAlertMessage("Approval failed. Please try again later.");
      setAlertStatus("error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(null);
      setAlertStatus(undefined);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertMessage, alertStatus]);

  

  return (
    <Box>
    <div className={styles.container}>
     
      
      <Box>
        <Text>SQUIDINK:REBORN</Text>
      <Box pt={107}>
  <Image src="/squidhero2.png" objectFit='cover' alt=""/>
  
</Box>
        
      </Box>
      
  
      
      <div className={styles.heroCta4}>
        <NFTTotalSupply /> 
        
       
      </div>
     
      
      <div className={styles.heroCta11}>
        <div className={styles.nftBoxGrid}>
          
          <Image
            className={styles.heroCta2}
            src="/ink.png" alt="InKubator" width={320} height={320} />
         
        
          
          <h2 className={styles.heroCta11}>
          <div className={styles.heroCta1}>
            <Slider
              aria-label="Number of Tokens"
              value={numberOfTokensSlider1}
              onChange={handleSliderChangeSlider1}
              colorScheme='blue'
              min={1}
              max={11}
              size="lg" // Make the slider larger
              defaultValue={1} // Default value
            >
              <SliderTrack bg="blue.300">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb boxSize={16}>
                <Text fontFamily={"monospace"}>{numberOfTokensSlider1}</Text>
              </SliderThumb>
            </Slider>

       
         <br/>

         <Box className={styles.card2}>
         <div className={styles.heroCta4}>
            Mint Price = <br /> 0.0001 Matic <br /><br /> Mint 3 or More = 25% Discount 
          
          
          </div>
            <Popover
              initialFocusRef={initialFocusRef}
              placement="top"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button bg={"black"} color={"White"}>
                  MINT WITH Matic
                </Button>
              </PopoverTrigger>
              <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
               
                <PopoverArrow bg="blue.800" />
                <PopoverCloseButton 
                bgColor={"green.200"}
                />
                <PopoverBody>
                  <Popover  initialFocusRef={initialFocusRef}
              placement="top"
              closeOnBlur={false}>
                  <Box className={styles.card2}>
            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button bg={"blue.200"} color={"purple.600"}>
                Disclaimer:
                </Button>
              </PopoverTrigger>
              <PopoverContent color="white" bg="blue.400" borderColor="green.200">
               
                <PopoverArrow bg="blue.800" />
                <PopoverCloseButton 
                bgColor={"green.200"}
                />
                <PopoverBody pt={26}>
                  <Popover  initialFocusRef={initialFocusRef}
              placement="top"
              closeOnBlur={false}>
                  

<div className={styles.code}>This NFT does not guarantee any financial gain. 

It is intended solely to provide the holder with a unique way to collect and customize a digital collectible. 
The value of this NFT may fluctuate and is subject to market forces. 
<br/>
Please be aware of the risks associated with investing in digital assets and make informed decisions accordingly.</div>
                  </Popover>
               
                </PopoverBody>
                <PopoverFooter border="0" display="auto" alignItems="center" justifyContent="auto" pb={10}>
                <Center>
                  <ButtonGroup size="lg">
                    
                   
                      
                      <Box>
                      <Web3Button
            className={styles.mainButton}
              theme={"light"}
              contractAddress="0x8F3375a9e7607182f4651049248037fB6a7E9a97"
              action={(contract: any) => handleMintToken(contract, numberOfTokensSlider1)}
            >
              MINT:INKubatior
            </Web3Button>
            </Box>
                   
                  </ButtonGroup>
                  </Center>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
                  </Popover>
               
                </PopoverBody>
                <PopoverFooter border="0" display="auto" alignItems="center" justifyContent="auto" pb={10}>
                <Center>
                  <ButtonGroup size="lg">
                    
                   
                      
                      <Box>
                      <Web3Button
            className={styles.mainButton}
              theme={"light"}
              contractAddress="0x8F3375a9e7607182f4651049248037fB6a7E9a97"
              action={(contract: any) => handleMintToken(contract, numberOfTokensSlider1)}
            >
              MINT:INKubator
            </Web3Button>
            </Box>
                   
                  </ButtonGroup>
                  </Center>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
       
           
            </div>
          </h2>
        
          </div>
          </div>
          <Box borderColor={"purple"} borderWidth='1px' borderRadius='lg' overflow='hidden'></Box>
          <div className={styles.heroCta11}>
          <div className={styles.nftBoxGrid}>
            <Image src="/evotoken.png" alt="drop" width={320} height={320} />
          
          
            
            
            
              
            <h2 className={styles.heroCta11}>
          <div className={styles.heroCta1}>
            <Slider
              aria-label="Number of Tokens"
              value={numberOfTokensSlider2}
              onChange={handleSliderChangeSlider2}
              colorScheme='pink'
              min={1}
              max={8}
              size="lg" // Make the slider larger
              defaultValue={1} // Default value
            >
              <SliderTrack bg="blue.200">
                <SliderFilledTrack bg="green.500" />
              </SliderTrack>
              <SliderThumb boxSize={16}>
                <Text fontFamily={"monospace"}>{numberOfTokensSlider2}</Text>
              </SliderThumb>
            </Slider>

            
         <br/>
         <Box className={styles.card2}>
        
            <Popover
              initialFocusRef={initialFocusRef}
              placement="top"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button bg={"black"} color={"blue.200"}>
                  MINT WITH $JDOH
                </Button>
              </PopoverTrigger>
              <PopoverContent color="blue.300" bg="blue.800" borderColor="blue.800">
                <PopoverHeader  pb={5} fontWeight="bold" border="0">
                  🚨Before Your MINT 🚨
                </PopoverHeader>
                <PopoverArrow bg="blue.800" />
                <PopoverCloseButton 
                bgColor={"green.200"}
                />
                <PopoverBody>
                 You Will Need to Approve the amount you wish to spend 
                </PopoverBody>
                <PopoverFooter border="0" display="auto" alignItems="center" justifyContent="auto" pb={10}>
                <Center>
                  <ButtonGroup size="lg">
                    
                   
                      
                      <Box>
              <Web3Button
              className={styles.mainButton}
              theme={"light"}
                contractAddress="0x13eE13d70cdBd336156b9aeBBbC89432C154110e"
                action={(contract1) => {
                  handleJDOHApproval(contract1, amount);
                }}
              >
                APPROVE $JDOH to Mint
              </Web3Button>
              </Box>
                      
                     
              <Web3Button
         className={styles.mainButton}
                theme={"light"}
                contractAddress="0x1526c6055C4bc8C8df2CFEB37f29A53dAe6D79bB"
                action={(contract: any) => handleMintWithJDOH(contract, numberOfTokensSlider2)}
              >
                Mint with $JDOH
              </Web3Button>
                   
                   
                  </ButtonGroup>
                  </Center>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
       
            </div>
          </h2>
          
              
          </div>
        </div>
    
      
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999 }}>
        {alertMessage && (
          <Alert
            status={alertStatus}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mb={4}
            borderRadius="23" // Adjust the border radius as needed
            border="12px solid teal" // Add a teal border
          >
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}
      </div>
     
     <footer>
      <Tabs>
        <Tab>

        <Button
                            colorScheme="blue" variant={"outline"}
                              width={240}
                              bg={"blue.200"}
                              className={styles.codeButton}
                              role="button"
                              onClick={() => {router.push(`https://opensea.io/collection/jellyevolutionz`)
                             ;
                            }}
                            ><Image src="OpenSea.png" alt="OS" height={50}/>
                            OpenSea
                            </Button>

                            <Button
                            colorScheme="pink" variant={"outline"}
                              width={240}
                              
                              bg={"teal.200"}
                              className={styles.codeButton}
                              role="button"
                              onClick={() => {router.push(`/EVORewards`)
                             ;
                            }}
                            >
                            Staking
                            </Button>
      
      </Tab>
      </Tabs>
      <Center><Text fontFamily={"monospace"} className={styles.heroCta11}>Jelly-Tech StudioZ® </Text></Center>
      
     </footer>
    </div>
    </Box>
  );
};

export default Home;
