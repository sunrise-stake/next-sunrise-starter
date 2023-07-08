import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Titillium Web, sans-serif',
    primary: 'Satoshi, sans-serif',
    colors: {
      primary: '#3f5d4e',
      secondary: '#f2f2f2',
    },
  },
});

export { theme };
