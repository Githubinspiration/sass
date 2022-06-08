import { useEditorContext } from '@/providers/editor'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  MenuItemOption,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from '@chakra-ui/react'
import { Form, Select } from '@saas-ui/react'
import { useCallback } from 'react'
import { FaTwitter } from 'react-icons/fa'
import Section from './section'

const PaletteConfiguration = () => {
  const [state, setState] = useEditorContext()

  const { theme, color, gray, blackLuminance } = state

  const handleChange = useCallback(
    (key: string) => {
      return (e: any) => {
        setState((state) => ({
          ...state,
          [key]: e.target?.value,
        }))
      }
    },
    [setState]
  )

  return (
    <Box
      width="30%"
      maxW="320px"
      borderLeftWidth="1px"
      top="0"
      position="sticky"
      height="100vh"
      overflowY="auto"
      py="4"
      px="4"
    >
      <Form onSubmit={() => null}>
        <Section title="Configuration">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Theme</FormLabel>

              <Select
                value={theme}
                onChange={(theme) =>
                  setState((state) => ({ ...state, theme: theme as string }))
                }
              >
                <MenuItemOption value="Chakra UI">Chakra UI</MenuItemOption>
                <MenuItemOption value="Saas UI">Saas UI</MenuItemOption>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Primary color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  onChange={handleChange('color')}
                  value={color}
                  w="10"
                  p="0"
                />
                <Input
                  type="text"
                  onChange={handleChange('color')}
                  value={color}
                />
              </HStack>
              <FormHelperText>
                Select your primary brand color here, all other colors will be
                generated based of this.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Gray color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  onChange={handleChange('gray')}
                  value={gray}
                  w="10"
                  p="0"
                />
                <Input
                  type="text"
                  onChange={handleChange('gray')}
                  value={gray}
                />
              </HStack>
              <FormHelperText>
                Choose a gray tint that compliments your base color to make your
                theme pop.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Black luminance</FormLabel>
              <Slider
                onChange={(value) =>
                  setState((state) => ({
                    ...state,
                    blackLuminance: value,
                  }))
                }
                value={blackLuminance}
                min={0}
                max={0.01}
                step={0.001}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <FormHelperText>
                Slightly increase the luminance to make your blacks more
                organic.
              </FormHelperText>
            </FormControl>

            <Divider />

            <ButtonGroup>
              <Button
                as="a"
                href="https://twitter.com/intent/tweet?text=I%20created%20my%20%40chakra_ui%20color%20palette%20with%20%40saas_js%20%F0%9F%A4%A9%0A%0A%0Ahttps%3A//palette.saas-ui.dev%20"
                leftIcon={<FaTwitter />}
                variant="solid"
                colorScheme="primary"
              >
                Share on Twitter
              </Button>

              <Button>Reset</Button>
            </ButtonGroup>
          </VStack>
        </Section>
      </Form>
    </Box>
  )
}

export default PaletteConfiguration
