import { NextPage } from "next/types";
import { Box } from "@chakra-ui/react";
import MintComponent from "../components/MintComponent";
import { BOOSTER1, BOOSTER2, SQUID_BOOSTERS_ADDRESS, tokenId1, tokenId2 } from "../const/contractAddresses";

const Special: NextPage = () => {
  const mints = [
    {
      contractAddress: SQUID_BOOSTERS_ADDRESS,
      tokenId: tokenId1,
      boosterImage: BOOSTER1,
      heading: "NoU Squid",
      subHeading: "ENOji #4",
      maxMintText: "Max Mint = 1X",
    },
    {
      contractAddress: SQUID_BOOSTERS_ADDRESS,
      tokenId: tokenId2,
      boosterImage: BOOSTER2,
      heading: "Wave Squid",
      subHeading: "ENOji #5",
      maxMintText: "Max Mint = 1X",
    },
  ];

  return (
    <Box bg="gray.100" p={4} borderRadius="md">
      <MintComponent mints={mints} />
    </Box>
  );
};

export default Special;