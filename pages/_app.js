import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';
import '@fontsource/poppins';
import colours from '../styles/colours';

const theme = extendTheme({
  colors: colours,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
