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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { formatUnits } from "ethers/lib/utils";
import { Squidz } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

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
<div className={styles.container2}>
<Wrap spacing='10px' justify='center'>
  <WrapItem>
    <Center>
    <div className={styles.card4}>
          {isLoading ? (
            <Spinner />
          ) : data ? (
            <div className={styles.heroCta2}>
              <Text>Claimable Rewards: </Text><br/> <Text fontFamily={"monospace"}>{parseFloat(formatUnits(data, 18)).toFixed(2)}$JDOH</Text>
            </div>
          ) : (
            <Text>No rewards data available</Text>
          )}
          </div>
    </Center>
  </WrapItem>
  <WrapItem>
    <Center >
    <Web3Button
            theme={"light"}
            className={styles.codeButton2}
              contractAddress="0x931E82341BDE35E3e3AAa1f2E025801BF360c190"
              action={async (contract) => {
                try {
                  await contract.call("stake");
                  openDialog("🎉Success🎉", "Your SquidInk:Reborn are registered for Rewards!");
                } catch (error) {
                  openDialog("🚫Error🚫", "Something went Wrong :( Please try again, or Yell really loud.");
                }
              }}
            >
              <div className={styles.codeButton}>Stake All</div>
            </Web3Button>
    </Center>
  </WrapItem>
  <WrapItem>
    <Center>
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
              <div className={styles.codeButton}>Claim Rewards</div>
            </Web3Button>
    </Center>
  </WrapItem>

</Wrap>

      <Flex
        direction={{ base: "row", md: "column" }}
        
     pt={100}
        w="50vw"
        h="50vh"
        
      >

        
        
       
       

        {/* NFT Table */}
        <Box flex={{ base: "10px", md: "10px" }} pr={6} pl={6}>
          <Table>
            <Tbody>
              {Array.from({ length: Math.ceil(paginatedNFTs.length / 2) }, (_, rowIndex) => (
                <Tr key={rowIndex}>
                  {paginatedNFTs
                    .slice(rowIndex * 2, (rowIndex + 1) * 2)
                    .map((nft) => (
                      <Td key={nft.metadata.id.toString()}>
                        <div className={styles.heroCta20} style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <Box
                          
                          >
                            <Center>
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
                          
                            <div>{nft.metadata.name}</div>
                            <Center className={styles.card}>
                            
                            
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
              <Button ref={cancelRef} colorScheme="blue" onClick={() => setIsDialogOpen(false)}>
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
