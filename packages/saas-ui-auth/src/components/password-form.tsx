import * as React from 'react'

import { __DEV__ } from '@chakra-ui/utils'

import {
  Form,
  FormProps,
  FormLayout,
  Field,
  SubmitHandler,
  FieldErrors,
} from '@saas-ui/forms'

import { useLogin, AuthActionEnum } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  email: string
  password: string
  rememberMe?: boolean
  [key: string]: any
}

export interface PasswordFormProps
  extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
  schema?: any
  action?: AuthActionEnum
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: FieldErrors<SubmitParams>) => void
  submitLabel?: string
  emailLabel?: string
  passwordLabel?: string
  defaultValues?: Record<string, any>
  renderSuccess?: (data: any) => React.ReactElement
  children?: React.ReactNode
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  action = 'logIn',
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel = 'Log in',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  defaultValues,
  children,
  renderSuccess = () => (
    <AuthFormSuccess
      title="Success!"
      description="Check your mailbox to verify your account."
    />
  ),
  ...formProps
}) => {
  const [{ isLoading, isResolved, data }, submit] = useLogin({ action })

  const handleSubmit: SubmitHandler<SubmitParams> = (params) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  // Show a default success message on signup.
  if (isResolved && action === 'signUp') {
    return renderSuccess(data)
  }

  return (
    <Form<SubmitParams>
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ email: '', password: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          label={emailLabel}
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />
        <Field
          name="password"
          label={passwordLabel}
          type="password"
          rules={{ required: true }}
          autoComplete="current-password"
        />

        {children}

        <LoginButton type="submit" width="full" isLoading={isLoading}>
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

if (__DEV__) {
  PasswordForm.displayName = 'PasswordForm'
}
