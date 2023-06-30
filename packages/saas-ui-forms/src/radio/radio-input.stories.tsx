import { Container } from '@chakra-ui/react'
import * as React from 'react'

import { ComponentStory } from '@storybook/react'

import { RadioInput } from './'

export default {
  title: 'Components/Forms/RadioInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const options = [
  {
    value: '1',
    label: 'Option 1',
  },
  {
    value: '2',
    label: 'Option 2',
  },
]

const Template: ComponentStory<typeof RadioInput> = (args) => (
  <RadioInput {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  name: 'radio',
  options,
}

export const Direction = Template.bind({})
Direction.args = {
  name: 'radio',
  direction: 'row',
  options,
}
