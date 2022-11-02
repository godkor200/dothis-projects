import { Box, chakra } from '@chakra-ui/react';


const OnlyPcContainer = chakra(Box, {
  baseStyle: {
    width: '100%',

    maxW: '960px',
    marginX: 'auto',
  },
});
export default OnlyPcContainer;
