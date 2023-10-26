import * as React from 'react'
import { FieldButton } from './button'
import { DateRangePickerCalendar } from './date-range-calendar'
import { DateField, TimeField } from './date-field'
import {
  DatePickerAnchor,
  DatePickerDialog,
  DatePickerTrigger,
} from './date-picker-dialog'
import { CalendarIcon } from './icons'
import {
  chakra,
  forwardRef,
  InputGroup,
  InputGroupProps,
  InputRightElement,
  Portal,
  SystemCSSProperties,
} from '@chakra-ui/react'
import { useDateRangePickerContext } from './date-picker-context'
import {
  DateRangePicker,
  DateRangePickerContainerProps,
} from './date-range-picker'
import { SegmentedInput } from './segmented-input'

export interface DateRangeInputProps extends DateRangePickerContainerProps {
  /**
   * The icon to use in the calendar button
   */
  calendarIcon?: React.ReactNode
  /**
   * If `true`, the `DatePickerDialog` will open in a portal.
   * Also accepts a `z-index` value.
   */
  portal?: boolean | SystemCSSProperties['zIndex']
}

/**
 * DateRangeInput
 *
 * A Date form input with Calendar popover to allow users to enter or select a date range and time.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DateRangeInput = forwardRef<DateRangeInputProps, 'div'>(
  (props, ref) => {
    const { children, size, variant, calendarIcon, portal, ...rest } = props

    const zIndex = typeof portal === 'boolean' ? undefined : portal

    const dialog = (
      <DatePickerDialog zIndex={zIndex}>
        <>
          <DateRangePickerCalendar />
          {children}
        </>
      </DatePickerDialog>
    )

    return (
      <DateRangePicker placement="bottom-start" {...rest}>
        <DateRangePickerInput
          ref={ref}
          calendarIcon={calendarIcon}
          size={size}
          variant={variant}
        />
        {portal ? <Portal>{dialog}</Portal> : dialog}
      </DateRangePicker>
    )
  }
)

interface DatePickerInputProps extends InputGroupProps {
  calendarIcon?: React.ReactNode
}

/**
 * DateRangeInput
 *
 * A Date form input with Calendar popover to allow users to enter or select a date range and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
const DateRangePickerInput = forwardRef<DatePickerInputProps, 'div'>(
  (props, ref) => {
    const { calendarIcon, size, variant, ...rest } = props

    const {
      state,
      locale,
      groupProps,
      startFieldProps,
      endFieldProps,
      buttonProps,
      datePickerRef,
    } = useDateRangePickerContext()

    const themeProps = { size, variant }

    return (
      <InputGroup
        {...rest}
        {...groupProps}
        {...themeProps}
        ref={datePickerRef}
        width="auto"
        display="inline-flex"
      >
        <DatePickerAnchor>
          <SegmentedInput {...themeProps}>
            <DateField locale={locale} {...startFieldProps} ref={ref} />
            <chakra.span aria-hidden="true" paddingX="1">
              –
            </chakra.span>
            <DateField locale={locale} {...endFieldProps} />
          </SegmentedInput>
        </DatePickerAnchor>
        <InputRightElement py="1">
          <DatePickerTrigger>
            <FieldButton
              variant="ghost"
              flex="1"
              height="100%"
              {...buttonProps}
              isActive={state.isOpen}
            >
              {calendarIcon || <CalendarIcon />}
            </FieldButton>
          </DatePickerTrigger>
        </InputRightElement>
      </InputGroup>
    )
  }
)
