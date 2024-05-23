import { Box, Center, Text, Image, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  const handleMintClick = () => {
    // Navigate to /SquidMint route when button is clicked
    router.push("/SquidMint");
  };

  return (
    <div className={styles.container}>
      <Box pt={67}>
        <Image src="/logo.png" objectFit="cover" alt="SquidInk Logo" />
      </Box>
      <Box fontFamily="Franklin_notes" className={styles.card6} >
       
        There were 3,000 eggs saved from the corruption and horror of humans.<br/> With the help of  the Mermaid Queen and the Jelly Collective, Squid Ink is ready to be <Text fontSize={17}>REBORN</Text>
        
      </Box>
      <Box>
          <Image  src="../minting-now.png" width={"200"} height={"188"} alt="Minting Now"></Image>
        </Box>
        <Box fontFamily={"Franklin_notes"} className={styles.mainButton} mt={4}  onClick={handleMintClick}>
         ENTER
        </Box>
      <footer>
        <Center fontFamily="Franklin_notes">
          <div className={styles.code}>
            ©SQUIDINK:REBORN 2024
          </div>
        </Center>
      </footer>
    </div>
  );
};

export default Home;
