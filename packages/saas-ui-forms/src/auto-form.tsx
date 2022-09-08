import * as React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { forwardRef } from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import { Form, FormProps } from './form'
import { FormLayout } from './layout'
import { Fields } from './fields'
import { SubmitButton } from './submit-button'
import { FieldResolver } from '.'

interface AutoFormOptions {
  /**
   * The submit button label.
   * Pass `null` to render no submit button.
   */
  submitLabel?: React.ReactNode
  /**
   * The schema.
   * Supports object schema, Zod, Yup or Ajv (JSON Schema).
   * @see https://www.saas-ui.dev/docs/forms/auto-form
   */
  schema: any
  /**
   * The field resolver.
   */
  fieldResolver?: any
}

export interface AutoFormProps<TFieldValues extends FieldValues>
  extends Omit<FormProps<TFieldValues>, 'schema' | 'children'>,
    AutoFormOptions {
  children?: React.ReactNode
}

export const AutoForm = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: AutoFormProps<TFieldValues>,
    ref: React.ForwardedRef<UseFormReturn<TFieldValues>>
  ) => {
    const {
      schema,
      submitLabel = 'Submit',
      fieldResolver,
      children,
      ...rest
    } = props

    return (
      <Form {...rest} schema={schema} ref={ref}>
        <FormLayout>
          {<Fields schema={schema} fieldResolver={fieldResolver} />}
          {submitLabel && <SubmitButton>{submitLabel}</SubmitButton>}
          {children}
        </FormLayout>
      </Form>
    )
  }
) as (<TFieldValues extends FieldValues>(
  props: AutoFormProps<TFieldValues> & {
    ref?: React.ForwardedRef<UseFormReturn<TFieldValues>>
  }
) => React.ReactElement) & {
  displayName?: string
  getFieldResolver?: (schema: any) => FieldResolver
}

if (__DEV__) {
  AutoForm.displayName = 'AutoForm'
}
