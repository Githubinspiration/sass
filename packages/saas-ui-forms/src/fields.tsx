import * as React from 'react'

import { Form } from './form'
import { FormLayout } from './layout'
import { Field, FieldProps } from './field'

import { ArrayField } from './array-field'
import { ObjectField } from './object-field'
import { FieldResolver } from './field-resolver'

export interface FieldsProps {
  schema: any
  fieldResolver?: FieldResolver
}

const mapNestedFields = (resolver: FieldResolver, name: string) => {
  return resolver
    .getNestedFields(name)
    ?.map(
      ({ name, type, ...nestedFieldProps }: FieldProps, i): React.ReactNode => (
        <Field key={name || i} name={name} type={type} {...nestedFieldProps} />
      )
    )
}

export const Fields: React.FC<FieldsProps> = ({
  schema,
  fieldResolver,
  ...props
}) => {
  const resolver = React.useMemo(
    () => fieldResolver || Form.getFieldResolver(schema),
    [schema, fieldResolver]
  )

  return (
    <FormLayout {...props}>
      {resolver
        .getFields()
        .map(
          ({
            name,
            type,
            defaultValue,
            ...fieldProps
          }: FieldProps): React.ReactNode => {
            if (type === 'array') {
              return (
                <ArrayField key={name} name={name} {...fieldProps}>
                  {mapNestedFields(resolver, name)}
                </ArrayField>
              )
            } else if (type === 'object') {
              return (
                <ObjectField key={name} name={name} {...fieldProps}>
                  {mapNestedFields(resolver, name)}
                </ObjectField>
              )
            }

            return <Field key={name} name={name} type={type} {...fieldProps} />
          }
        )}
    </FormLayout>
  )
}
