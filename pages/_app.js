import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';
import '@fontsource/poppins';
import colours from '../styles/colours';
import { Provider } from 'react-redux';
import { store, wrapper } from '../src/redux/store';

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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
};

export default wrapper.withRedux(MyApp);
