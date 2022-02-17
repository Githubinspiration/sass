import { Container } from '@chakra-ui/react'
import * as React from 'react'

import { Form, DisplayField } from '../src'

export default {
  title: 'Components/Forms/DisplayField',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

import { onSubmit } from './helpers'

export const basic = () => (
  <Form defaultValues={{ title: 'Display field' }} onSubmit={onSubmit}>
    <DisplayField name="title" label="Title" />
  </Form>
)
