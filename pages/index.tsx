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
      <Box pb={535}>
        <Text fontFamily="Franklin_notes" className={styles.card3}>
          SquidInk - Reborn: <br />
          Reviving, rebuilding, and adding value. <br />
          <br /> Join us on Polygon for a fresh NFT collecting experience
        </Text>
        <Box mt={4}>
          <Button className={styles.mainButton} onClick={handleMintClick} colorScheme="blue">
            MINT NOW
          </Button>
        </Box>
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
