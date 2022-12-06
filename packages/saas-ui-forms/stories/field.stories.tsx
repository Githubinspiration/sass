import {
  Container,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react'
import * as React from 'react'
import * as Yup from 'yup'
import { z } from 'zod'

import { Form, FormLayout, Field, SubmitButton, FormProps } from '../src'

import { yupResolver } from '@hookform/resolvers/yup'
import { zodResolver } from '@hookform/resolvers/zod'

export default {
  title: 'Components/Forms/Field',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const helpSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
})

import { onSubmit } from './helpers'
import { CheckIcon, PhoneIcon } from '@chakra-ui/icons'

export const Basic = (props: Omit<FormProps, 'onSubmit'>) => (
  <Form
    defaultValues={{
      text: 'Text field',
      number: 10,
      textarea: 'Lorem ipsum',
      switch: true,
      select: 'Select 2',
      multipleselect: ['Select 1', 'Select 2'],
      nativeselect: 'Select 1',
      password: 'Password123',
      checkbox: true,
      radio: 'Radio 1',
      pin: '',
    }}
    {...props}
    onSubmit={(values) => {
      console.log(values)
    }}
  >
    <FormLayout>
      <Field name="text" label="Text" type="text" />
      <Field name="number" label="Number" type="number" min={1} max={10} />
      <Field name="textarea" label="Textarea" type="textarea" />
      <Field name="switch" label="Switch" type="switch" />
      <Field
        name="select"
        label="Select"
        type="select"
        options={[{ value: 'Select 1' }, { value: 'Select 2' }]}
      />
      <Field
        name="multipleselect"
        label="Multiple Select"
        type="select"
        options={[{ value: 'Select 1' }, { value: 'Select 2' }]}
        multiple
      />
      <Field
        name="nativeselect"
        label="Native Select"
        type="native-select"
        options={[{ value: 'Select 1' }, { value: 'Select 2' }]}
      />
      <Field name="password" label="Password" type="password" />
      <Field name="checkbox" label="Checkbox" type="checkbox" />
      <Field
        name="radio"
        label="Radio"
        type="radio"
        options={[{ value: 'Radio 1' }, { value: 'Radio 2' }]}
      />
      <Field name="pin" label="Pin" type="pin" pinLength={4} />

      <SubmitButton>Submit</SubmitButton>
    </FormLayout>
  </Form>
)

export const WithZodSchema = () => {
  return (
    <Basic
      resolver={zodResolver(
        z.object({
          text: z.string(),
          number: z.preprocess(Number, z.number()),
          textarea: z.string(),
          switch: z.boolean(),
          select: z.string(),
          multipleselect: z.array(z.string()),
          nativeselect: z.string(),
          password: z.string(),
          checkbox: z.boolean(),
          radio: z.string(),
          pin: z.string(),
        })
      )}
    />
  )
}

export const WithYupSchema = () => {
  return (
    <Basic
      resolver={yupResolver(
        Yup.object().shape({
          text: Yup.string().required(),
          number: Yup.number().required(),
          textarea: Yup.string().required(),
          switch: Yup.boolean().required(),
          select: Yup.string().required(),
          multipleselect: Yup.array().of(Yup.string()).required(),
          nativeselect: Yup.string().required(),
          password: Yup.string().required(),
          checkbox: Yup.boolean().required(),
          radio: Yup.string().required(),
          pin: Yup.string().required(),
        })
      )}
    />
  )
}

type FormInputs = {
  text: string
  pattern: string
}

export const Rules = () => {
  return (
    <Form<FormInputs>
      defaultValues={{
        text: '',
        pattern: '',
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="text"
          label="Text"
          rules={{ required: 'Text is required' }}
        />
        <Field
          name="pattern"
          label="Pattern"
          rules={{
            pattern: {
              value: /@/,
              message: 'Should include a @',
            },
          }}
        />
        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const NoLabel = () => {
  return (
    <Form
      defaultValues={{
        text: '',
      }}
      onSubmit={onSubmit}
      onError={(err) => console.error(err)}
    >
      <FormLayout>
        <Field name="text" placeholder="Placeholder" />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const Variants = () => {
  return (
    <Form onSubmit={onSubmit} onError={(err) => console.error(err)}>
      <FormLayout>
        <Field name="outline" label="Outline" variant="outline" />
        <Field name="filled" label="Filled" variant="filled" />
        <Field name="flushed" label="Flushed" variant="flushed" />
        <Field name="unstyled" label="Unstyled" variant="unstyled" />
      </FormLayout>
    </Form>
  )
}

export const HelpText = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="email"
          label="Email"
          type="email"
          help="We'll never share your email."
        />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const WithId = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field id="email" name="email" label="Email" type="email" />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const WithAddons = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          name="url"
          type="url"
          label="Url"
          leftAddon={<InputLeftAddon>https://</InputLeftAddon>}
        />

        <Field
          name="email"
          type="email"
          label="Email"
          rightAddon={<InputRightAddon>@saas-ui.dev</InputRightAddon>}
        />

        <Field
          name="phone"
          type="phone"
          leftAddon={
            <InputLeftElement>
              <PhoneIcon />
            </InputLeftElement>
          }
          rightAddon={
            <InputRightElement>
              <CheckIcon />
            </InputRightElement>
          }
        />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}

export const WithEventHandlers = () => {
  return (
    <Form
      defaultValues={{
        email: '',
      }}
      resolver={yupResolver(helpSchema)}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <Field
          id="email"
          name="email"
          label="Email"
          type="email"
          onChange={(e) => console.log(e)}
          onBlur={(e) => console.log(e)}
        />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </Form>
  )
}
