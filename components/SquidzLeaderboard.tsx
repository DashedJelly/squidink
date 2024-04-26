import React, { useState, useEffect } from 'react';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Divider, Table, Th, Thead, Tr } from '@chakra-ui/react';


function Leaderboard() {
  const { contract } = useContract("0x931E82341BDE35E3e3AAa1f2E025801BF360c190");
  const { data, isLoading } = useContractRead(contract, "viewLeaderboards");

  // State to store leaderboard data
  const [leaderboardData, setLeaderboardData] = useState({
    owners: [],
    totalStaked: [],
    totalClaimed: []
  });

  useEffect(() => {
    if (!isLoading && data) {
      try {
        // Extracting data from the contract response
        const owners = data[0].map((address: string) => `${address.slice(0, 5)}...${address.slice(-5)}`);
        const totalStaked = data[1].map((entry: any) => entry.toString());
        const totalClaimed = data[2].map((entry: any) => {
          // Convert Wei to Ether
          const claimedWei = parseFloat(entry.toString());
          const claimedEther = claimedWei / Math.pow(10, 18); // 1 Ether = 10^18 Wei
          return claimedEther.toFixed(2); // Return with 2 decimal places
        });
  
        // Create an array of objects for easier sorting
        const leaderboardEntries = owners.map((address: any, index: string | number) => ({
          address,
          totalStaked: totalStaked[index],
          totalClaimed: totalClaimed[index]
        }));

        // Sort the entries based on totalClaimed, in descending order
        leaderboardEntries.sort((a: { totalClaimed: number; }, b: { totalClaimed: number; }) => b.totalClaimed - a.totalClaimed);

        // Extract the sorted data into state
        setLeaderboardData({
          owners: leaderboardEntries.map((entry: { address: any; }) => entry.address),
          totalStaked: leaderboardEntries.map((entry: { totalStaked: any; }) => entry.totalStaked),
          totalClaimed: leaderboardEntries.map((entry: { totalClaimed: any; }) => entry.totalClaimed)
        });
      } catch (error) {
        console.error("Error processing contract data:", error);
      }
    }
  }, [isLoading, data]);

  // Slice the leaderboardData to display only the top 5 entries
  const top5Leaderboard = {
    owners: leaderboardData.owners.slice(0, 5),
    totalStaked: leaderboardData.totalStaked.slice(0, 5),
    totalClaimed: leaderboardData.totalClaimed.slice(0, 5)
  };

  return (
    <div>
      
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Address</Th>
            
            <Th>Staked</Th>
            <Th>$JDOH Claimed</Th>
            
          </Tr>
        </Thead>
        
        <tbody>
            
          {/* Render each address with its corresponding reward and amount staked */}
          {top5Leaderboard.owners.map((address, index) => (
            <tr key={index}>
                
              <td>{address}</td>
              <td>{top5Leaderboard.totalStaked[index]}</td>
              <td>{top5Leaderboard.totalClaimed[index]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Leaderboard;
