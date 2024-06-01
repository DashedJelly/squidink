import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { SquidSupply } from "../const/contractAddresses";
import { Box, Spinner } from "@chakra-ui/react";

function NFTTotalSupply() {
  const { contract } = useContract(SquidSupply);
  const [totalSupply, setTotalSupply] = useState(null);

  const { data, isLoading } = useContractRead(contract, "totalSupply", []);

  useEffect(() => {
    if (!isLoading && data) {
      setTotalSupply(data.toString());
    }
  }, [isLoading, data]);

  return (
    <Box>
      {isLoading ? (
       <Box fontFamily={"Franklin_notes"}>
       <Box>
         Loading.....
       </Box>
       <Spinner
         rounded={"200"}
         thickness="6.5px"
         speed="0.75s"
         emptyColor="gray.200"
         color="blue.500"
         size="xl"
         textShadow={10}
       />
     </Box>
      ) : (
        <Box fontFamily={"Franklin_notes"}>Total Minted: {totalSupply}/2999</Box>
      )}
    </Box>
  );
}

export default NFTTotalSupply;