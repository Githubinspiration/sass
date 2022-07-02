import * as React from 'react'

import {
  chakra,
  forwardRef,
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuListProps,
  MenuItemOption,
  MenuOptionGroup,
  MenuOptionGroupProps,
  Button,
  ButtonProps,
  omitThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
  useFormControl,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { cx, __DEV__ } from '@chakra-ui/utils'

interface Option {
  value: string
  label?: string
}

interface SelectOptions {
  /**
   * An array of options
   * If you leave this empty the children prop will be rendered.
   */
  options?: Option[]
  /**
   * Props passed to the MenuList.
   */
  menuListProps?: MenuListProps
  /**
   * Customize how the value is rendered.
   * @type (value?: string[]) => React.ReactElement
   */
  renderValue?: (value?: string[]) => React.ReactElement | undefined
  /**
   * Enable multiple select.
   */
  multiple?: boolean
}

export interface SelectProps
  extends Omit<MenuProps, 'children'>,
    Pick<ButtonProps, 'isDisabled' | 'leftIcon' | 'rightIcon'>,
    Pick<MenuOptionGroupProps, 'onChange'>,
    SelectOptions {}

const SelectButton = forwardRef((props, ref) => {
  const styles = useMultiStyleConfig('Input', props)

  /* @ts-ignore */
  const focusStyles = styles.field._focusVisible

  const height = styles.field.h || styles.field.height

  const buttonStyles: SystemStyleObject = {
    fontWeight: 'normal',
    textAlign: 'left',
    color: 'inherit',
    _active: {
      bg: 'transparent',
    },
    minH: height,
    _focus: focusStyles,
    _expanded: focusStyles,
    ...styles.field,
    h: 'auto',
  }

  // Using a Button, so we can simply use leftIcon and rightIcon
  return <MenuButton as={Button} {...props} ref={ref} sx={buttonStyles} />
})

if (__DEV__) {
  SelectButton.displayName = 'SelectButton'
}

export const Select = forwardRef<SelectProps, 'select'>((props, ref) => {
  const {
    name,
    options,
    children,
    onChange,
    defaultValue,
    value,
    placeholder,
    isDisabled,
    leftIcon,
    rightIcon = <ChevronDownIcon />,
    multiple,
    size,
    variant,
    menuListProps,
    renderValue = (value) => value?.join(', '),
    ...rest
  } = props
  const menuProps = omitThemingProps(rest)

  const [currentValue, setCurrentValue] = React.useState(value || defaultValue)

  const controlProps = useFormControl({ name } as HTMLChakraProps<'input'>)

  const handleChange = (value: string | string[]) => {
    setCurrentValue(value)
    onChange?.(value)
  }

  const buttonProps = {
    isDisabled,
    leftIcon,
    rightIcon,
    size,
    variant,
  }

  const getDisplayValue = React.useCallback(
    (value: string) => {
      if (!options) {
        return value
      }

      for (const option of options) {
        if (option.label && option.value === value) {
          return option.label
        }
      }

      return value
    },
    [options]
  )

  const displayValue = currentValue
    ? (Array.isArray(currentValue) ? currentValue : [currentValue]).map(
        getDisplayValue
      )
    : []

  return (
    <Menu {...menuProps} closeOnSelect={!multiple}>
      <chakra.div className={cx('saas-select')}>
        <SelectButton ref={ref} {...buttonProps}>
          {renderValue(displayValue) || placeholder}
        </SelectButton>
        <MenuList maxH="60vh" overflowY="auto" {...menuListProps}>
          <MenuOptionGroup
            defaultValue={
              (defaultValue || value) as string | string[] | undefined
            }
            onChange={handleChange}
            type={multiple ? 'checkbox' : 'radio'}
          >
            {options
              ? options.map(({ value, label, ...rest }, i) => (
                  <MenuItemOption key={i} value={value} {...rest}>
                    {label || value}
                  </MenuItemOption>
                ))
              : children}
          </MenuOptionGroup>
        </MenuList>
        <chakra.input
          {...controlProps}
          name={name}
          type="hidden"
          value={currentValue}
          className="saas-select__input"
        />
      </chakra.div>
    </Menu>
  )
})

if (__DEV__) {
  Select.displayName = 'Select'
}
