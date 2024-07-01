import {
    darkTheme,
    useActiveClaimConditionForWallet,
    useAddress,
    useClaimConditions,
    useClaimerProofs,
    useClaimIneligibilityReasons,
    useContract,
    useContractMetadata,
    useContractRead,
    useTotalCirculatingSupply,
    Web3Button,
  } from "@thirdweb-dev/react";
  import { BigNumber, utils } from "ethers";
  import type { NextPage } from "next";
  import { useMemo, useState } from "react";
  import styles from "../styles/Theme.module.css";
  import { parseIneligibility } from "../utils/parseIneligibility";
  import { BOOSTER, SQUID_BOOSTERS_ADDRESS, tokenId } from "../const/contractAddresses";
  import { Text, Box, Button, Center, Divider, Heading, Image, Link, Spinner } from "@chakra-ui/react";

  
  const Special: NextPage = () => {
    const address = useAddress();
    const [quantity, setQuantity] = useState(1);
    const { contract: editionDrop } = useContract(SQUID_BOOSTERS_ADDRESS);
    const { data: contractMetadata } = useContractMetadata(editionDrop);
    
  
    
    const claimConditions = useClaimConditions(editionDrop);
    const activeClaimCondition = useActiveClaimConditionForWallet(
      editionDrop,
      address,
      tokenId
    );
    const claimerProofs = useClaimerProofs(editionDrop, address || "", tokenId);
    const claimIneligibilityReasons = useClaimIneligibilityReasons(
      editionDrop,
      {
        quantity,
        walletAddress: address || "",
      },
      tokenId
    );
  
    const claimedSupply = useTotalCirculatingSupply(editionDrop, tokenId);
  
    const totalAvailableSupply = useMemo(() => {
      try {
        return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
      } catch {
        return BigNumber.from(1_000_000);
      }
    }, [activeClaimCondition.data?.availableSupply]);
  
    const numberClaimed = useMemo(() => {
      return BigNumber.from(claimedSupply.data || 0).toString();
    }, [claimedSupply]);
  
    const numberTotal = useMemo(() => {
      const n = totalAvailableSupply.add(BigNumber.from(claimedSupply.data || 0));
      if (n.gte(1_000_000)) {
        return "";
      }
      return n.toString();
    }, [totalAvailableSupply, claimedSupply]);

    const totalMinted = claimedSupply.data || 0;
    const totalSupply = totalMinted.toString();
  
    const priceToMint = useMemo(() => {
      const bnPrice = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      return `${utils.formatUnits(
        bnPrice.mul(quantity).toString(),
        activeClaimCondition.data?.currencyMetadata.decimals || 18
      )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
    }, [
      activeClaimCondition.data?.currencyMetadata.decimals,
      activeClaimCondition.data?.currencyMetadata.symbol,
      activeClaimCondition.data?.currencyMetadata.value,
      quantity,
    ]);
  
    const maxClaimable = useMemo(() => {
      let bnMaxClaimable;
      try {
        bnMaxClaimable = BigNumber.from(
          activeClaimCondition.data?.maxClaimableSupply || 0
        );
      } catch (e) {
        bnMaxClaimable = BigNumber.from(1_000_000);
      }
  
      let perTransactionClaimable;
      try {
        perTransactionClaimable = BigNumber.from(
          activeClaimCondition.data?.maxClaimablePerWallet || 0
        );
      } catch (e) {
        perTransactionClaimable = BigNumber.from(1_000_000);
      }
  
      if (perTransactionClaimable.lte(bnMaxClaimable)) {
        bnMaxClaimable = perTransactionClaimable;
      }
  
      const snapshotClaimable = claimerProofs.data?.maxClaimable;
  
      if (snapshotClaimable) {
        if (snapshotClaimable === "0") {
          // allowed unlimited for the snapshot
          bnMaxClaimable = BigNumber.from(1_000_000);
        } else {
          try {
            bnMaxClaimable = BigNumber.from(snapshotClaimable);
          } catch (e) {
            // fall back to default case
          }
        }
      }
  
      let max;
      if (totalAvailableSupply.lt(bnMaxClaimable)) {
        max = totalAvailableSupply;
      } else {
        max = bnMaxClaimable;
      }
  
      if (max.gte(1_000_000)) {
        return 1_000_000;
      }
      return max.toNumber();
    }, [
      claimerProofs.data?.maxClaimable,
      totalAvailableSupply,
      activeClaimCondition.data?.maxClaimableSupply,
      activeClaimCondition.data?.maxClaimablePerWallet,
    ]);
  
    const isSoldOut = useMemo(() => {
      try {
        return (
          (activeClaimCondition.isSuccess &&
            BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
              0
            )) ||
          numberClaimed === numberTotal
        );
      } catch (e) {
        return false;
      }
    }, [
      activeClaimCondition.data?.availableSupply,
      activeClaimCondition.isSuccess,
      numberClaimed,
      numberTotal,
    ]);
  
    const canClaim = useMemo(() => {
      return (
        activeClaimCondition.isSuccess &&
        claimIneligibilityReasons.isSuccess &&
        claimIneligibilityReasons.data?.length === 0 &&
        !isSoldOut
      );
    }, [
      activeClaimCondition.isSuccess,
      claimIneligibilityReasons.data?.length,
      claimIneligibilityReasons.isSuccess,
      isSoldOut,
    ]);
  
    const isLoading = useMemo(() => {
      return (
        activeClaimCondition.isLoading || claimedSupply.isLoading || !editionDrop
      );
    }, [activeClaimCondition.isLoading, editionDrop, claimedSupply.isLoading]);
  
    const buttonLoading = useMemo(
      () => isLoading || claimIneligibilityReasons.isLoading,
      [claimIneligibilityReasons.isLoading, isLoading]
    );
    const buttonText = useMemo(() => {
      if (isSoldOut) {
        return "Sold Out";
      }
  
      if (canClaim) {
        const pricePerToken = BigNumber.from(
          activeClaimCondition.data?.currencyMetadata.value || 0
        );
        if (pricePerToken.eq(0)) {
          return "Mint (Free)";
        }
        return `Mint (${priceToMint})`;
      }
      if (claimIneligibilityReasons.data?.length) {
        return parseIneligibility(claimIneligibilityReasons.data, quantity);
      }
      if (buttonLoading) {
        return "Checking eligibility...";
      }
  
      return "Claiming not available";
    }, [
      isSoldOut,
      canClaim,
      claimIneligibilityReasons.data,
      buttonLoading,
      activeClaimCondition.data?.currencyMetadata.value,
      priceToMint,
      quantity,
    ]);
  
    return (
      <Box pt={20} className={styles.container}>
<br/>

<Divider/>
<Box className={styles.heroCta}>
<Center>
<Box className={styles.card4}>
<Box >

        <Heading
      color={"orange.200"}
      
        fontFamily={"franklin_notes"}
        
        >
          Cute Squid
          <br/>
          ENOji Collectibles #0
        
        </Heading>
        </Box>
        <div>
          <Text dropShadow={"32px"} color={"blue.100"}>1% BOOST</Text>
          
          <br/><Text color={"orange.300"}>Max Mint = 1X</Text>
          
          <Text fontSize={13} color={"orange.300"}>
           </Text>
        </div>
        </Box></Center></Box>
        <div className={styles.mintInfoContainer}>
          {isLoading ? (
            <Box>
            <Spinner
              rounded={"300"}
              thickness="3.5px"
              speed="0.75s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
              textShadow={12}
            />
          </Box>
          ) : (
            <>
             

              <div className={styles.imageSide}>
              <div>
              <div >
              
      
   
     
    
    <br/>
   
  
    </div>
              <Center pr={"inherit"}>
              
                <Image
                pr={"inherit"}
                  className={styles.card3}
                  src={BOOSTER}
                  alt="Wee Loaf"
                />
  </Center>
                
                <div className={styles.mintCompletionArea}>
                  
                </div>
                
                {claimConditions.data?.length === 0 ||
                claimConditions.data?.every(
                  (cc) => cc.maxClaimableSupply === "0"
                ) ? (
                  
                  <div className={styles.card3}>
                  
                      This drop is not ready to be minted yet.
                    
                  </div>
                  
                ) : (
                  
                  <Center>
                    <div className={styles.heroCta}>
                    <div className={styles.quantityContainer}>
                      <button
                        className={`${styles.quantityControlButton}`}
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      
                      <Box className={styles.card3}><Box>{quantity}</Box></Box> 
                     
                      <button
                        className={`${styles.quantityControlButton}`}
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= maxClaimable}
                      >
                        +
                      </button>
                    </div>
                    </div>
                   
                    <Box className={styles.heroCta}>
                      {isSoldOut ? (
                        <Box fontSize={26}>
                          <Box>Sold Out</Box>
                        </Box>
                      ) : (
                        <Web3Button
                          contractAddress={editionDrop?.getAddress() || ""}
                          
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
                              primaryButtonBg: "#37a498",
                              primaryButtonText: "#0b0a0b",
                              secondaryButtonBg: "#373e72",
                              secondaryIconColor: "#79fd0d",
                              secondaryIconHoverColor: "#a60ced",
                              secondaryIconHoverBg: "#d7d9ea",
                              
                              
                            },
                          })}
                          action={(cntr) => cntr.erc1155.claim(tokenId, quantity)}
                          isDisabled={!canClaim || buttonLoading}

                          onSuccess={() => alert("💜🍞 Congrats You Claimed an Exclusive Jelly Collectible !🍞💜")}
            onError={(err) => alert(err)}
            className={styles.mainButton}
                        >
                       <Text fontFamily={""}>{buttonLoading ? "Loading..." : buttonText}</Text>   
                        </Web3Button>
                      )}
                    </Box>
                  </Center>
                )}
              </div>
              <Box className={styles.heroCta}>

                Total Supply: {totalSupply}

                </Box>
              </div>
            </>
          )}
          
        </div>
        <Box 
       
      >

        <Button background={"blue.200"}><Link href="https://opensea.io/collection/enoji-collectibles">
        <Box > View Collection on Opensea</Box>
        </Link></Button>
      
        
       
        
      </Box>
       <Divider/>
      </Box>
    );
  };
  
  export default Special;