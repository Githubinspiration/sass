import * as React from 'react'
import { FieldButton } from './button'
import { DateRangePickerCalendar } from './date-range-calendar'
import { DateField, TimeField } from './date-field'
import {
  DatePickerAnchor,
  DatePickerDialog,
  DatePickerTrigger,
} from './date-picker-dialog'
import { CalendarIcon } from '@chakra-ui/icons'
import {
  chakra,
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from '@chakra-ui/react'
import { useDateRangePickerContext } from './date-picker-context'
import {
  DateRangePicker,
  DateRangePickerContainerProps,
} from './date-range-picker'
import { SegmentedInput } from './segmented-input'

export interface DateRangeInputProps extends DateRangePickerContainerProps {}

/**
 * DateRangeInput
 *
 * A Date form input with Calendar popover to allow users to enter or select a date range and time.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
  const { children, ...rest } = props
  return (
    <DateRangePicker placement="bottom-start" {...rest}>
      <DateRangePickerInput />
      <DatePickerDialog>
        <>
          <DateRangePickerCalendar />
          {children}
        </>
      </DatePickerDialog>
    </DateRangePicker>
  )
}

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
const DateRangePickerInput: React.FC<DatePickerInputProps> = (props) => {
  const { calendarIcon, size, variant, ...rest } = props

  const {
    state,
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
          <DateField {...startFieldProps} />
          <chakra.span aria-hidden="true" paddingX="1">
            –
          </chakra.span>
          <DateField {...endFieldProps} />
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
