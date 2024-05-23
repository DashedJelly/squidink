import React, { useState } from "react";
import { Box, ChakraProvider, Spinner, HStack, IconButton } from "@chakra-ui/react";
import theme from "../theme";
import { useContract, useDirectListings, useValidDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import NFTCard from "../components/NFTCard";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import styles from "../styles/Pack.module.css";
export default function Marketplace() {
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { data: nfts } = useDirectListings(marketplace);
  
  const { data: directListings, isLoading: loadingDirectListings } = useValidDirectListings(marketplace);
  // Pagination settings
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get the NFTs for the current page
  const getCurrentPageNFTs = () => {
    if (!directListings) return []; // Add a null check here
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return directListings.slice(startIndex, endIndex);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (!directListings) return; // Add a null check here
    const totalPages = Math.ceil(directListings.length / itemsPerPage);
    if (currentPage === 1) {
      setCurrentPage(totalPages); // Wrap around to the last page
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (!directListings) return; // Add a null check here
    const totalPages = Math.ceil(directListings.length / itemsPerPage);
    if (currentPage === totalPages) {
      setCurrentPage(1); // Wrap around to the first page
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
      >
        <div className={styles.container}>
       
          <Box pt={33}
          
          
          style={{ zIndex: 666 }}>
           
              <Box bgColor={"blue.500"} color={"blue.200"} fontFamily={"Franklin_notes"} className={styles.secondaryCta}>
                SQUID INK <br />
                <span style={{ fontSize: "2rem" }}>Marketplace</span>
              </Box>
            <Box fontFamily={"franklin_notes"}>
               Collective Approved 
            </Box>
          </Box>
          <div className={styles.heroCta}>
          <HStack spacing={24} mt={6} justify="center">
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="teal"
              aria-label="Previous Page"
              fontSize="30px"
              icon={<ArrowLeftIcon />}
              onClick={goToPreviousPage}
            />
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="purple"
              aria-label="Next Page"
              fontSize="30px"
              icon={<ArrowRightIcon />}
              onClick={goToNextPage}
            />
          </HStack>
          </div>
          
          <div className={styles.grid}>
            {!loadingDirectListings ? (
              getCurrentPageNFTs().map((listing, index) => (
                <div key={index}>
                  <div className={styles.card}>
                    <NFTCard
                      tokenID={listing.asset.id}
                      listingID={listing.id}
                      
                    />
                    <Box
                    >

      </Box>
                  </div>
                </div>
              ))
            ) : (
              <Box>
                <div className={styles.heroCta}>
                  Loading.....
                </div>
                <Spinner
                  rounded={"200"}
                  thickness="6.5px"
                  speed="0.45s"
                  emptyColor="white"
                  color="purple.500"
                  size="xl"
                  
                />
              </Box>
            )}
          </div>
          <div className={styles.heroCta}>
          <HStack spacing={24} mt={6} justify="center">
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="teal"
              aria-label="Previous Page"
              fontSize="30px"
              icon={<ArrowLeftIcon />}
              onClick={goToPreviousPage}
            />
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="purple"
              aria-label="Next Page"
              fontSize="30px"
              icon={<ArrowRightIcon />}
              onClick={goToNextPage}
            />
          </HStack>
          </div>
        </div>
        
      </Box>
      
    </ChakraProvider>
    
  );
}
