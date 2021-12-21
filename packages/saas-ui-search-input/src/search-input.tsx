import * as React from 'react'

import {
  forwardRef,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  InputProps,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

interface SearchInputProps
  extends Omit<InputProps, 'size' | 'variant'>,
    ThemingProps<'SearchInput'> {
  /**
   * The placeholder text for the input
   * @type string
   * @default Search
   */
  placeholder?: string
  /**
   * The icon to render before the input text
   * @type React.ReactNode
   */
  icon?: React.ReactNode
  /**
   * The icon to render in the reset button
   * @type React.ReactNode
   */
  resetIcon?: React.ReactElement
  /**
   * Callback to trigger when the reset button is clicked or escape key is pressed
   */
  onReset?: () => void
}

export const SearchInput = forwardRef<SearchInputProps, 'div'>((props, ref) => {
  const { value, size, variant, icon, resetIcon, onReset, ...inputProps } =
    props
  const styles = useMultiStyleConfig('SearchInput', props)

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && onReset) {
        onReset()
      }
    },
    [onReset]
  )

  return (
    <InputGroup size={size}>
      <InputLeftElement>{icon || <SearchIcon />}</InputLeftElement>
      <Input
        type="text"
        size={size}
        value={value}
        ref={ref}
        sx={styles.input}
        onKeyDown={onKeyDown}
        {...inputProps}
      />
      <InputRightElement>
        {value && (
          <IconButton
            onClick={onReset}
            size="xs"
            variant="ghost"
            aria-label="Reset search"
            icon={resetIcon || <CloseIcon />}
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
})

SearchInput.defaultProps = {
  placeholder: 'Search',
}
