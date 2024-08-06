import { extendTheme } from '@chakra-ui/react';
import { colors } from './variants';

const theme = extendTheme({
  fonts: {
    heading: 'Pretendard-Regular',
    body: 'Pretendard-Regular',
  },
  styles: {
    global: {
      body: {
        bg: colors.backgroundColor,
      },
    },
  },
});

export default theme;
