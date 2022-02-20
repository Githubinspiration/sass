import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  return {
    container: {
      rounded: 'lg',
      bg: mode('white', 'whiteAlpha.100')(props),
      boxShadow: 'sm',
      borderWidth: '1px',
      borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
    },
    header: {
      p: 4,
    },
    media: {
      mb: 2,
    },
    title: {
      fontSize: 'xl',
      fontWeight: 'semibold',
    },
    subtitle: {
      color: mode('gray.400', 'gray.300')(props),
    },
    body: {
      p: 4,
    },
    footer: {
      p: 4,
    },
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  const borderColor = c && mode(`${c}.500`, `${c}.500`)(props)

  return {
    container: {
      bg: 'transparent',
      boxShadow: 'none',
      borderWidth: '1px',
      borderColor: borderColor,
    },
  }
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  const bg = c
    ? mode(`${c}.500`, `${c}.500`)(props)
    : mode('blackAlpha.100', 'whiteAlpha.100')(props)

  const color = c ? 'white' : 'inherit'

  return {
    container: {
      border: 'none',
      boxShadow: 'none',
      bg,
      color,
    },
  }
}

export default {
  parts: ['container', 'header', 'title', 'subtitle', 'body', 'footer'],
  baseStyle,
  variants: {
    outline: variantOutline,
    solid: variantSolid,
  },
}
