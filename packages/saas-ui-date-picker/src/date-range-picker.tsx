import * as React from 'react'
import {
  DateRangePickerStateOptions,
  useDateRangePickerState,
} from '@react-stately/datepicker'
import { useDateRangePicker } from '@react-aria/datepicker'
import {
  useMultiStyleConfig,
  Popover,
  ThemingProps,
  PopoverProps,
} from '@chakra-ui/react'
import {
  DatePickerProvider,
  DatePickerStylesProvider,
} from './date-picker-context'

import { useLocale } from '@react-aria/i18n'

import { DateRangeValue } from './types'
import { Calendar, getLocalTimeZone } from '@internationalized/date'
import { datePickerStyleConfig } from './date-picker-styles'
import { DatePickerDialog } from './date-picker-dialog'

export interface DateRangePickerContainerProps
  extends ThemingProps<'SuiDatePicker'>,
    Omit<PopoverProps, 'variant' | 'size'>,
    Omit<DateRangePickerStateOptions, 'value' | 'onChange' | 'closeOnSelect'> {
  value?: DateRangeValue
  onChange(value?: DateRangeValue): void
  locale?: string
  hourCycle?: 12 | 24
  timeZone?: string
  closeOnSelect?: boolean
  createCalendar?(name: string): Calendar
}

export const DateRangePickerContainer: React.FC<
  DateRangePickerContainerProps
> = (props) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    createCalendar,
    ...rest
  } = props
  const {
    locale: localeProp,
    hourCycle = 12,
    minValue,
    maxValue,
    timeZone = getLocalTimeZone(),
    granularity = 'day',
    closeOnSelect,
  } = props

  const { locale } = useLocale()

  const styles = useMultiStyleConfig('SuiDatePicker', {
    styleConfig: datePickerStyleConfig,
    ...props,
  })

  const state = useDateRangePickerState({
    /* @ts-ignore doesn't accept null in strict mode, but it's supported */
    value: valueProp,
    defaultValue,
    minValue,
    maxValue,
    onChange,
    shouldCloseOnSelect: closeOnSelect || granularity === 'day',
  })

  const datePickerRef = React.useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationDetails,
    validationErrors,
  } = useDateRangePicker(
    {
      ['aria-label']: 'Date Range Picker',
      ...rest,
    },
    state,
    datePickerRef
  )

  const context = {
    state,
    locale: localeProp || locale,
    hourCycle,
    timeZone,
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
    datePickerRef,
    isInvalid,
    validationDetails,
    validationErrors,
    createCalendar,
  }

  return (
    <DatePickerProvider value={context}>
      <DatePickerStylesProvider value={styles}>
        <Popover
          {...props}
          onOpen={() => state.setOpen(true)}
          onClose={() => state.setOpen(false)}
        />
      </DatePickerStylesProvider>
    </DatePickerProvider>
  )
}

export interface DateRangePickerProps extends DateRangePickerContainerProps {}

export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  return <DateRangePickerContainer {...props} />
}

export const DateRangePickerDialog = DatePickerDialog
