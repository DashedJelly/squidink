import { Box, Container, Grid, GridItem, Heading, Select, Stack, Image, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "../styles/viewer.module.css";

const Builder = () => {
  const [selectedAccessories, setSelectedAccessories] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedBubbles, setSelectedBubbles] = useState("");
  const [selectedFace, setSelectedFace] = useState("");
  const [selectedHeadwear, setSelectedHeadwear] = useState("");
  const [selectedInk, setSelectedInk] = useState("");
  const [selectedPatches, setSelectedPatches] = useState("");
  const [selectedSkin, setSelectedSkin] = useState("");
  const [selectedStrokes, setSelectedStrokes] = useState("");
  const [selectedTentacle, setSelectedTentacle] = useState("");

  const [AccessoriesOptions, setAccessoriesOptions] = useState<string[]>([]);
  const [BackgroundOptions, setBackgroundOptions] = useState<string[]>([]);
  const [BubblesOptions, setBubblesOptions] = useState<string[]>([]);
  const [FaceOptions, setFaceOptions] = useState<string[]>([]);
  const [HeadwearOptions, setHeadwearOptions] = useState<string[]>([]);
  const [InkOptions, setInkOptions] = useState<string[]>([]);
  const [PatchesOptions, setPatchesOptions] = useState<string[]>([]);
  const [SkinOptions, setSkinOptions] = useState<string[]>([]);
  const [StrokesOptions, setStrokesOptions] = useState<string[]>([]);
  const [TentacleOptions, setTentacleOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadOptions = async (file: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
      try {
        const data = await import(`../public/${file}/${file}.json`);
        const options = data.default.map((trait: { name: string }) => trait.name);
        setState(options);
        console.log(`Loaded options for ${file}:`, options); // Debugging line
      } catch (error) {
        console.error(`Error loading options for ${file}:`, error);
      }
    };

    
    loadOptions("Background", setBackgroundOptions);
    loadOptions("Skin", setSkinOptions);
    loadOptions("Strokes", setStrokesOptions);
    loadOptions("Tentacle", setTentacleOptions);
    loadOptions("Bubbles", setBubblesOptions);
    loadOptions("Face", setFaceOptions);
    loadOptions("Headwear", setHeadwearOptions);
    loadOptions("Ink", setInkOptions);
    loadOptions("Patches", setPatchesOptions);
    loadOptions("Accessories", setAccessoriesOptions);
  }, []);

  return (
    <Container paddingTop={109}>
      <div className={styles.container}>
        <Stack spacing={4}>
          <Heading color="white" fontFamily="Franklin_notes">TRAITS:Previewer</Heading>
          <Grid gridTemplateRows={'100px 3fr100px'}
            gridTemplateColumns={'300px 2fr'}
            h='260px'
            gap='1'
            
            fontWeight='bold'>
            <Stack
            fontFamily={"franklin_notes"}
              className={styles.heroCta3}
              spacing={1}>
              <Wrap spacing="10px" justify="center">
                <WrapItem>
                  <Select value={selectedBackground} onChange={(e) => setSelectedBackground(e.target.value)} bg="purple.200">
                    <option value="">Select Background</option>
                    {BackgroundOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedSkin} onChange={(e) => setSelectedSkin(e.target.value)} bg="purple.200">
                    <option value="">Select Skin</option>
                    {SkinOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedFace} onChange={(e) => setSelectedFace(e.target.value)} bg="purple.200">
                    <option value="">Select Face</option>
                    {FaceOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedHeadwear} onChange={(e) => setSelectedHeadwear(e.target.value)} bg="purple.200">
                    <option value="">Select Headwear</option>
                    {HeadwearOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedInk} onChange={(e) => setSelectedInk(e.target.value)} bg="purple.200">
                    <option value="">Select Ink</option>
                    {InkOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedPatches} onChange={(e) => setSelectedPatches(e.target.value)} bg="purple.200">
                    <option value="">Select Patches</option>
                    {PatchesOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedStrokes} onChange={(e) => setSelectedStrokes(e.target.value)} bg="purple.200">
                    <option value="">Select Strokes</option>
                    {StrokesOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedTentacle} onChange={(e) => setSelectedTentacle(e.target.value)} bg="purple.200">
                    <option value="">Select Tentacle</option>
                    {TentacleOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedAccessories} onChange={(e) => setSelectedAccessories(e.target.value)} bg="purple.200">
                    <option value="">Select Accessories</option>
                    {AccessoriesOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                </WrapItem>
                <WrapItem>
                  <Select value={selectedBubbles} onChange={(e) => setSelectedBubbles(e.target.value)} bg="purple.200">
                    <option value="">Select Bubbles</option>
                    {BubblesOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                 </Select>
                </WrapItem>
              </Wrap>
            </Stack>
          </Grid>
        </Stack>
        <Grid
          templateRows={['auto', 'auto', 'auto', 'auto']}
          templateColumns={['auto', 'auto', 'auto', 'auto']}
          gap={['1', '1', '1', '1']}
          color='blackAlpha.700'
          fontWeight='bold'
          margin='85px'
          >
          <Divider/>
        <GridItem borderBlockEndColor={"purple.200"} bg='black' pb={10} pl={1} pr={1} pt={-1} area={'Viewer'}>
          <Box position="relative" width="300px" height="300px" margin="9px auto 0">
            {selectedBackground && <Image src={`/Background/${selectedBackground}.png`} alt="Background" style={{ position: 'absolute' }} width={300} height={300}/>}
            {selectedSkin && <Image src={`/Skin/${selectedSkin}.png`} alt="Skin" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedFace && <Image src={`/Face/${selectedFace}.png`} alt="Face" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedHeadwear && <Image src={`/Headwear/${selectedHeadwear}.png`} alt="Headwear" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedInk && <Image src={`/Ink/${selectedInk}.png`} alt="Ink" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedPatches && <Image src={`/Patches/${selectedPatches}.png`} alt="Patches" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedStrokes && <Image src={`/Strokes/${selectedStrokes}.png`} alt="Strokes" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedTentacle && <Image src={`/Tentacle/${selectedTentacle}.png`} alt="Tentacle" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedAccessories && <Image src={`/Accessories/${selectedAccessories}.png`} alt="Accessories" style={{ position: 'absolute' }} width={300} height={300} />}
            {selectedBubbles && <Image src={`/Bubbles/${selectedBubbles}.png`} alt="Bubbles" style={{ position: 'absolute' }} width={300} height={300} />}
          </Box>
        </GridItem>
      </Grid>
    </div>
  </Container>
);
};

export default Builder;  
