import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black", // Set background color to black
        color: "black", // Set text color to white for better visibility on black background
      },
    },
  },
  components: {
    Popover: {
      baseStyle: {
        content: {
          bg: "black", // Set the background color of the pop-up card to gray.800
          color: "black", // Set text color to white inside the pop-up card
        },
      },
    },
  },
});

export default theme;
