import { Image, Box, Text, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Divider, Progress, PopoverCloseButton } from "@chakra-ui/react";
import { useAddress, useDirectListing, useContract, Web3Button, darkTheme, lightTheme } from "@thirdweb-dev/react";
import styles from "../styles/Pack.module.css";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";

type Props = {
  tokenID: string;
  listingID: string;
};

export default function NFTCard({listingID}: Props) {
  const address = useAddress();
  const defaultDarkTheme = lightTheme()
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { data: listing, isLoading: loadingListing } = useDirectListing(marketplace, listingID);

  async function buyNFT() {
    let txResult;

    if (listing) {
      txResult = await marketplace?.directListings.buyFromListing(listing.id, 1);
    } else {
      throw new Error("No valid listing found");
    }

    return txResult;
  }


  return (
    <div className={styles.nftCard}>
      {loadingListing ? (
        <Box>Loading...</Box>
      ) : (
        <div>
         
          {/* Display the image if available */}
          {listing?.asset?.image ? (
            <Image src={listing.asset.image} alt={String(listing.asset.name)} width="100px" height="100px" />
          ) : (
            <p>No image available</p>
          )}
          <p className={styles.cardName}>{listing?.asset?.name}</p>
          <Popover>
  <PopoverTrigger>
    <Button
    className={styles.code}
    backgroundColor={"blue.200"}
   
    > Description
    
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton bgColor={"green.200"} />
    <PopoverHeader backgroundColor={"blue.200"}><p className={styles.cardName}>{listing?.asset?.name}</p></PopoverHeader>
    <PopoverBody backgroundColor={"blue.100"}><div className={styles.cardName}>{listing?.asset?.description}</div></PopoverBody>
  </PopoverContent>
</Popover>
          
          <p>
            Price: {listing?.currencyValuePerToken.displayValue}{" "}
            {listing?.currencyValuePerToken.symbol}
          </p>
          {!address ? (
            <p>Please login to buy</p>
          ) : (
           <><Web3Button theme={defaultDarkTheme}
           className={styles.mainButton}
                  contractAddress={MARKETPLACE_ADDRESS}
                  action={() => buyNFT()}
                  
                >
                  Buy Now
                </Web3Button></>
             
            
          )}
        </div>
      )}
    </div>
  );
}
