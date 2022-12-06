import dothisTheme from '../lib/styles/dothisTheme';
import { ChakraProvider } from '@chakra-ui/react';

import { Global } from '@emotion/react';
import { globalStyle } from '../lib';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story, context)=> (<>
    <Global style={globalStyle} />
    <ChakraProvider theme={dothisTheme} resetCSS>
      <Story {...context}/>
    </ChakraProvider>
  </>)
]