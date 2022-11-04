import * as React from 'react'
import { useRef } from 'react'
import {
  useDatePickerState,
  DatePickerStateOptions,
  DatePickerState,
} from '@react-stately/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { useLocale } from '@react-aria/i18n'
import {
  ThemingProps,
  PopoverProps,
  useMultiStyleConfig,
  Popover,
  useControllableState,
} from '@chakra-ui/react'
import {
  DatePickerProvider,
  DatePickerStylesProvider,
} from './date-picker-context'

import { DateValue, FormattedValue } from './types'

import { datePickerStyleConfig } from './date-picker-styles'
import { getLocalTimeZone } from '@internationalized/date'
import { MaybeFunction, runIfFn } from '@chakra-ui/utils'

export interface DatePickerContainerProps
  extends ThemingProps<'DatePicker'>,
    Omit<
      DatePickerStateOptions,
      'value' | 'defaultValue' | 'minValue' | 'maxValue' | 'onChange'
    > {
  value?: DateValue | null
  minValue?: DateValue
  maxValue?: DateValue
  defaultValue?: DateValue
  onChange?(value: DateValue | null): void
  locale?: string
  timeZone?: string
  children: MaybeFunction<React.ReactNode, [DatePickerState]>
}

export const DatePickerContainer = (props: DatePickerContainerProps) => {
  const {
    children,
    value: valueProp,
    minValue,
    maxValue,
    defaultValue,
    onChange,
    ...rest
  } = props

  const {
    locale: localeProp,
    timeZone = getLocalTimeZone(),
    hourCycle = 12,
  } = props

  const { locale } = useLocale()

  const styles = useMultiStyleConfig('DatePicker', {
    styleConfig: datePickerStyleConfig,
    ...props,
  })

  const [value, setValue] = useControllableState<DateValue | null>({
    defaultValue,
    value: valueProp ? valueProp : null,
    onChange,
  })

  const state = useDatePickerState({
    value: value ? value : undefined,
    minValue,
    maxValue,
    defaultValue,
    onChange: setValue,
    ...rest,
  })

  const datePickerRef = useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    descriptionProps,
    errorMessageProps,
    calendarProps,
  } = useDatePicker(
    {
      ['aria-label']: 'Date Picker',
      value: value ? value : undefined,
      minValue,
      maxValue,
      onChange: setValue,
      ...rest,
    },
    state,
    datePickerRef
  )

  const context = {
    locale: localeProp || locale,
    state,
    hourCycle,
    timeZone,
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
    datePickerRef,
  }

  return (
    <DatePickerProvider value={context}>
      <DatePickerStylesProvider value={styles}>
        {runIfFn(children, state)}
      </DatePickerStylesProvider>
    </DatePickerProvider>
  )
}

export interface DatePickerProps<
  TDateValue = DateValue,
  TFormattedValue = FormattedValue
> extends Omit<DatePickerContainerProps, 'children'>,
    Omit<PopoverProps, 'variant' | 'size'> {}

/**
 * DatePicker
 *
 * Allow users to select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    children,
    arrowPadding,
    arrowShadowColor,
    arrowSize,
    autoFocus,
    boundary,
    closeDelay,
    closeOnBlur,
    closeOnEsc,
    computePositionOnMount,
    defaultIsOpen,
    direction,
    eventListeners,
    flip,
    gutter,
    initialFocusRef,
    isLazy,
    lazyBehavior,
    modifiers,
    offset,
    openDelay,
    placement,
    preventOverflow,
    returnFocusOnClose,
    strategy,
    trigger,
    ...containerProps
  } = props

  const popoverProps = {
    arrowPadding,
    arrowShadowColor,
    arrowSize,
    autoFocus,
    boundary,
    closeDelay,
    closeOnBlur,
    closeOnEsc,
    computePositionOnMount,
    defaultIsOpen,
    direction,
    eventListeners,
    flip,
    gutter,
    initialFocusRef,
    isLazy,
    lazyBehavior,
    modifiers,
    offset,
    openDelay,
    placement,
    preventOverflow,
    returnFocusOnClose,
    strategy,
    trigger,
  }

  return (
    <DatePickerContainer {...containerProps}>
      {(state) => {
        return (
          <Popover
            {...popoverProps}
            onOpen={() => state.setOpen(true)}
            onClose={() => state.setOpen(false)}
          >
            {children}
          </Popover>
        )
      }}
    </DatePickerContainer>
  )
}

/**
 * DatePickerStatic
 *
 * Allow users to select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker
 */
export interface DatePickerStaticProps extends DatePickerContainerProps {}

export const DatePickerStatic: React.FC<DatePickerStaticProps> = (props) => {
  const { children, ...rest } = props
  return <DatePickerContainer {...rest}>{children}</DatePickerContainer>
}
