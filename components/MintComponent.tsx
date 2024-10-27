import {
  darkTheme,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import { useMemo, useState } from "react";
import styles from "../styles/Theme.module.css";
import { parseIneligibility } from "../utils/parseIneligibility";
import { Text, Box, Button, Center, Divider, Heading, Image, Link, Spinner, VStack } from "@chakra-ui/react";

interface MintComponentProps {
  mints: {
    contractAddress: string;
    tokenId: number;
    boosterImage: string;
    heading: string;
    subHeading: string;
    maxMintText: string;
  }[];
}

const MintComponent: React.FC<MintComponentProps> = ({ mints }) => {
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const [currentMint, setCurrentMint] = useState(0);

  const handleNextMint = () => {
    setCurrentMint((prev) => (prev + 1) % mints.length);
  };

  const { contract: editionDrop } = useContract(mints[currentMint].contractAddress);
  const { data: contractMetadata } = useContractMetadata(editionDrop);

  const claimConditions = useClaimConditions(editionDrop);
  const activeClaimCondition = useActiveClaimConditionForWallet(
    editionDrop,
    address,
    mints[currentMint].tokenId
  );
  const claimerProofs = useClaimerProofs(editionDrop, address || "", mints[currentMint].tokenId);
  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    editionDrop,
    {
      quantity,
      walletAddress: address || "",
    },
    mints[currentMint].tokenId
  );

  const claimedSupply = useTotalCirculatingSupply(editionDrop, mints[currentMint].tokenId);

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

  const ButtonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );
  const ButtonText = useMemo(() => {
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
    if (ButtonLoading) {
      return "Checking eligibility...";
    }

    return "Claiming not available";
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    ButtonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  return (
    <Box pt={20} className={styles.container}>
      <Box className={styles.card3}>
        <Heading className={styles.heroCta} color={"orange.200"} fontFamily={"franklin_notes"}>
          {mints[currentMint].heading}
          <br />
          {mints[currentMint].subHeading}
        </Heading>
      </Box>
      <div className={styles.mintInfoContainer}>
        {isLoading ? (
          <Center>
            <VStack>
              <Spinner
                rounded={"300"}
                thickness="3.5px"
                speed="0.75s"
                emptyColor="gray.200"
                color="purple.500"
                size="xl"
                textShadow={12}
              />
              <Text>Loading Enoji...</Text>
            </VStack>
          </Center>
        ) : (
          <>
            <Box className={styles.imageSide}>
              <div>
                <div>
                  <br />
                </div>
                <Center pr={"inherit"}>
                  <Image
                    pr={"inherit"}
                    className={styles.card3}
                    src={mints[currentMint].boosterImage}
                    alt="Image"
                  />
                </Center>
                <div className={styles.mintCompletionArea}></div>
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
                        <Button
                          bgColor={"orange.200"}
                          className={`${styles.quantityControlButton}`}
                          onClick={() => setQuantity(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </Button>
                        <Box color={"black"}>
                          <Box fontFamily={"franklin_notes"}>{quantity}</Box>
                        </Box>
                        <Button
                          bgColor={"orange.200"}
                          className={`${styles.quantityControlButton}`}
                          onClick={() => setQuantity(quantity + 1)}
                          disabled={quantity >= maxClaimable}
                        >
                          +
                        </Button>
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
                          action={(cntr) => cntr.erc1155.claim(mints[currentMint].tokenId, quantity)}
                          isDisabled={!canClaim || ButtonLoading}
                          onSuccess={() =>
                            alert("🦑 Congrats You Claimed an ENOji Booster !🦑")
                          }
                          onError={(err) => alert(err)}
                          className={styles.mainButton}
                        >
                          <Text fontFamily={""}>
                            {ButtonLoading ? "Loading..." : ButtonText}
                          </Text>
                        </Web3Button>
                      )}
                    </Box>
                  </Center>
                )}
              </div>
              <Box className={styles.heroCta}>Total Claimed: {totalSupply}</Box>
            </Box>
          </>
        )}
      </div>
      <Box>
        <Center mb={4}>
          <Button size={"lg"} bgColor={"orange.200"} onClick={handleNextMint}>
            NEXT MINT
          </Button>
        </Center>
      </Box>
      <Box>
        <Button size={"sm"} background={"blue.200"}>
          <Link href="https://opensea.io/collection/enoji-collectibles">
            <Box>View Collection on Opensea</Box>
          </Link>
        </Button>
      </Box>
      <Divider />
    </Box>
  );
};

export default MintComponent;