import * as React from 'react'

import {
  chakra,
  omitThemingProps,
  HTMLChakraProps,
  ChakraProps,
  ThemingProps,
  SystemProps,
  useMultiStyleConfig,
  useBreakpointValue,
  SystemStyleObject,
  IconButton,
  IconButtonProps,
  useDisclosure,
  Portal,
  ResponsiveValue,
  forwardRef,
} from '@chakra-ui/react'
import { cx, dataAttr } from '@chakra-ui/utils'
import { HamburgerIcon } from '@chakra-ui/icons'
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'

import { SidebarProvider, useSidebarContext } from './use-sidebar'
import { SidebarStylesProvider, useSidebarStyles } from './sidebar-context'

export interface SidebarProps
  extends Omit<HTMLMotionProps<'div'>, 'color' | 'transition'>,
    Omit<ChakraProps, 'css'>,
    ThemingProps<'Sidebar'> {
  /**
   * Spacing between child elements.
   */
  spacing?: SystemProps['margin']
  /**
   * Define breakpoints for the mobile nav.
   *
   * @default object { sm: true, lg: false }
   */
  breakpoints?: Record<string, boolean>

  isOpen?: boolean

  onOpen?: () => void

  onClose?: () => void
}

const MotionBox = chakra(motion.nav)

export const Sidebar = forwardRef<SidebarProps, 'nav'>((props, ref) => {
  const styles = useMultiStyleConfig('Sidebar', props)

  const { variant, size } = props

  const isCondensed = variant === 'condensed'

  const {
    spacing = 4,
    children,
    breakpoints = { base: true, lg: false },
    className,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    ...containerProps
  } = omitThemingProps(props)

  const isMobile = useBreakpointValue(breakpoints, {
    fallback: undefined,
  })

  const isInitial = typeof isMobile === 'undefined'
  const isCollapsible = isMobile && !isCondensed

  const disclosure = useDisclosure({
    defaultIsOpen: !isCollapsible,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const { isOpen, onClose, onOpen } = disclosure

  React.useEffect(() => {
    if (isInitial || isCondensed) {
      // make sure we do not show an initial animation or when this is a condensed sidebar
      return
    }
    isMobile ? onClose() : onOpen()
  }, [isInitial, isCondensed, isMobile])

  const containerStyles: SystemStyleObject = {
    '& > *:not(style) ~ *:not(style, .saas-resize-handle)': {
      marginTop: spacing,
    },
    display: 'flex',
    flexDirection: 'column',
    ...(isCollapsible
      ? {
          position: 'absolute',
          zIndex: 'modal',
          top: 0,
          left: { base: '-100%', lg: '0' },
          bottom: 0,
        }
      : {
          position: 'relative',
        }),
  }

  const context = {
    ...disclosure,
    isMobile,
    variant,
    size,
  }

  return (
    <SidebarProvider value={context}>
      <SidebarStylesProvider value={styles}>
        <MotionBox
          ref={ref}
          initial={false}
          animate={!isInitial && (!isCollapsible || isOpen ? 'enter' : 'exit')}
          variants={{
            enter: {
              left: 0,
              transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
            },
            exit: {
              left: '-100%',
            },
          }}
          __css={{
            ...containerStyles,
            ...styles.container,
          }}
          {...containerProps}
          id={disclosure.getDisclosureProps().id}
          className={cx('saas-sidebar', className)}
          data-condensed={dataAttr(isCondensed)}
        >
          {children}
        </MotionBox>
      </SidebarStylesProvider>
    </SidebarProvider>
  )
})

Sidebar.displayName = 'Sidebar'

export interface SidebarToggleButtonProps
  extends Omit<IconButtonProps, 'aria-label'> {}

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (
  props
) => {
  const sidebar = useSidebarContext()

  const styles = useSidebarStyles()

  const buttonStyles = {
    position: 'fixed',
    top: 3,
    left: 4,
    ...styles.toggle,
  }

  return sidebar.isMobile ? (
    <chakra.div height="8">
      <IconButton
        variant="ghost"
        icon={<HamburgerIcon />}
        {...sidebar.getButtonProps(props)}
        {...props}
        aria-label="Toggle sidebar"
        sx={buttonStyles}
      />
    </chakra.div>
  ) : null
}

export interface SidebarOverlayProps extends ChakraProps {}

export const SidebarOverlay: React.FC<SidebarOverlayProps> = (props) => {
  const { onClose, isOpen, isMobile } = useSidebarContext()

  const styles = useSidebarStyles()

  return (
    <Portal>
      <AnimatePresence>
        {isMobile && isOpen && (
          <MotionBox
            animate={isOpen ? 'enter' : 'exit'}
            initial="exit"
            variants={{
              enter: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            position="fixed"
            top="0"
            right="0"
            bottom="0"
            left="0"
            zIndex="overlay"
            {...props}
            onClick={onClose}
            __css={styles.overlay}
          />
        )}
      </AnimatePresence>
    </Portal>
  )
}

SidebarToggleButton.displayName = 'SidebarToggleButton'

export interface SidebarSectionProps extends HTMLChakraProps<'div'> {
  direction?: ResponsiveValue<'row' | 'column'>
}

export const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  const { direction = 'column', ...rest } = props
  const styles = useSidebarStyles()
  const sectionStyles = {
    display: 'flex',
    flexDirection: direction,
    ...styles.section,
  }

  return (
    <chakra.div
      __css={sectionStyles}
      {...rest}
      className={cx('saas-sidebar__section', props.className)}
    />
  )
}

SidebarSection.displayName = 'SidebarSection'
