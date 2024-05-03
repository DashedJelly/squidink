
import { Box, Center, Text,  SimpleGrid , Container, Grid, GridItem, Heading, Image, Stack, StackDivider, VStack, AspectRatio, Wrap, WrapItem } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
   
      
       
      <div className={styles.container}>

<Box pt={67}>
  <Image src="/logo.png" objectFit='cover' alt=""/>
  
</Box>
<Box pb={535}>
<Text fontFamily={"Franklin_notes"} className={styles.card3}>
SquidInk - Reborn: <br/>Reviving, rebuilding, and adding value.<br/><br/> Join us on Polygon for a fresh NFT collecting experience</Text>
</Box>
      <footer>
        <Center>       <div className={styles.code}>
©SQUIDINK:REBORN 2024
        </div></Center>
 
      </footer>
       </div>
      
  
  );
};

export default Home;
