
import { Box, Center, Text,  SimpleGrid , Container, Grid, GridItem, Heading, Image, Stack, StackDivider, VStack, AspectRatio, Wrap, WrapItem } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
   
      
       
      <div className={styles.container1}>

<Box>
  <Image src="/squid-hero2.jpg" objectFit='cover' alt=""/>
  
</Box>
<Heading className={styles.heroCta}>
<Center>
<Text fontFamily={"Reenie Beanie"} fontSize={"44"}>

SquidInk Reborn:Minting Now 

</Text>
</Center>
</Heading>



      
      <Box>
      <Wrap spacing='40px' justify='center'>
  <WrapItem>
  <Center>
  <Image opacity={"67%"} src="/options.png" objectFit={"cover"} alt=""/>
  </Center>
  </WrapItem>
 
  <WrapItem>
    <Center className={styles.heroCta}>
      <Text align={"center"} paddingBlock={56} fontSize={30}>
        Re:Focused and Reborn 
        <br/><br/>
        <br/><br/>
        Project Description 
        <br/><br/>
        - Short
        - Sweet
        <br/><br/>
        <br/><br/>
        - Just enough info
      </Text>
      
    </Center>
  </WrapItem>
  <WrapItem>
  <Center className={styles.heroCta}>
      <Text paddingBlock={56} fontSize={30}>
        Re:Focused and Reborn 
        <br/><br/>
        <br/><br/>
        Project Description 
        <br/><br/>
        - Short
        - Sweet
        <br/><br/>
        <br/><br/>
        - Just enough info
      </Text>
      
    </Center>
  </WrapItem>

  <WrapItem>
  <Center className={styles.heroCta}>
      <Text paddingBlock={56} fontSize={30}>
        Re:Focused and Reborn 
        <br/><br/>
        <br/><br/>
        Project Description 
        <br/><br/>
        - Short
        - Sweet
        <br/><br/>
        <br/><br/>
        - Just enough info
      </Text>
      
    </Center>
  </WrapItem>
  <WrapItem>
   
  </WrapItem>
</Wrap>
<Center className={styles.heroCta}>
    <Image opacity={"100%"} src="/rarities.png" w={550} h={400} alt=""/>
    </Center>
 </Box>
      <footer>
        <Center>       <div className={styles.heroCta}>
©SQUIDINK:REBORN 2024
        </div></Center>
 
      </footer>
       </div>
      
  
  );
};

export default Home;
