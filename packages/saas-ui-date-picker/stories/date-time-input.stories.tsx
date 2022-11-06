import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Container, VStack } from '@chakra-ui/react'

import { DateInput, DateTimeInput } from '../src'

export default {
  title: 'Components/DateTime/DateTimeInput',
  component: DateInput,
  decorators: [
    (Story) => {
      return (
        <Container>
          <VStack>
            <Story />
          </VStack>
        </Container>
      )
    },
  ],
} as Meta

const Template: Story = (args) => <DateTimeInput {...args} />

export const Basic = Template.bind({})
Basic.args = {}
