import * as React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { forwardRef } from '@chakra-ui/react'

import { Form, FormProps } from './form'
import { FormLayout } from './layout'
import { Fields } from './fields'
import { SubmitButton } from './submit-button'
import { FieldResolver } from '.'

interface AutoFormOptions {
  submitLabel?: false | string
  schema: any
  fieldResolver?: any
}

export interface AutoFormProps<TFieldValues extends FieldValues>
  extends Omit<FormProps<TFieldValues>, 'schema'>,
    AutoFormOptions {}

export const AutoForm = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: AutoFormProps<TFieldValues>,
    ref: React.ForwardedRef<UseFormReturn<TFieldValues>>
  ) => {
    const { schema, submitLabel = 'Submit', fieldResolver, ...rest } = props

    return (
      <Form {...rest} schema={schema} ref={ref}>
        <FormLayout>
          {<Fields schema={schema} fieldResolver={fieldResolver} />}
          {submitLabel && <SubmitButton label={submitLabel} />}
        </FormLayout>
      </Form>
    )
  }
) as (<TFieldValues extends FieldValues>(
  props: AutoFormProps<TFieldValues> & {
    ref?: React.ForwardedRef<UseFormReturn<TFieldValues>>
  }
) => React.ReactElement) & { getFieldResolver?: (schema: any) => FieldResolver }
