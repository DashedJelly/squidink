import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "purple.900", // Set background color to black
        color: "teal.700", // Set text color to white for better visibility on black background
      },
    },
  },
  components: {
    Popover: {
      baseStyle: {
        content: {
          bg: "gray.800", // Set the background color of the pop-up card to gray.800
          color: "white", // Set text color to white inside the pop-up card
        },
      },
    },
  },
});

export default theme;
