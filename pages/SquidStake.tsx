/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from "react";
import {
  useContract,
  useContractRead,
  useAddress,
  useOwnedNFTs,
  ThirdwebNftMedia,
  Web3Button,
  useContractMetadata,
} from "@thirdweb-dev/react";
import {
  Box,
  Flex,
  Spinner,
  Text,
  ChakraProvider,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Divider,
  PopoverTrigger,
  ButtonGroup,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Center,
  Tabs,
  Tab,
  TabList,
  Heading,
  Stack,
  StackItem,
  Wrap,
  WrapItem,
  Image,
  Tag,
} from "@chakra-ui/react";
import { formatUnits } from "ethers/lib/utils";
import { Squidz } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import {
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/progress";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import theme from "../theme";
import Leaderboard from "../components/SquidzLeaderboard";


const itemsPerPage = 4;

const ProgressBar: React.FC<{ multiplier: number }> = ({ multiplier }) => {
  const progressPercentage = Math.min(multiplier, 110); // Limit to 110%
  return <div className={styles.progressBar} style={{ width: `${(progressPercentage / 300) * 300}%` }}></div>;
};
const YourComponent: React.FC = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(Squidz, "nft-drop");
  const { contract } = useContract("0x3F8A8Ca06028E73603E6cbb5129eb85b57d18785");
  const { data: rawOwnedNfts } = useOwnedNFTs(nftDropContract, address);

  const ownedNfts = rawOwnedNfts ?? [];
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data, isLoading } = useContractRead(contract, "viewAccumulatedRewards", [address ? address : ""]);
  const { data: stakedTokenIds, isLoading: stakedTokenLoading } = useContractRead(
    contract,
    "getStakedTokenIdsOfOwner",
    [address]
  );

  const { data: multiplierData, isLoading: multiplierLoading } = useContractRead(
    contract,
    "getMultiplier",
    [address]
  );

  const multiplier: number = multiplierData ? multiplierData.toNumber() : 0;
 

  const isNFTStaked = (nftId: string): boolean => {
    return stakedTokenIds?.map((id: { toString: () => any }) => id.toString()).includes(nftId) ?? false;
  };

  const totalPages = Math.ceil(ownedNfts.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedNFTs = ownedNfts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "SQUIDINK", message: "Congrats" });

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const initialFocusRef = useRef<HTMLElement | null>(null);

  const openDialog = (title: string, message: string) => {
    setDialogContent({ title, message });
    setIsDialogOpen(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box className={styles.container2}>
        <Image src="/logo.png" w={"relative"} h={"fill"} alt="logo"/>
      <Center>
        
<Box>
  <Box pt={160}pb={180}  fontFamily={"Franklin_notes"} className={styles.mainButton}>
<Wrap spacing='18px' justify='center'>
<Box margin={23}>
  <WrapItem>
    
      
    <Box >
          {isLoading ? (
            <Spinner color="blue.300" />
          ) : data ? (
            <Box textColor={"black"} fontFamily={"Franklin_notes"} className={styles.heroCta2}>
              <Text fontSize={15} >Claimable Rewards: </Text> <Text textColor={"orange.200"} fontFamily={"monospace"} >{parseFloat(formatUnits(data, 18)).toFixed(2)}</Text><Text fontWeight={666} fontSize={23}>$JDOH</Text>
            </Box>
          ) : (
            <Text>No rewards data available</Text>
          )}
          </Box>
   
  </WrapItem>
  </Box>
<Center >
  <WrapItem >
    <Center >
    <Web3Button 
            theme={"light"}
            className={styles.codeButton}
              contractAddress="0x3F8A8Ca06028E73603E6cbb5129eb85b57d18785"
              action={async (contract) => {
                try {
                  await contract.call("stake");
                  openDialog("🎉Success🎉", "Your SquidInk:Reborn are registered for Rewards!");
                } catch (error) {
                  openDialog("🚫Error🚫", "Something went Wrong :( Please try again, or Yell really loud.");
                }
              }}
            >
              
              <Box >Stake All</Box>
            </Web3Button>
    </Center>
  </WrapItem>
 
  <WrapItem>
    <Center>
      
    <Web3Button
            theme={"light"}
            className={styles.codeButton}
              contractAddress="0x3F8A8Ca06028E73603E6cbb5129eb85b57d18785"
              action={async (contract) => {
                try {
                  await contract.call("claimRewards");
                  openDialog("🎉Success🎉", "✨Jelly Dough Rewards Claimed successfully✨.");
                } catch (error) {
                  openDialog("🚫Error🚫", "Oh No !! Claim Rewards transaction failed. Probably a Rug :(");
                }
              }}
            >
              <Box >Claim Rewards</Box>
            </Web3Button>
    </Center>
  </WrapItem>
  </Center>
  <Divider width={"auto"}/>
<WrapItem>
  <Center>
  <Box className={styles.heroCta6}>
  
  
  <Stack>
    
          
            <StackItem><Text className={styles.heroCta2} fontSize={22}>Your ENOji Boost Amount</Text></StackItem>
  
             
<StackItem>

            <CircularProgress fontFamily={"franklin_notes"} color="blue.500" size={135} value={multiplier}>
              <CircularProgressLabel>+{multiplier}%</CircularProgressLabel>
            </CircularProgress>

           

            </StackItem>
        

          </Stack>
           
          </Box>
  </Center>
</WrapItem>
</Wrap>
</Box>
<Box>
<Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Center>
                <Button 
                fontSize={22}
                fontFamily={"franklin_notes"}
                className={styles.secondaryCta}
                bg={"blue.200"} color={"purple"}>
                  Top 5 Leaderboard
                </Button>
                </Center>
              </PopoverTrigger>
              <PopoverContent 
              color="white" bg="blue.600" borderColor="blue.800">
                <PopoverHeader  pb={5} fontWeight="bold" border="0">
                <Heading
                fontFamily={"franklin_notes"}>🦑Top 5🦑</Heading>
                </PopoverHeader>
                <PopoverArrow bg="purple.200" />
                <PopoverCloseButton bg={"blue.200"}/>
                <PopoverBody>
                  
                <Box>
  <Leaderboard /> 
  </Box>
  
                </PopoverBody>
                <PopoverFooter border="1" display="flex" alignItems="center" justifyContent="over" pb={6}>
                <Center>
                  
                  </Center>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
</Box>
<Wrap>
<WrapItem>
  
      <Flex
        direction={{ base: "row", md: "column" }}
        
     pt={0}
        w="140vw"
        h="140vh"
        
      >

        <Box flex={{ base: "20px", md: "10px" }} pr={6} pl={6}>
          <Table>
            <Center>
            <Tbody>
              {Array.from({ length: Math.ceil(paginatedNFTs.length / 2) }, (_, rowIndex) => (
                <Tr key={rowIndex}>
                  {paginatedNFTs
                    .slice(rowIndex * 2, (rowIndex + 1) * 2)
                    .map((nft) => (
                      <Td key={nft.metadata.id.toString()}>
                        <Box bgColor={"black"} borderRadius={17} p={2} style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <Box bgImage={"bgbubbles.png"} border={32} borderColor={"teal"} borderRadius={30}
                          
                          >
                            <Center p={10}>
                              <ThirdwebNftMedia
                              className={styles.card4}
                                metadata={nft.metadata}
                                
                                style={{
                                  width: "180px", // Default size
                                  height: "relative",
                                }}
                              />
                            </Center>
                          </Box>
                          
                            <Box fontFamily={"Franklin_notes"} className={styles.heroCta6}>{nft.metadata.name}</Box>
                            <Center className={styles.secondaryCta4}>
                            
                            
                                {isNFTStaked(nft.metadata.id.toString()) ? <Tag backgroundColor={"green.200"} color={"purple"}>STAKED</Tag> : <Tag backgroundColor={"orange.200"} color={"orangered"}>UNSTAKED</Tag>}
                               
                              
                            
                            </Center>
                          
                        </Box>
                      </Td>
                    ))}
                </Tr>
              ))}
            </Tbody>
            </Center>
          </Table>
          <Flex mt={4} justify="center">
            {currentPage > 1 && (
              <Button
                variant="outline"
                colorScheme="teal"
                backgroundColor={"blue.200"}
              
                onClick={() => setCurrentPage(currentPage - 1)}
                mx={1}
              >
                <FaChevronLeft />
              </Button>
            )}
            
            {currentPage < totalPages && (
              <Button

                variant="outline"
                colorScheme="teal"
                backgroundColor={"blue.200"}
                onClick={() => setCurrentPage(currentPage + 1)}
                mx={1}
              >
                <FaChevronRight />
              </Button>
            )}
          </Flex>
          
        </Box>
      </Flex>
      </WrapItem>
</Wrap>
      <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={cancelRef} onClose={() => setIsDialogOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {dialogContent.title}
            </AlertDialogHeader>
            <AlertDialogBody>
              {dialogContent.message}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} colorScheme="blue" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Box>
      </Center>
      </Box>
    <Box>
      </Box> 
    </ChakraProvider>
    
  );
};

export default YourComponent;