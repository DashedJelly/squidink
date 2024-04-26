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

const itemsPerPage = 8;

const ProgressBar: React.FC<{ multiplier: number }> = ({ multiplier }) => {
  const progressPercentage = Math.min(multiplier, 300); // Limit to 300%
  return <div className={styles.progressBar} style={{ width: `${(progressPercentage / 300) * 300}%` }}></div>;
};

const YourComponent: React.FC = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(Squidz, "nft-drop");
  const { contract } = useContract("0x931E82341BDE35E3e3AAa1f2E025801BF360c190");
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
  const [dialogContent, setDialogContent] = useState({ title: "", message: "" });

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const initialFocusRef = useRef<HTMLElement | null>(null);

  const openDialog = (title: string, message: string) => {
    setDialogContent({ title, message });
    setIsDialogOpen(true);
  };

  return (
    <ChakraProvider theme={theme}>
<div className={styles.container5}>
  <Box pt={20}></Box>
<Heading pt={17} className={styles.secondaryCta} color={"green.200"} size={"lg"} fontFamily={"Nerko One"}>EVO:STAKING REGISTRY</Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="wide"
        p={-20}
        pt={32}
        w="100vw"
        h="69vh"
        
      >
<div>
  
</div>
        
        
        <div className={styles.progressBarContainer}>
          <ProgressBar multiplier={multiplier} />
        </div>

        {/* Rewards */}
        <div className={styles.heroCta20}>
          {isLoading ? (
            <Spinner />
          ) : data ? (
            <div className={styles.heroCta6}>
              <Text>Rewards: {parseFloat(formatUnits(data, 18)).toFixed(2)} $JDOH</Text>
            </div>
          ) : (
            <Text>No rewards data available</Text>
          )}

<Box className={styles.heroCta6}>
            
            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Center>
                <Button 
                fontFamily={"monospace"}
                className={styles.heroCta6}
                bg={"blue.200"} color={"purple"}>
                  Top 5 Leaderboard
                </Button>
                </Center>
              </PopoverTrigger>
              <PopoverContent 
              color="white" bg="blue.600" borderColor="blue.800">
                <PopoverHeader  pb={5} fontWeight="bold" border="0">
                <Heading
                fontFamily={"DynaPuff"}>⭐Top 5⭐ Leaderboard</Heading>
                </PopoverHeader>
                <PopoverArrow bg="blue.200" />
                <PopoverCloseButton bg={"green.200"}/>
                <PopoverBody>
                <div>
  <Leaderboard /> 
  </div>
                </PopoverBody>
                <PopoverFooter border="1" display="flex" alignItems="center" justifyContent="over" pb={6}>
                <Center>
                  
                  </Center>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>

 <div className={styles.heroCta6}>
<div>REWARD REGISTRIES</div>
 <Tabs
 align="center" padding={1} margin={2} color={"antiquewhite"} shadow={"black"} colorScheme="purple" position="relative" variant="styled">
    <TabList>
     
      <Link href="/labjellyregistry">
      <Tab 
     
      fontSize={20} className={styles.codeButton2}>Lab Jellies
      </Tab>
      </Link>

      <Link  href="/genesisrewards">
      <Tab fontSize={20} className={styles.codeButton2}>Genesis Jellies</Tab>
      </Link>


<Link href="/EVORewards">
<Tab fontSize={20} className={styles.codeButton2}>Jelly EvolutionZ</Tab>
      </Link>

    </TabList>
  
  </Tabs>
  </div>
 <Center 
 className={styles.heroCta6}
 > {/* Boost Popover */}
          <Box className={styles.card4}>
            
            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button bg={"purple.400"} color={"blue"}>
                  BOOST
                </Button>
              </PopoverTrigger>
              <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                <PopoverHeader  pb={5} fontWeight="bold" border="0">
                  Collectibles Percentage Boost %
                </PopoverHeader>
                <PopoverArrow bg="blue.800" />
                <PopoverCloseButton />
                <PopoverBody>
                  Boosts Are Automatically added When a Jelly Collectible is owned and held in the same wallet as Your EVO Jelly/Incubators
                </PopoverBody>
                <PopoverFooter border="1" display="flex" alignItems="center" justifyContent="over" pb={6}>
                <Center>
                  <ButtonGroup size="md">
                    <Link href="https://opensea.io/collection/jelly-collectibles">
                      <Button colorScheme="green"
                      className={styles.heroCta1}>Purchase a <br/> Collectible</Button>
                    </Link>
                    <Link href="https://opensea.io/collection/jellyevolutionz">
                      <Button colorScheme="purple"
                      className={styles.heroCta1}>Purchase an <br/>Evo on Opensea</Button>
                    </Link>
                  </ButtonGroup>
                  </Center>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box></Center>
          <div className={styles.heroCta6}>
             

            <CircularProgress fontFamily={"Nerko One"} color="purple.500" size={135} value={multiplier}>
              <CircularProgressLabel>+{multiplier}%</CircularProgressLabel>
            </CircularProgress>
          </div>
          <Center className={styles.GridItem}>
          <Flex mt={77} gap={9}>
            <Web3Button
            theme={"light"}
            className={styles.codeButton2}
              contractAddress="0x931E82341BDE35E3e3AAa1f2E025801BF360c190"
              action={async (contract) => {
                try {
                  await contract.call("stake");
                  openDialog("🎉Success🎉", "✨ Your J-EVO are registered for Rewards ✨ !");
                } catch (error) {
                  openDialog("🚫Error🚫", "Something went Wrong :( Please try again, or Yell really loud.");
                }
              }}
            >
              <div className={styles.codeButton2}>Stake All</div>
            </Web3Button>
            <Web3Button
            theme={"light"}
            className={styles.codeButton2}
              contractAddress="0x931E82341BDE35E3e3AAa1f2E025801BF360c190"
              action={async (contract) => {
                try {
                  await contract.call("claimRewards");
                  openDialog("🎉Success🎉", "✨Jelly Dough Rewards Claimed successfully✨.");
                } catch (error) {
                  openDialog("🚫Error🚫", "Oh No !! Claim Rewards transaction failed. Probably a Rug :(");
                }
              }}
            >
              <div className={styles.codeButton2}>Claim Rewards</div>
            </Web3Button>
          </Flex>
          </Center>
        
       
        
        </div>

        {/* NFT Table */}
        <Box flex={{ base: "10px", md: "10px" }} pr={6} pl={6}>
          <Table variant="simple">
            <Tbody>
              {Array.from({ length: Math.ceil(paginatedNFTs.length / 2) }, (_, rowIndex) => (
                <Tr key={rowIndex}>
                  {paginatedNFTs
                    .slice(rowIndex * 2, (rowIndex + 1) * 2)
                    .map((nft) => (
                      <Td key={nft.metadata.id.toString()}>
                        <div className={styles.heroCta20} style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <Box
                            sx={{
                              "@media (max-width: 420px)": {
                                width: "50px", // Adjust the width for mobile
                              },
                            }}
                          >
                            <Center>
                              <ThirdwebNftMedia
                              className={styles.card3}
                                metadata={nft.metadata}
                                
                                style={{
                                  width: "150px", // Default size
                                  height: "relative",
                                }}
                              />
                            </Center>
                          </Box>
                          
                            <div>{nft.metadata.name}</div>
                            <Center className={styles.heroCta6}>
                            
                            
                                {isNFTStaked(nft.metadata.id.toString()) ? <Text color={"aqua"} >STAKED</Text> : <Text color={"orange"}>UNSTAKED</Text>}
                               
                              
                            
                            </Center>
                          
                        </div>
                      </Td>
                    ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex mt={4} justify="center">
            {currentPage > 1 && (
              <Button
                variant="outline"
                colorScheme="pink"
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
                colorScheme="pink"
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
              <Button ref={cancelRef} colorScheme="pink" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </div>
    </ChakraProvider>
  );
};

export default YourComponent;
