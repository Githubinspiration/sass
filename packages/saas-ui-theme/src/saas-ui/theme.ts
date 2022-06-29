import {
  extendTheme,
  withDefaultColorScheme,
  ChakraTheme,
} from '@chakra-ui/react'

import { baseTheme } from '../base/theme'

import styles from './styles'
import colors from './foundations/colors'
import { fonts, fontSizes, textStyles } from './foundations/typography'
import sizes from './foundations/sizes'
import shadows from './foundations/shadows'
import semanticTokens from './foundations/semantic-tokens'
import * as components from './components'

const config = {
  useSystemColorMode: false,
}

export const theme = extendTheme(
  {
    config,
    colors,
    fonts,
    fontSizes,
    textStyles,
    sizes,
    styles,
    components,
    shadows,
    semanticTokens,
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Radio', 'Switch', 'Checkbox'],
  }),
  baseTheme
) as ChakraTheme
