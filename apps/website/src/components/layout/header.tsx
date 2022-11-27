import * as React from 'react'

import { Box, BoxProps, Container, HStack } from '@chakra-ui/react'
import Navigation from './navigation'
import Logo from './logo'
import { useScroll } from 'framer-motion'

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="slow"
      boxShadow={y > height ? 'md' : ''}
      bg="whiteAlpha.900"
      _dark={{
        bg: 'transparent',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bottom: '-20px',
        backdropFilter: 'blur(16px)',
        mask: 'linear-gradient(to-b, black, transparent)',
        WebkitMask: 'linear-gradient(to bottom, black 60px, transparent)',
      }}
      {...props}
    >
      <Box zIndex="1" position="relative" borderBottomWidth="1px">
        <Container maxW="container.2xl" px="8" py="3">
          <HStack width="full" align="center">
            <Logo
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault()

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              }}
            />
            <Navigation />
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Header
