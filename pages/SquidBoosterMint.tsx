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
      heading: "Dead Squid",
      subHeading: "ENOji #6",
      maxMintText: "Max Mint = 2X",
    },
    {
      contractAddress: SQUID_BOOSTERS_ADDRESS,
      tokenId: tokenId2,
      boosterImage: BOOSTER2,
      heading: "Killer Squid",
      subHeading: "ENOji #7",
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
