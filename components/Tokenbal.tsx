import React from "react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css"; 
import { JDOH_TOKEN_ADDRESS } from "../const/contractAddresses";
import { Box } from "@chakra-ui/react";

const TokenBalanceComponent = () => {
  
  const address = useAddress();
  const { contract } = useContract(JDOH_TOKEN_ADDRESS);
  const { data: balance } = useTokenBalance(contract, address);

  return (
    <Box className={styles.ConnectWallet}>
      {balance && (
        <p className={styles.token2}>
          <span className={styles.secondaryCta2}>
            {parseFloat(balance.displayValue).toFixed(1)} {balance.symbol}
          </span>
        </p>
      )}
    </Box>
  );
};

export default TokenBalanceComponent;
