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
    <div>
      {isLoading ? (
       <Box>
       <div>
         Loading.....
       </div>
       <Spinner
         rounded={"200"}
         thickness="6.5px"
         speed="0.75s"
         emptyColor="gray.200"
         color="purple.500"
         size="xl"
         textShadow={23}
       />
     </Box>
      ) : (
        <p>Total Minted: {totalSupply}/9999</p>
      )}
    </div>
  );
}

export default NFTTotalSupply;