import './App.css'
import { ColorScheme, ColorSchemeProvider, Flex, MantineProvider } from '@mantine/core';
import CV from './CV/CV';
import Editor from './Editor/Editor';
import Header from './Header/Header';
import { useState } from 'react';
import { Footer } from './Footer/Footer';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ fontFamily: 'Montserrat', primaryColor: 'teal', colorScheme }} withGlobalStyles withNormalizeCSS>
        <Header />
        <Flex className='container' justify='space-between'>
          <Editor />
          <CV />
        </Flex>
        <Footer />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
